const express = require('express')
const router= express.Router();
const pool= require('../db')

router.get("/start", (req, res)=>{
    res.json("started :))")
    // pool.query()
})

router.post("/db/login", async(req, res)=>{
    let {email, password} = req.body
    console.log(email, password)
    try{
        const user = await pool.query(`SELECT * FROM users WHERE email = ${JSON.stringify(email)} AND password = ${JSON.stringify(password)}`)
        if(user[0]?.email==email) res.json({login:true, user:user})
        else res.json({login:false, message:"email and password mismatch"})
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