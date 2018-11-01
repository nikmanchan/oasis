const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the restaurants
 */
router.get('/', (req, res) => {
    const query = `SELECT * FROM "restaurants";`
    pool.query(query)
    .then(results => {
        res.send(results.rows);
    })
    .catch(error => {
        console.log('ERROR with GET restaurants:',error);
        res.sendStatus(500);
    })
});

/**
 * POST restaurant to Database
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
    })
});

router.get('/:id', (req, res) => {
    const query = `
    SELECT restaurants.name, restaurants.address, restaurants.menu_url, restaurants.image_url,
    ratings.friendliness, ratings,costliness, ratings.comments
    FROM "ratings"
    INNER JOIN restaurants ON ratings.restaurant_id = restaurants.restaurant_id
    WHERE restaurants.restaurant_id = $1;`
    pool.query(query, [req.params.id])
    .then(results => {
        res.send(results.rows);
    })
    .catch(error => {
        console.log('Error with GET restaurant detail:', error);
    })
});

module.exports = router;