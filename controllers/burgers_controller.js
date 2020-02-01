const express = require('express');
const burgers = require('../models/burgers')
const router = express.Router();

router.get('/', (req, res) => {
    burgers.selectAll(function(data) {
        const hbsObject = {
            burgers:data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    })
    // .catch((err) => {
    //     console.log(err)
    //     res
    //         .status(500)
    //         .send('Error Occured');
    // });
});

router.post('/api/burgers', function(req, res) {
    burgers.insertOne(
        ['burger_name', 'devoured'],
        [req.body.burger_name, req.body.devoured],
        function(result) {
            // sends back the id of a new burger selection
            res.json({ id: result.insertId });
        })
    //     .catch((err) => {
    //     console.log(err)
    //     res
    //         .status(500)
    //         .send('Error Occured');
    // });
});

router.put('/api/burgers/:id', function(req, res) {
    let condition = 'id = ' + req.params.id;
    console.log('condition', condition);
    burgers.updateOne({ devoured: req.body.devoured }, condition, function(result) {
        if(result.changedRows === 0) {
            return res
            .status(404)
            .send('Can not update')
            .end();
        } else{
            res
            .status(200)
            .send('Updated!')
            .end();
        }
    })
    // .catch((err) => {
    //     console.log(err)
    //     res
    //         .status(500)
    //         .send('Error Occured');
    // });
});

// router.deleteOne(condition, function(req, res) {
//     let condition = "id = " + req.params.id;
//     console.log('condition', condition);

router.delete('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}` 
    burgers.deleteOne(condition, function(result) {
        if (result.changedRows == 0) {
            return res
                .status(404)
                .send('ID not deleted!')
                .end()
        } else {
            res
                .status(200)
                .send('ID successfully deleted')
                .end()
        }
    });
    // .catch((err) => {
    //     console.log(err)
    //     res 
    //         .status(500)
    //         .send('Error Occured')
    // })
  });

module.exports = router;

// app.delete('/api/burgers/:id', (req, res) => {
//     const condition = `id = ${req.params.id}`
//     const results = delete(condition)
//     if (results.affectedRows === 0) {
//         return res 
//             .status(404)
//             .send('ID does not exist!')
//             .end() 
//     } else {
//         res 
//             .status(200)
//             .send('Deleted Successfully')
//             .end()
//     }
// });