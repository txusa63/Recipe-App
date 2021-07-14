const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.post('/register', async (req, res) => {
    try {
        let {email, password, passwordVerify, displayName} = req.body;

        if(!email || !password || !passwordVerify) {
            return res.status(400).json({errorMessage: 'Please enter all required fields'});
        }

        if(password.length < 6) {
            return res.status(400).json({errorMessage: 'Password needs to be at least 6 characters'});
        }

        if(password !== passwordVerify) {
            return res.status(400).json({errorMessage: 'Given passwords do not match'});
        }

        if(!displayName) {
            displayName = email;
        }

        const existingUser = await User.findOne({email: email});
        if(existingUser) {
            return res.status(400).json({errorMessage: 'An account with this email already exists'})
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            passwordHash: passwordHash,
            displayName: displayName
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({user: savedUser._id}, process.env.JWT_SECRET);

        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'none'}).send();
    } 
    
    catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});


router.post("/login", async (req, res) => {
    try {
        let { email, password, displayName} = req.body;
    
        if (!email || !password) {
            return res.status(400).json({ errorMessage: "Please enter all required fields" });
        }

        if(!displayName) {
            displayName = email;
        }
  
        const existingUser = await User.findOne({email:email});
        if (!existingUser) {
            return res.status(401).json({ errorMessage: "No account with this email exists" });
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            return res.status(401).json({ errorMessage: "Wrong email and/or password" });
        }

        const token = jwt.sign({user: existingUser._id,}, process.env.JWT_SECRET);
    
        res.cookie("token", token, {httpOnly: true, secure: true, sameSite: "none"}).send("Logged in");
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).send({ error: err.message });
    }
});


router.delete('/delete', auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);

        res.cookie("token", token, {httpOnly: true, secure: true, sameSite: "none"}).send("Deleted");
    } 

    catch (err) {
        res.status(500).send();
    }
})
  

router.get("/logout", (req, res) => {
    res.cookie("token", "", {httpOnly: true, expires: new Date(0), secure: true, sameSite: "none"}).send();
});
  

router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json(false);
        }
  
        jwt.verify(token, process.env.JWT_SECRET);
  
        res.send(true);
    }

    catch (err) {
        res.json(false);
    }
});
  
  module.exports = router;