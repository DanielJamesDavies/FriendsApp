const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({
        data: [{
            username: "username",
            nickname: "nickname"
        }]
    });
});

router.post('/:id', (req, res) => {
    res.status(200).send({
        id: req.params.id,
        data: req.body.data
    });
});

module.exports = router;