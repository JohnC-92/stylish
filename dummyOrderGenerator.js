const database = require('./models/db');
const {db, dbQuery} = database;
const request = require('request-promise');

insertOrders();
/**
 * Function to insert dummy data into database table Orders
 */
async function insertOrders() {
  await dbQuery('DELETE FROM orders');
  console.log('--------Deleted all data in orders--------');
  await dbQuery('DELETE FROM ordersProduct');
  console.log('--------Deleted all data in ordersProduct--------');

  let sqlOrders = 'INSERT INTO orders (user_id, shipping, paymethod, subtotal, freight, total, ordersUser, ordersProduct, paid, payment) VALUES ';
  let sqlOrdersProduct = 'INSERT INTO ordersProduct (order_id, product_id, price, color_code, color_name, size, qty) VALUES ';
  const options = {
    method: 'GET',
    url: 'http://arthurstylish.com:1234/api/1.0/order/data',
  };
  const data = JSON.parse(await request(options));

  for (let i = 0; i < data.length; i++) {
    if (i !== data.length-1) {
      sqlOrders += `(123, 123, 123, 123, 123, ${data[i].total}, 123, 123, 123, 123),`;
      for (let j = 0; j < data[i].list.length; j++) {
        sqlOrdersProduct += `(123, ${data[i].list[j].id}, ${data[i].list[j].price}, '${data[i].list[j].color.code}', '${data[i].list[j].color.name}', '${data[i].list[j].size}', ${data[i].list[j].qty}),`;
      }
    } else {
      sqlOrders += `(123, 123, 123, 123, 123, ${data[i].total}, 123, 123, 123, 123);`;
      for (let j = 0; j < data[i].list.length; j++) {
        if (j !== data[i].list.length-1) {
          sqlOrdersProduct += `(123, ${data[i].list[j].id}, ${data[i].list[j].price}, '${data[i].list[j].color.code}', '${data[i].list[j].color.name}', '${data[i].list[j].size}', ${data[i].list[j].qty}),`;
        } else {
          sqlOrdersProduct += `(123, ${data[i].list[j].id}, ${data[i].list[j].price}, '${data[i].list[j].color.code}', '${data[i].list[j].color.name}', '${data[i].list[j].size}', ${data[i].list[j].qty});`;
        }
      }
    }
  }

  // Add Orders Data to SQL
  await dbQuery(sqlOrders);
  console.log('Done inserting orders data');
  await dbQuery(sqlOrdersProduct);
  console.log('Done inserting ordersProduct data');
  db.end();
};