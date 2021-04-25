const express = require('express');
const router = express.Router();


router.post('/login', function(req, res) {
    console.log(req);
    return res.send(req.body).status(200);
});

module.exports = router;
