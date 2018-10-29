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
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;