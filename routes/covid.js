const express = require('express');
const router = express.Router();

router.get('/app/covid', (req, res) => {
    res.status(200).render('covid');
});

module.exports = router;
