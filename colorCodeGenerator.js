const config = require('./config');
const mySQL = require('mysql');

// create db connection
const db = mySQL.createConnection({
  host: 'localhost',
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbDatabase,
});

// connect to db
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// define color name object  for color code
const colorCode = [
  {
    '1': {code: '334455', name: '深藍色'},
  },
  {
    '2': {code: 'FFFFFF', name: '白色'},
  },
  {
    '3': {code: 'DDFFBB', name: '蘋果綠'},
  },
  {
    '4': {code: 'DDF0FF', name: '淺藍色'},
  },
  {
    '5': {code: 'CCCCCC', name: '灰色'},
  },
  {
    '6': {code: 'BB7744', name: '巧克力色'},
  },
  {
    '7': {code: 'FFDDDD', name: '粉紅色'},
  },
];

// -------------------------SQL Insert for Color Code--------------------------

db.query('SELECT * FROM color', (err, result) => {
  if (err) {
    throw err;
  } else if (result.length === 0) {
    // Add Color Code to SQL
    let sqlColor = 'INSERT INTO color (id, code, name) VALUES ';

    for (let i = 0; i < colorCode.length; i++) {
      sqlColor += `
      (${i+1}, '${colorCode[i][i+1].code}', '${colorCode[i][i+1].name}'),`;
    }

    sqlColor = sqlColor.substr(0, sqlColor.length-1) + ';';

    db.query(sqlColor, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log('Successfully added colorCode into color!');
      }
    });
  }
});
