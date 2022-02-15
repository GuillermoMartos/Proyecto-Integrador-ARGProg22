const express = require('express')
const router= express.Router();
const pool= require('../db')

router.get("/start", (req, res)=>{
    res.json("started :))")
    // pool.query()
})

router.get("/db", async(req, res)=>{
    try{
        const user = await pool.query('SELECT * FROM users')
        res.json(user);
    }
    catch(err){
        console.log(err)
        res.json({err:"error for getting user info, please try again later"});
    }
})

router.post("/db", async(req, res)=>{
    let {email, password, name} = req.body
    try{
    const user = await pool.query(`INSERT INTO users (email, password, name, iduser) VALUES (${JSON.stringify(email)}, ${JSON.stringify(password)}, ${JSON.stringify(name)}, UUID_TO_BIN(UUID()))`)
    res.json(user);
    }
    catch(err){
        console.log(err)
        res.json({err:true, txt:"user creation unavailable right now, please try again later", plus:err});
    }
})


module.exports= router;