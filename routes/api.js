import express from 'express';
import NinjaCollection from '../models/ninja.js'

const router = express.Router();

router.get('/ninjas', (req, res) => {
    NinjaCollection.aggregate().near({
        near: {
            type: "Point",
            coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 300000, // 300 KM
        spherical: true,
        distanceField: "distance"
    }).then(ninjas => {


        if (ninjas) {

            if (ninjas.length === 0)

                return res.send({

                    message:

                        "maxDistance is too small, or your query params {lng, lat} are incorrect (too big or too small)."

                });

            return res.send(ninjas);

        }

    })

        .catch((err) => {
            res.status(500).send(err)
        });

});

router.post('/ninjas', (req, res) => {
    NinjaCollection.create(req.body, (err, data) => {
        if (err) {
            res.status(422).send(err);
        } else
            res.send(data);
    })
});

router.put('/ninjas/:id', (req, res) => {
    NinjaCollection.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {

            NinjaCollection.findOne({ _id: req.params.id }, (err, data) => {
                if (err) {
                    res.status(500).send(err)
                } else
                    res.send(data);
            })
        }
    })
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