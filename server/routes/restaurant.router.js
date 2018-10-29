const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the restaurants
 */
router.get('/', (req, res) => {
    const query = `SELECT * FROM "restaurant";`
    pool.query(query)
    .then(results => {
        res.send(results.rows);
    })
    .catch(error => {
        console.log('ERROR',error);
        res.sendStatus(500);
    })
});

/**
 * POST new restaurant
 */
router.post('/', (req, res) => {
    const query = `INSERT INTO "restaurant" ("name", "latitude", "longitude", "restriction", "friendliness", 
    "costliness", "comments", "image_url")
    VALUES($1, $2, $3, $4, $5, $6, $7, $8);`;
    pool.query(query, [req.body.name, req.body.latitude, req.body.longitude, req.body.restriction,
    req.body.friendliness, req.body.costliness, req.body.comments, req.body.image_url]).then(() => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error with restaurant POST to database: ', error);
    });
});
