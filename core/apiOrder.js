const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const _ = require('lodash');

const database = require('../models/db');
// eslint-disable-next-line no-unused-vars
const {db, dbQuery} = database;
const request = require('request-promise');
const redis = require('./redis');
const {client, cachePayments} = redis;
const config = require('../config');

router.post('/order/checkout', async (req, res) => {
  // return error if request format incorrect
  if (req.headers['content-type'] !== 'application/json' || !req.body) {
    return res.status(400).send(`
    Please provide correct header and correct request body`);
  }

  // construct orderObj
  const {prime, order} = req.body;
  const orderObj = {
    ordersUser: JSON.stringify(order.recipient),
    ordersProduct: JSON.stringify(order.list),
  };
  console.log(order.list);
  delete order.recipient;
  delete order.list;
  orderObj.user_id = Math.round(Math.random()*4+1);
  orderObj.shipping = order.shipping;
  orderObj.paymethod = order.payment;
  orderObj.subtotal = order.subtotal;
  orderObj.freight = order.freight;
  orderObj.total = order.total;

  try {
    // request to TapPay API
    const options = {
      method: 'POST',
      uri: 'https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.partnerKey,
      },
      body: {
        'prime': prime,
        'partner_key': config.partnerKey,
        'merchant_id': config.merchantID,
        'details': 'TapPay Test',
        'amount': order.total,
        'cardholder': {
          'phone_number': '+886923456789',
          'name': 'Jane Doe',
          'email': 'Jane@Doe.com',
          'zip_code': '12345',
          'address': '123 1st Avenue, City, Country',
          'national_id': 'A123456789',
        },
        'remember': false,
      },
      json: true,
    };

    // details to write in ordersProduct table
    const product = JSON.parse(orderObj.ordersProduct);

    let insertResult = '';
    const tpResponse = await request(options);

    // return order id if payment successful
    // else return error message
    if (tpResponse.status === 0) {
      orderObj.paid = true;
      orderObj.payment = JSON.stringify(tpResponse);

      insertResult = await dbQuery(`INSERT INTO orders SET ?`, orderObj);

      let query = 'INSERT INTO ordersProduct (order_id, product_id, price, color_code, color_name, size, qty) VALUES ';
      product.map((p) => {
        query += `(${insertResult['insertId']}, ${p.id}, ${p.price}, '#${p.color.code}', '${p.color.name}', '${p.size}', ${p.qty}),`;
      });
      query = query.substr(0, query.length-1) + ';';
      await dbQuery(query);

      res.io.emit('dataUpdate', {'say': 'data updated'});
      res.json({data: {number: insertResult['insertId']}});
    } else {
      orderObj.paid = false;

      insertResult = await dbQuery(`INSERT INTO orders SET ?`, orderObj);

      let query = 'INSERT INTO ordersProduct (order_id, product_id, price, color_code, color_name, size, qty) VALUES ';
      product.map((p) => {
        query += `(${insertResult['insertId']}, ${p.id}, ${p.price}, '#${p.color.code}', '${p.color.name}', '${p.size}', ${p.qty}),`;
      });
      query = query.substr(0, query.length-1) + ';';

      await dbQuery(query);

      res.io.emit('dataUpdate', {'say': 'data updated'});
      res.status(500).send(tpResponse.msg);
    }
  } catch (err) {
    console.log(err);
  }
});

// router.get('/api/:apiVersion/order/payments', cachePayments, async (req, res) => {
router.get('/api/:apiVersion/order/payments', async (req, res) => {
  try {
    // select only columns user_id and total from database
    // const viewOrder = `user_id, total`;
    // const sql = `SELECT ${viewOrder} FROM orders`;
    const sql = 'SELECT user_id, total FROM orders';

    const data = await dbQuery(sql);

    // Function to calculate sum of id
    // res.send(data)
    sumOfId = (id) => data.filter((dat) => dat.user_id === id).reduce((a, b) => a+b.total, 0);

    // create array of order according to user_id 1-5
    result = [];
    for (let i = 1; i <= 5; i++) {
      result.push({user_id: i, total_payment: sumOfId(i)});
    }
    // client.setex('paymentData', 3600, JSON.stringify(result));
    res.send({data: result});

  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/api/:apiVersion/order/paymentsGroupby', async (req, res) => {
  try {
    // select only columns user_id and total from database
    // const viewOrder = `user_id, total`;
    // const sql = `SELECT ${viewOrder} FROM orders`;
    const sql = 'SELECT user_id, SUM(total) FROM orders GROUP BY user_id';

    const data = await dbQuery(sql);

    data.map((d) => {
      d.total_payment = d['SUM(total)'];
      delete d['SUM(total)'];
    });
    res.send({data: data});

    // // Function to calculate sum of id
    // // res.send(data)
    // sumOfId = (id) => data.filter((dat) => dat.user_id === id).reduce((a, b) => a+b.total, 0);

    // // create array of order according to user_id 1-5
    // result = [];
    // for (let i = 1; i <= 5; i++) {
    //   result.push({user_id: i, total_payment: sumOfId(i)});
    // }
    // // client.setex('paymentData', 3600, JSON.stringify(result));
    // res.send({data: result});

  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/api/:apiVersion/order/dashboard', async (req, res) => {
  let sql = '';
  let total;
  let result;

  // Case 1
  sql = 'SELECT SUM(total) from orders';
  total = await dbQuery(sql);
  total = total[0]['SUM(total)'];

  // Case 2
  sql = 'SELECT color_name, color_code, SUM(qty) FROM ordersProduct GROUP BY color_name;';
  result = await dbQuery(sql);
  totalqty = result.reduce((sum, r) => {
    sum += r['SUM(qty)'];
    return sum;
  }, 0);

  colorData = result.map((r) => {
    r.qty = r['SUM(qty)'];
    delete r['SUM(qty)'];
    // r.percent = (r.qty/totalqty)*100;
    return r;
  });

  // Case 3
  sql = 'SELECT price, qty FROM ordersProduct;';
  result = await dbQuery(sql);
  arr = result;
  // let arr = [];
  // for (let i = 0; i < result.length; i++) {
  //   arr = arr.concat(Array(result[i].qty).fill(result[i].price));
  // }

  // Case 4
  sql = 'SELECT product_id, size, SUM(qty) FROM ordersProduct GROUP BY product_id, size;';
  result = await dbQuery(sql);
  idQty = {};
  for (let i = 0; i < result.length; i++) {
    if (!idQty[result[i].product_id]) {
      idQty[result[i].product_id] = {};
      idQty[result[i].product_id].total = result[i]['SUM(qty)'];
      if (result[i].size === 'S') {
        idQty[result[i].product_id]['S'] = result[i]['SUM(qty)'];
      } else if (result[i].size === 'M') {
        idQty[result[i].product_id]['M'] = result[i]['SUM(qty)'];
      } else if (result[i].size === 'L') {
        idQty[result[i].product_id]['L'] = result[i]['SUM(qty)'];
      }
    } else {
      idQty[result[i].product_id].total += result[i]['SUM(qty)'];
      if (result[i].size === 'S') {
        idQty[result[i].product_id]['S'] = result[i]['SUM(qty)'];
      } else if (result[i].size === 'M') {
        idQty[result[i].product_id]['M'] = result[i]['SUM(qty)'];
      } else if (result[i].size === 'L') {
        idQty[result[i].product_id]['L'] = result[i]['SUM(qty)'];
      }
    }
    result[i].qty = result[i]['SUM(qty)'];
    delete result[i]['SUM(qty)'];
  }
  const sortedKeys = Object.keys(idQty).sort((a,b) => idQty[b].total-idQty[a].total);
  const keys = sortedKeys.slice(0, 5);
  const productRanking = keys.map((key) => {
    let obj = idQty[key];
    return obj;
  });

  res.send({
    total: total,
    colorData: colorData,
    arr: arr,
    ranked: productRanking,
    ids: keys,
  });
});

module.exports = router;
