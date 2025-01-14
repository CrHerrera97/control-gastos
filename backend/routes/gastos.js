const { Router } = require('express');

const router = Router();

router.get('/',(req,res)=>{
    res.json({
        msg: 'Get gastos'
    })
})

module.exports = router;