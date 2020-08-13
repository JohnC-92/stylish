const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const database = require('../models/db');
// eslint-disable-next-line no-unused-vars
const {db, dbQuery} = database;

const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const config = require('../config');
const redis = require('./redis');
const {client} = redis;

let z = -1;

/**
 *
 * @param {int} j current image counter
 * @return {int} return image counter
 */
function imageCounter(j) {
  z = j+1;
  if (z === 0) {
    return '';
  } else {
    return (`-${z}`);
  }
}

aws.config.update({
  secretAccessKey: config.s3secretKey,
  accessKeyId: config.s3accessKey,
  region: 'ap-northeast-2',
});

const s3 = new aws.S3();
const storage = multerS3({
  s3: s3,
  acl: 'public-read',
  bucket: 'stylishimagestw',
  key: function(req, file, cb) {
    console.log(file);
    const fileFormat = (file.originalname.split('.'));
    // eslint-disable-next-line max-len
    cb(null, `${req.body.productID}/` + file.fieldname + imageCounter(z) + '.' + fileFormat[fileFormat.length - 1]);
  },
});

const upload = multer({storage: storage});

// upload file / files --> upload.fields
const fileType = upload.fields(
    [
      {name: 'productPhoto', maxCount: 1},
      {name: 'productImages', maxCount: 4},
      {name: 'productCampaign', maxCount: 1},
    ],
);

// ---------------------------Administrative Pages------------------------------

// admin page data processing
router.post('/admin/product', fileType, async (req, res) => {
  const {productID, productTitle, productDescription, productPrice,
    productCategory, productTexture, productWash, productPlace,
    productNote, productStory, productColor, productSize,
    productStock} = req.body;

  // construct image files path
  const mainImage = 'productPhoto.jpg';
  const imagesArr = req.files['productImages'];
  const imagePaths = [];
  for (let i = 0; i < imagesArr.length; i++) {
    // images index start from 1, therefore i+1;
    imagePaths.push(`productImages-${i+1}.jpg`);
  }

  // construct product objects
  const productObject = {
    id: productID,
    title: productTitle,
    description: productDescription,
    price: productPrice,
    category: productCategory,
    texture: productTexture.toString(), // array to string
    wash: productWash.toString(), // array to string
    place: productPlace,
    note: productNote,
    story: productStory,
    colors: productColor.toString(), // array to string
    sizes: productSize.toString(), // array to string
    variants: productID,
    main_image: mainImage,
    images: imagePaths.toString(), // array to string
  };

  try {
    // get color table from SQL
    const colorCode = await dbQuery('SELECT code, name FROM color');

    // check if product id exists,
    const results = await dbQuery(`
    SELECT * FROM product WHERE id = ?`, [productID]);

    // if product doesnt exist add data to TABLE product & TABLE variant,
    if (results.length === 0) {
      // add Variant Object to SQL
      // depends on colorData length, colorData could be string or array
      let colorLength = 0;
      if (typeof productColor === 'string') {
        colorLength = 1;
      } else {
        colorLength = productColor.length;
      }

      const sizeLength = productSize.length;

      // construct SQL code with color, size, stock
      let sqlVariant = `INSERT INTO variant 
      (product_id, color_code, size, stock) VALUES`;

      const variantArr = [];
      let stockIndex = 0;
      for (let i = 0; i < colorLength; i++) {
        for (let j = 0; j < sizeLength; j++) {
          sqlVariant += '(?, ?, ?, ?),';
          variantArr.push(
              productID, colorCode[parseInt(productColor[i]) - 1].code,
              productSize[j], productStock[stockIndex]);
          stockIndex += 1;
        }
      }

      sqlVariant = sqlVariant.substr(0, sqlVariant.length-1) + ';';

      await dbQuery(sqlVariant, variantArr);
      console.log('Successfully added data into variant!');

      // add Product Object to SQL
      const sqlProduct = 'INSERT INTO product SET ?';

      await dbQuery(sqlProduct, productObject);
      console.log('Successfully added data into product!');

      z = -1; // reset image counter
      res.send('Succesfully added product data into database!');
    } else {
      res.send('Product already exist!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// campaign page data processing
router.post('/admin/campaign', fileType, async (req, res) => {
  // acquire campaign variables
  const {productID, productStory} = req.body;
  const picture = 'productCampaign.jpg';

  // construct campaign object
  const campaignObject = {
    product_id: productID,
    picture: picture,
    story: productStory,
  };

  try {
    await dbQuery(`INSERT INTO campaign SET ?`, campaignObject);
    client.flushall('ASYNC', () => {
      console.log('Campaign Cache Flushed!');
    });
    console.log('Successfully added campaign data into campaign!');

    z = -1; // reset image counter
    res.send('Successfully added campaign data into campaign!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error when inserting into campaign');
  }
});

module.exports = router;
