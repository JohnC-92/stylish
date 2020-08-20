const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
// const https = require('https');
const http = require('http');

// const options = {
//   key: fs.readFileSync('private.pem'),
//   cert: fs.readFileSync('certChain.crt'),
// };

const httpServer = http.createServer(app);
// const httpsServer = https.createServer(options, app);

const io = require('socket.io')(httpServer);

app.use((req, res, next) => {
  res.io = io;
  next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('views'));
app.use(express.static('assets/'));
app.set('view engine', 'pug');

// routes setting
const adminRoutes = require('./core/admin');
const apiProductsRoutes = require('./core/apiProducts');
const apiMarketingRoutes = require('./core/apiMarketing');
const apiUserRoutes = require('./core/apiUser');
const apiOrderRoutes = require('./core/apiOrder');

// CORS Control
app.use('/', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
  res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.set('Access-Control-Allow-Credentials', 'true');
  next();
});

// administrative routes
app.use(adminRoutes);

// products api routes
app.use(apiProductsRoutes);

// product marketing routes
app.use(apiMarketingRoutes);

// user signIn/signUp/profile routes
app.use(apiUserRoutes);

// user order routes
app.use(apiOrderRoutes);

httpServer.listen(4000);
// httpsServer.listen(4001);
