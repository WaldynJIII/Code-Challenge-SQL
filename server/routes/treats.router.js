const treatsRouter = require('express').Router();
const pool = require('../modules/pool');


// GET /treats
treatsRouter.get('/', (req, res) => {
    console.log('GET route was hit', req.query);
    pool.query(`SELECT * FROM "treats" WHERE "name"=$1;`,[req.query.q])
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
            console.log('error with insert:', error);
            res.sendStatus(500);
        });
});
// PUT /treats/<id>
treatsRouter.put('/:id', (req, res) => {
    console.log('in put request');
    console.log('req.params', req.body);


    pool.query(`UPDATE "treats" SET "description" = $2 
    WHERE "id" = $1;`, [req.params.id, req.body.description])
        .then(() => {
            res.sendStatus(204);
        }).catch((error) => {
            res.sendStatus(500);
        });
})
// DELETE /treats/<id>
treatsRouter.delete('/:id', (req, res) => {
    console.log('/list DELETE request was hit');
    console.log('req.params', req.params);
    pool.query(`DELETE FROM "treats" WHERE "id"=$1;`, [req.params.id])
        .then(() => {
            res.sendStatus(204);
        }).catch(error => {
            console.log('there was an error on the delete query', error);

            res.sendStatus(500);
        });
});
module.exports = treatsRouter;
