const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const https = require('https');
const http = require('http');

const options = {
  key: fs.readFileSync('private.pem'),
  cert: fs.readFileSync('certChain.crt'),
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

const io = require('socket.io')(httpsServer);

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

// index
app.get('/', (req, res) => {
  res.send('This text comes from AWS Johnny Server!');
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

httpServer.listen(3000);
httpsServer.listen(3001);
