const database = require('./models/db');
const {db, dbQuery} = database;

const dummyOrderLength = 58000;
insertOrders();
/**
 * Function to insert dummy data into database table Orders
 */
async function insertOrders() {
  await dbQuery('DELETE FROM orders');
  console.log('Deleted all data in orders');
  let sqlOrders = 'INSERT INTO orders (user_id, shipping, paymethod, subtotal, freight, total, ordersUser, ordersProduct, paid, payment) VALUES ';
  for (let i = 0; i < dummyOrderLength; i++) {
    const dummyId = randomIntFromInterval(1, 5);
    const dummyTotal = randomIntFromInterval(100, 1000);
    if (i !== dummyOrderLength-1) {
      sqlOrders += `(${dummyId}, 123, 123, 123, 123, ${dummyTotal}, 123, 123, 123, 123),`;
    } else {
      sqlOrders += `(${dummyId}, 123, 123, 123, 123, ${dummyTotal}, 123, 123, 123, 123);`;
    }

  } // end of for loop
  // Add Orders to SQL
  await dbQuery(sqlOrders);
  console.log('Done inserting orders data');
  db.end();
};

/**
 * Function to generate random number between min and max
 * @param {*} min random number lower boundary
 * @param {*} max random number upper boundary
 * @return {*} return the random number between min and max
 */
function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};


// // connect to db
// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('MySQL Connected...');
// });

// ---------------------Dummy SQL Insert for product test-------------------

// db.query('SELECT * FROM product', (err, result) => {
//   if (err) {
//     throw err;
//   } else if (result.length === 0) {

//     for (let i = 0; i < 30; i++) {

//       const dummyTitle = Math.round(Math.random()*2);
//       const dummyPrice = Math.round(Math.random()*3000);
//       const dummyPlace = Math.round(Math.random()*2);
//       let dummyCategory = '',

//       if (i < 10) {
//         dummyCategory = 'men';
//       } else if (i < 20) {
//         dummyCategory = 'women';
//       } else if (i < 30) {
//         dummyCategory = 'accessories';
//       }

//       const dummyColor = ['1', '2'];
//       const dummyColorVariant = ['334455', 'FFFFFF'];
//       const dummySize = ['S', 'M'];
//       const dummyVariant = [11, 22, 33, 44];

//       // var localIP = '127.0.0.1:3000';
//       var localIP = hostIP;
//       let productObject = {
//         id: i,
//         title: ['厚實毛呢格子外套','華麗公主洋裝','夏天涼感上衣'][dummyTitle],
//         description: '高抗寒素材選用，保暖也時尚有型',
//         price: dummyPrice,
//         category: dummyCategory,
//         texture: '棉、聚脂纖維',
//         wash: '手洗（水溫40度、洗衣機',
//         place: ['台灣','韓國','日本'][dummyPlace],
//         note: '實品顏色以單品照為主',
//         story: '你絕對不能錯過的超值商品',
//         colors: dummyColor.toString(),
//         sizes: dummySize.toString(),
//         variants: dummyVariant.toString(),
//         main_image: `http://${localIP}/stylish-main.jpg`,
//         images: `http://${localIP}/stylish-1.jpg, http://${localIP}/stylish-2.jpg,
//         http://${localIP}/stylish-3.jpg, http://${localIP}/stylish-4.jpg`
//       }

//      // Add Variant Object to SQL
//      var sqlVariant = 'INSERT INTO variant (product_id, color_code, size, stock) VALUES';

//      var colorLength = dummyColor.length;
//      var sizeLength = dummySize.length;

//      for (let j = 0; j < colorLength; j++){
//        for (let k = 0; k < sizeLength; k++){
//          sqlVariant += `(${i}, '${dummyColorVariant[j]}', '${dummySize[k]}', ${dummyVariant[j+k]}),`;
//        }
//      }

//      sqlVariant = sqlVariant.substr(0,sqlVariant.length-1) + ';';

//      db.query(sqlVariant, (err, result) => {
//        if (err){
//          throw err;
//        } else {
//          console.log('Successfully added data into variant!')
//        }
//             });

//      // Add Product Object to SQL
//      let sqlProduct = 'INSERT INTO product SET ?';
//      db.query(sqlProduct, productObject, (err, result) => {
//        if (err){
//          throw err;
//        } else {
//          console.log('Successfully added data into product!');
//        }
//      });
//    } // end of for loop
//  }
// });

// ---------------------Dummy SQL Insert for order test-------------------

// const dummyOrderLength = 1000;
// insertOrders();
// /**
//  * Function to insert dummy data into database table Orders
//  */
// async function insertOrders() {
//   await dbQuery('DELETE FROM orders');
//   console.log('Deleted all data in orders');
//   for (let i = 0; i < dummyOrderLength; i++) {
//     const dummyId = randomIntFromInterval(1, 5);
//     const dummyTotal = randomIntFromInterval(100, 1000);
//     const orderObject = {
//       user_id: dummyId,
//       shipping: 'delivery',
//       paymethod: 'credit_card',
//       subtotal: '123',
//       freight: '60',
//       total: dummyTotal,
//       ordersUser: JSON.stringify({'name': '123', 'phone': '123', 'email': '123', 'address': '123', 'time': 'morning'}),
//       ordersProduct: JSON.stringify([{'id': 201807242216, 'name': '時尚輕鬆休閒西裝', 'price': 2399, 'color': {'code': 'FFFFFF', 'name': '白色'}, 'size': 'S', 'qty': 1, 'img': 'http://dltnco5joak65.cloudfront.net/201807242216/productPhoto.jpg', 'max-qty': 5, 'subtotal': 2399}]),
//       paid: '1',
//       payment: JSON.stringify({'status': 0, 'msg': 'Success', 'amount': 2459, 'acquirer': 'TW_CTBC', 'currency': 'TWD', 'rec_trade_id': 'D20200611kh4rgf', 'bank_transaction_id': 'TP20200611kh4rgf', 'order_number': '', 'auth_code': '714998', 'card_info': {'issuer': '', 'funding': 0, 'type': 1, 'level': '', 'country': 'UNITED KINGDOM', 'last_four': '4242', 'bin_code': '424242', 'issuer_zh_tw': '', 'bank_id': '', 'country_code': 'GB'}, 'transaction_time_millis': 1591844708761, 'bank_transaction_time': {'start_time_millis': '1591844708790', 'end_time_millis': '1591844708790'}, 'bank_result_code': '', 'bank_result_msg': '', 'card_identifier': 'dee921560b074be7a860a6b44a80c21b', 'merchant_id': 'AppWorksSchool_CTBC'}),
//     };

//     // Add Orders Object to SQL
//     const sqlOrders = 'INSERT INTO orders SET ?';
//     await dbQuery(sqlOrders, orderObject);
//   } // end of for loop
//   console.log('Done inserting orders data');
//   db.end();
// };