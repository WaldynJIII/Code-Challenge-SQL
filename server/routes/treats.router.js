const treatsRouter = require('express').Router();
const pool = require('../modules/pool');


// GET /treats
treatsRouter.get('/', (req, res) => {
    console.log('GET route was hit');
    pool.query('SELECT * FROM "treats";')
        .then((results) => {
            console.log(results.rows)
            res.send(results.rows);
        }).catch((error) => {
            console.log('error with task select', error);
            res.sendStatus(500);
        });
});
// POST /treats
treatsRouter.post('/', (req, res) => {
    console.log('post route was hit', req.body);
    let queryText = `INSERT INTO "treats"("name", "description", "pic")
    VALUES($1, $2, $3);`;

    pool.query(queryText, [req.body.name, req.body.description, req.body.pic])
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error with koala insert:', error);
            res.sendStatus(500);
        });
});
// PUT /treats/<id>

// DELETE /treats/<id>

module.exports = treatsRouter;
