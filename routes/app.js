const express = require('express');
const router = express.Router();

router.get('/app', (req, res) => {
    res.status(200).render('dashboard');
});

module.exports = router;
