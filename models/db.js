const config = require('../config');
const mySQL = require('mysql');

// create db pool connection (AMAZON RDS)
const db = mySQL.createPool({
  connectionLimit: 200,
  host: 'dbjohntw.cuaiuio44lgw.ap-northeast-2.rds.amazonaws.com',
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbDatabase,
});

// Run db.query that returns promises
// Ex: dbQuery(sqlCode, sqlObject)
/**
 * @param {string} sqlCode SQL Language to make calls to database
 * @param {object} sqlObject SQL Object to insert to database
 * @return {object}
 */
function dbQuery(...sqlArgs) {
  return new Promise((resolve, reject) => {
    if (sqlArgs[1]) {
      db.query(sqlArgs[0], sqlArgs[1], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } else {
      db.query(sqlArgs[0], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    }
  });
}

/**
 * Function to start db transaction
 * @param {*} connection The connection from pool getConnection
 * @return {*} db promise object
 */
function dbTransaction(connection) {
  return new Promise((resolve, reject) => {
    connection.query('START TRANSACTION', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

/**
 * Function to commit db transaction
 * @param {*} connection The connection from pool getConnection
 * @return {*} db promise object
 */
function dbCommit(connection) {
  return new Promise((resolve, reject) => {
    connection.query('COMMIT', (err, results) => {
      if (err) {
        connection.query('ROLLBACK');
        console.log('Error when Commiting');
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

/**
 * Function to rollback db transaction
 * @param {*} connection The connection from pool getConnection
 * @return {*} db promise object
 */
function dbRollback(connection) {
  return new Promise((resolve, reject) => {
    connection.query('ROLLBACK', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

/**
 * Function to lock db table
 * @param {*} connection The connection from pool getConnection
 * @param {*} table lock table name
 * @return {*} db promise object
 */
function dbLock(connection, table) {
  return new Promise((resolve, reject) => {
    connection.query(`LOCK TABLES ${table} WRITE`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

/**
 * Function to lock db table
 * @param {*} connection The connection from pool getConnection
 * @return {*} db promise object
 */
function dbUnlock(connection) {
  return new Promise((resolve, reject) => {
    connection.query('UNLOCK TABLES', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

/**
 * Function to do connection query
 * @param {*} connection The connection from pool getConnection
 * @param {*} query The input SQL query
 * @param {*} sqlArgs Arguments to insert into SQL db
 * @return {*} db promise object
 */
function dbConnectionQuery(connection, query, sqlArgs) {
  return new Promise((resolve, reject) => {
    if (!sqlArgs) {
      connection.query(`${query}`, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } else {
      connection.query(`${query}`, sqlArgs, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    }
  });
}

module.exports = {db, dbQuery, dbTransaction, dbCommit, dbRollback, dbLock, dbUnlock, dbConnectionQuery};
