

const express = require('express');
const router = express.Router();

const handle = require('../router_handler/uploadimg');

router.post('/uploadimg',handle.uploadimg);
router.post('/delimg',handle.delimg);

module.exports = router;