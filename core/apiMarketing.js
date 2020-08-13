const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const database = require('../models/db');
// eslint-disable-next-line no-unused-vars
const {db, dbQuery} = database;
const redis = require('./redis');
const {client, cacheCampaign} = redis;
const config = require('../config');

// ------------------------Marketing Campaign API------------------------------
router.get('/api/:apiVersion/marketing/campaigns', cacheCampaign, async (req, res) => {
  try {
    const results = await dbQuery(`SELECT * FROM campaign`);
    if (results.length !== 0) {
      results.forEach((res) => {
        res.picture = `${config.s3URL}/${res.product_id}/${res.picture}`;
      });
      client.setex('campaignData', 3600, JSON.stringify(results));

      res.send({data: results});
    } else {
      res.send('Sorry there is no campaign data!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error when querying for campaign');
  }
});

// get path to get IDs for campaign update page
router.get('/admin/campaignIDS', async (req, res) => {
  try {
    let results = await dbQuery('SELECT id FROM product ORDER BY id');
    if (results.length !== 0) {
      results = results.map((res) => res.id);
      res.send(results);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error when querying for ProductID');
  }
});

module.exports = router;
