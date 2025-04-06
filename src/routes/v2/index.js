const express = require("express");

const router = express.Router();

router.use('/info', (req ,res) => {
     return res.json({msg:"form v2 api"})
})

module.exports = router;