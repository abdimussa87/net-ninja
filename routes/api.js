import express from 'express';
import NinjaCollection from '../models/ninja.js'

const router = express.Router();

router.get('/ninjas', (req, res) => {
    res.status(200).send({ type: "GET" });
});

router.post('/ninjas', (req, res) => {
    NinjaCollection.create(req.body, (err, data) => {
        if (err) {
            res.status(422).send(err.errors.name.message);
        } else
            res.send(data);
    })
});

router.put('/ninjas/:id', (req, res) => {

});

router.delete('/ninjas/:id', (req, res) => {
    NinjaCollection.findByIdAndDelete({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.send(data);
        }
    })
})

export default router;