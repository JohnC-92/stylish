require('dotenv').config();
const config = {};

config.dbUser = process.env.DB_USER;
config.dbPassword = process.env.DB_PASSWORD;
config.dbDatabase = process.env.DB_DATABASE;
config.hostIP = process.env.IP_ADDRESS;
config.secretKey = process.env.SECRET_KEY;
config.appID = process.env.APP_ID;
config.appToken = process.env.APP_TOKEN;
config.port = 3000;
config.partnerKey = process.env.PARTNER_KEY;
config.merchantID = process.env.MERCHANT_ID;
config.redisPort = process.env.REDIS_PORT;
config.s3accessKey = process.env.AWS_ACCESS_KEY_ID;
config.s3secretKey = process.env.AWS_SECRET_ACCESS_KEY;
config.s3URL = process.env.AWS_S3_URL;

module.exports = config;
