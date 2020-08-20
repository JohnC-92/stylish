/* eslint-disable max-len */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const config = require('../config');
const database = require('../models/db');
const {db, dbQuery, dbTransaction, dbCommit, dbRollback, dbLock, dbUnlock, dbConnectionQuery} = database;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const request = require('request-promise');

// ------------------------------User Sign Up API------------------------------

// define expire time for JWT token
const expireTime = '1h';

router.post('/user/signup', async (req, res) => {
  if ((req.headers['content-type'] !== 'application/json') ||
  (!req.body.name) || (!req.body.email) || (!req.body.password)) {
    return res.status(400).send(`Information incorrect! 
    Please provide: name, email, password and correct content-type`);
  }

  // get name, email, hashed password and JWT token
  const hash = crypto.createHash('sha256');
  const {name, email} = req.body;
  const password = hash.update(
      req.body.password + config.secretKey)
      .digest('hex');
  const provider = 'native';
  const picture = 'stylish-4.jpg';

  // jwt.sign({paylod}, secretKey, {options})
  const token = 'Bearer ' + jwt.sign(
      {
        admin: email,
      },
      config.secretKey,
      {
        expiresIn: expireTime,
      },
  );

  // construct signUpObj
  const signUpObj = {
    access_token: token,
    provider: provider,
    name: name,
    email: email,
    password: password,
    picture: picture,
  };

  // Begin SQL transaction to insert signUp user
  try {
    db.getConnection(async (err, connection) => {
      await dbTransaction(connection);

      const emailQuery = await dbQuery(`
      SELECT * FROM user WHERE email = ?`, [email]);

      // if !user, lock table and insert user
      if (emailQuery.length === 0) {
        await dbLock(connection, 'user');
        const insertQuery =
        await dbConnectionQuery(connection, `INSERT INTO user SET ?`, [signUpObj]);
        await dbUnlock(connection);

        console.log('Successfully added user data to user database!');

        res.cookie('access_token', token);
        res.json({
          data: {
            access_token: token,
            access_expired: expireTime,
            user: {
              id: insertQuery['insertId'],
              provider: provider,
              name: name,
              email: email,
              picture: picture,
            },
          },
        });

        // SQL commit to finish transaction
        await dbCommit(connection);
        connection.release();
        if (err) throw err;
        console.log('User Sign Up Transaction Complete');
      } else {
        res.status(403).send('Email already signed up!');
      }
    });
  } catch (err) {
    dbRollback(connection);
    connection.release();
    console.log(err);
    return res.status(500).send('Error when querying into user');
  }
});

// ------------------------------User Sign In API------------------------------
router.post('/user/signin', async (req, res) => {
  // get provider, email, hashed password and JWT token
  const {provider} = req.body;

  if ((req.headers['content-type'] === 'application/json') &&
  (provider === 'native') && (req.body.email) && (req.body.password)) {
    const email = req.body.email;
    const hash = crypto.createHash('sha256');
    const password = hash.update(
        req.body.password + config.secretKey)
        .digest('hex');

    // jwt.sign({payload}, secretKey, {options})
    const token = 'Bearer ' + jwt.sign(
        {
          admin: email,
        },
        config.secretKey,
        {
          expiresIn: expireTime,
        },
    );

    try {
      const dbUser = await dbQuery(`
      SELECT * FROM user WHERE provider = ? 
      AND email = ? AND password = ?`, [provider, email, password]);

      // If authorized, return and update token else sign in failed
      if (dbUser.length === 0) {
        res.status(403).send('Invalid User/Password! Sign In failed!');
      } else {
        await dbQuery(`
        UPDATE user SET access_token = ? 
        WHERE email = ?`, [token, email]);

        res.cookie('access_token', token);
        res.send({
          data: {
            access_token: token,
            access_expired: expireTime,
            user: {
              id: dbUser[0].id,
              provider: provider,
              name: dbUser[0].name,
              email: email,
              picture: dbUser[0].picture,
            },
          },
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('Error when querying user from server');
    }
  } else if ( (req.headers['content-type'] === 'application/json') &&
  //  (provider === 'facebook') && (req.query.access_token) ) {
    (provider === 'facebook') && (req.body.token) ) {
    // define FB API request options
    const options = {
      method: 'GET',
      // url: `https://graph.facebook.com/${config.appID}?fields=id,name,email&access_token=${config.appToken}`,
      url: `https://graph.facebook.com/me?fields=id,name,email&access_token=${req.body.token}`,
    };
    try {
      // request FB API to return user name and email
      let fbResponse = await request(options);
      fbResponse = JSON.parse(`${fbResponse}`);
      const name = fbResponse.name;
      const email = fbResponse.email;
      // const picture = `${config.s3URL}/stylish-4.jpg`;
      const picture = 'https://graph.facebook.com/' + id + '/picture?type=large';

      const token = 'Bearer ' + jwt.sign(
          {
            admin: email,
          },
          config.secretKey,
          {
            expiresIn: expireTime,
          },
      );

      try {
        // Begin SQL Transaction to insert user
        db.getConnection(async (err, connection) => {
          await dbTransaction(connection);

          const emailRes = await dbQuery(`
            SELECT * FROM user 
            WHERE email = ? AND provider = ?`, [email, provider]);
          // if !user, lock table and insert user
          if (emailRes.length === 0) {
            await dbLock(connection, 'user');
            const insertQuery = dbConnectionQuery(connection, `
            INSERT INTO user (access_token, provider, name, email, password, picture) 
            VALUES (?, ?, ?, ?, null, ?);`, [token, provider, name, email, picture]);
            await dbUnlock(connection);

            console.log('Successfully added FB user data to user database!');

            res.cookie('access_token', token);
            res.send({
              data: {
                access_token: token,
                access_expired: expireTime,
                user: {
                  id: insertQuery['insertId'],
                  provider: provider,
                  name: name,
                  email: email,
                  picture: picture,
                },
              },
            });

            // SQL commit to finish transaction
            await dbCommit(connection);
            connection.release();
            if (err) throw err;

            console.log('Transaction Complete');
          } else {
            // if user, update user
            await dbQuery(`
            UPDATE user SET access_token = ? 
            WHERE email = ?`, [token, email]);

            res.cookie('access_token', token);
            res.send({
              data: {
                access_token: token,
                access_expired: expireTime,
                user: {
                  id: emailRes[0].id,
                  provider: provider,
                  name: name,
                  email: email,
                  picture: picture,
                },
              },
            });

            // SQL commit to finish transaction
            await dbCommit(connection);
            connection.release();
            if (err) throw err;

            console.log('FB Sign In Transaction Complete');
          }
        });
      } catch (err) {
        dbRollback(connection);
        connection.release();
        console.log(err);
        res.status(500).send('Error when querying into user');
      }
    } catch (err) {
      console.log('Error when calling facebook api');
      res.status(500).send(err);
    }
  } else {
    return res.status(400).send(`Information incorrect! 
    Please provide: correct content-type, 
    provider(native) + (email, password) /
    provider(facebook) + (access_token)`);
  }
});

// ------------------------------User Profile API------------------------------
router.get('/user/profile', (req, res) => {
  // if header authorization, check if provided token is valid
  if (req.headers['authorization']) {
    let token = req.headers['authorization'];
    token = token.replace('%20', ' ');
    const tokenSplit = token.substr(7, token.length-1);

    // verify if JWT token is valid by comparing secretKey and endTime
    jwt.verify(tokenSplit, config.secretKey, async (err) => {
      if (err) {
        return res.status(400).send(err);
      }
      const dbUser = await dbQuery(`
      SELECT * FROM user WHERE access_token = ?`, [token]);

      // if token valid, return and update token else request failed
      if (dbUser.length === 0) {
        res.status(403).send('Invalid Access Token! Request failed!');
      } else {
        let picture;
        if (dbUser[0].provider === 'facebook') {
          picture = dbUser[0].picture;
        } else {
          picture = `${config.s3URL}/${dbUser[0].picture}`;
        }
        res.send({
          data: {
            id: dbUser[0].id,
            provider: dbUser[0].provider,
            name: dbUser[0].name,
            email: dbUser[0].email,
            picture: picture,
          },
        });
      }
    });
  } else {
    return res.status(400).send('Please provide access token');
  }
});

module.exports = router;
