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

// // this runs everytime when client connects
// io.on('connection', (socket) => {
//   console.log('Server IO listening');
//   console.log(socket.id)

//   // send event
//   socket.emit('dataUpdate', { 'say': 'hello world' });
// });

// const config = require('./config');
// const database = require('./models/db');
// const {db} = database;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('views'));
app.use(express.static('assets/'));
// app.use(express.static('assets/uploads'));
app.set('view engine', 'pug');

// // connect to db
// db.connect((err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log('MySQL Connected...');
// });

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

// app.listen(config.port, () => {
//   console.log(`The server is running on port ${config.port}!`);
// });
