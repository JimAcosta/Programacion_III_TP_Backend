const express = require('express');
const router = express.Router();

router.get('/productos', (req, res) => {
    res.json({ mensaje: 'API de productos funcionando' });
});

module.exports = router;
