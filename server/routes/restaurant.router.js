const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the restaurants
 */
router.get('/', (req, res) => {
    const query = `SELECT * FROM "myrestaurants";`
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
    const query = `INSERT INTO "myrestaurants" ("name", "address", "latitude", 
    "longitude", "menu_url", "image_url")
    VALUES($1, $2, $3, $4, $5, $6);`;
    pool.query(query, [req.body.name, req.body.address, req.body.latitude, req.body.longitude,
    req.body.menu_url, req.body.image_url]).then(() => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error with restaurant POST to database: ', error);
    })
});


router.get('/:id', (req, res) => {
    const query = `
    SELECT myrestaurants.name, myrestaurants.restaurant_id, myrestaurants.address, myrestaurants.menu_url, myrestaurants.image_url,
    ratings.friendliness, ratings,costliness, ratings.comments
    FROM "ratings"
    INNER JOIN myrestaurants ON ratings.restaurant_id = myrestaurants.restaurant_id
    WHERE myrestaurants.restaurant_id = $1;`
    pool.query(query, [req.params.id])
    .then(results => {
        res.send(results.rows);
    })
    .catch(error => {
        console.log('Error with GET restaurant detail:', error);
    })
});

/**
 * POST ratings to Database
 */

router.post('/rating', (req, res) => {
    console.log('POSTING RATING TO SERVER!');
    console.log(req.body.restaurant_id);
    
    const query = `INSERT INTO "ratings" ("friendliness", "costliness", "comments", "restaurant_id")
    VALUES($1, $2, $3, $4);`;
    pool.query(query, [req.body.friendliness, req.body.costliness, req.body.comments,
        req.body.restaurant_id,]).then(() => {
        console.log('SUCCESS ADDING RATING');
        
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error with restaurant POST to database: ', error);
    })
});

module.exports = router;