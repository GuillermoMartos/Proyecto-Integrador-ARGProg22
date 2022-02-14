const express = require('express')
const router= express.Router();
const pool= require('../db')

router.get("/start", (req, res)=>{
    res.json("started :))")
    // pool.query()
})

router.get("/db", async(req, res)=>{
    const user = await pool.query('SELECT * FROM users')
    res.json(user);
    
})


module.exports= router;