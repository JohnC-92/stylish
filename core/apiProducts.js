const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const database = require('../models/db');
// eslint-disable-next-line no-unused-vars
const {db, dbQuery} = database;
const redis = require('./redis');
const {client, cacheDetails} = redis;
const config = require('../config');

// ----------------------------Product List API------------------------------
router.get('/api/:apiVersion/products/:category', cacheDetails, async (req, res) => {
  // implement logic for pagination
  const limit = 6;
  const paging = req.query.paging || 0;
  const offset = limit*paging;
  const {category} = req.params;
  const detailID = req.query.id || 0;

  if (!Number.isInteger(parseInt(paging))) {
    return res.status(400).send(`
    Please provide a number for paging, ex: products/all?paging=5`);
  }

  // exclude column 'category' from sql query
  const viewProduct = `id, title, description, price,
  texture, wash, place,note, story, colors, sizes, variants,
  main_image, images`;

  let sql = '';
  // customized SQL code according to category params
  // cases : ALL, MEN, WOMEN, ACCESSORIES, SEARCH, DETAILS
  if (category === 'all') {
    sql = `SELECT ${viewProduct} FROM product ORDER BY id 
    LIMIT ${limit+1} OFFSET ${offset}`;
  } else if (category === 'men') {
    sql = `SELECT ${viewProduct} FROM product WHERE category = 'men' 
    ORDER BY id LIMIT ${limit+1} OFFSET ${offset}`;
  } else if (category === 'women') {
    sql = `SELECT ${viewProduct} FROM product WHERE category = 'women' 
    ORDER BY id LIMIT ${limit+1} OFFSET ${offset}`;
  } else if (category === 'accessories') {
    sql = `SELECT ${viewProduct} FROM product WHERE category = 'accessories' 
    ORDER BY id LIMIT ${limit+1} OFFSET ${offset}`;
  } else if (category === 'search') {
    if (!req.query.keyword) {
      return res.status(400).send(`Please provide a keyword for product search! 
      Example: /products/search?keyword=Shirt`);
    }
    const keyword = '%' + req.query.keyword + '%';
    sql = `SELECT ${viewProduct} FROM product WHERE title LIKE "${keyword}" 
    ORDER BY id LIMIT ${limit+1} OFFSET ${offset}`;
  } else if (category === 'details') {
    if (!req.query.id) {
      return res.status(400).send(`Please provide a query ID for product 
      details! Example: /products/details?id=5`);
    }
    sql = `SELECT ${viewProduct} FROM product WHERE id = ${detailID}`;
  } else {
    return res.status(400).send('Page not found! Please check the URL again!');
  }

  try {
    // get color table
    const colorCode = await dbQuery('SELECT code, name FROM color');

    const products = await dbQuery(sql);
    products.forEach((product) => {
      const colorArr = product.colors.split(',');
      product.colors = [];

      // replace color id with color code and name
      for (let j = 0; j < colorArr.length; j++) {
        product.colors.push(colorCode[parseInt(colorArr[j])-1]);
      }

      product.sizes = product.sizes.split(',');

      // add host url for main image
      product.main_image = `${config.s3URL}/${product.id}/${product.main_image}`;

      // replace images path spaces with ''
      product.images = product.images.replace(/\s/g, '').split(',');
      product.images = product.images.map((img) => `${config.s3URL}/${product.id}/${img}`);
    });

    // ----------------  Single DB query  --------------------------------
    // replace all product variants
    const productID = products.map((product) => product.id);
    const productVariant = await dbQuery(`SELECT product_id, color_code, size, 
    stock FROM variant WHERE product_id IN (?)`, [productID]);

    productIDLength = {};
    for (let i = 0; i < productVariant.length; i++) {
      if (productIDLength[productVariant[i].product_id]) {
        productIDLength[productVariant[i].product_id] += 1;
      } else {
        productIDLength[productVariant[i].product_id] = 1;
      }
    };

    let sum = 0; // variable sum to count through product variant with respective product ids.
    for (let i = 0; i < products.length; i++) {
      products[i].variants = [];
      products[i].variants = productVariant.slice(sum, sum+productIDLength[products[i].id]);
      sum += productIDLength[products[i].id];
    }

    // ----------------  Multiple DB queries  --------------------------------
    // // replace all product variants
    // const promises = products.map(async (product) => {
    //   const productVariant = await dbQuery(`SELECT color_code, size,
    //   stock FROM variant WHERE product_id = ?`, [product.id]);
    //   product.variants = [];
    //   product.variants = (JSON.parse(JSON.stringify(productVariant)));
    // });

    // // resolve all promises before sending data
    // await Promise.all(promises);

    // Cases
    // case 1: length = limit or limit+1
    // case 2: length = 0
    // case 3: length < limit
    if (products.length >= limit) {
      if (products.length > limit) {
        res.send({data: products.slice(0, limit),
          next_paging: parseInt(paging)+1});
      } else if (products.length === limit) {
        res.send({data: products});
      }
    } else if (products.length === 0) {
      if (category === 'search') {
        res.send(`Sorry there is 
        no product with title keyword: ${req.query.keyword}!`);
      } else if (category === 'details') {
        res.send(`Sorry there is no product with id: ${detailID}!`);
      } else if (
        category === 'all' || category === 'men' ||
        category === 'women' || category === 'accessories') {
        res.send('Sorry there is no data for current paging!');
      }
    } else if (products.length < limit) {
      if (category === 'details') {
        client.setex(`productID:${detailID}`, 3600, JSON.stringify(products[0]));
        res.send({data: products[0]});
      } else {
        res.send({data: products});
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error when querying for categories');
  };
});

module.exports = router;
