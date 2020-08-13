const config = require('../config');
const redis = require('redis');
const client = redis.createClient(config.redisPort);

/**
 * Function to get campaign data from cache if exist
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function cacheCampaign(req, res, next) {
  try {
    client.get('campaignData', (err, results) => {
      if (err) {
        throw err;
      }
      if (results !== null) {
        res.send({data: JSON.parse(results)});
      } else {
        next();
      }
    });
  } catch (err) {
    console.log(err);
    next();
  }
}

/**
 * Function to get product details data from cache if exist
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function cacheDetails(req, res, next) {
  try {
    if (req.query.id) {
      client.get(`productID:${req.query.id}`, (err, results) => {
        if (err) {
          throw err;
        }
        if (results !== null) {
          res.send({data: JSON.parse(results)});
        } else {
          next();
        }
      });
    } else {
      next();
    };
  } catch (err) {
    console.log(err);
    next();
  }
}

/**
 * Function to get order payment data from cache if exist
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function cachePayments(req, res, next) {
  try {
    client.get('paymentData', (err, results) => {
      if (err) {
        throw err;
      }
      if (results !== null) {
        console.log('Get payment from cache')
        res.send({data: JSON.parse(results)});
      } else {
        next();
      }
    });
  } catch (err) {
    console.log(err);
    next();
  }
}

module.exports = {client, cacheCampaign, cacheDetails, cachePayments};
