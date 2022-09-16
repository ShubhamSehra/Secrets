const dotenv = require("dotenv");
dotenv.config();
const router = require('express').Router();
const cors = require("cors");
const passport = require('passport');
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;


router.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET, POST, PUT, DELETE",
      credentials: true,
    })
  );

router.get("/login/success", (req, res)=>{
    if (req.user) {
        res.status(200).json({
            
            message: "sucessfully login",
            user: req.user,
        })
        console.log(user);
    } else {
        res.status(403).json({error:true, message: "not authorized"});
    }
})



router.get("/login/failed", (req, res)=>{
    res.status(401).json({
       
        message: "login failed",
    })
})
router.get ("/google", passport.authenticate("google",{scope: ["profile"]}));


router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
                console.log(req.session.user._id);
                const foundUser =  req.session.user;
                const id = foundUser.id;
                const token = jwt.sign({ id }, secret_key, {
                  expiresIn: 86400,
                });
                // console.log(id);
                res.json({ auth: true, token: token, result: foundUser })
                
  });
// router.get("/google/callback", passport.authenticate("google", {
//     successRedirect: `http://localhost:3000/secret/631e482a7a7b627316baf2d8`,
//     failureRedirect: "/login/failed",
// }));



router.get("/logout", (req, res)=>{
    req.logout();
    res.redirect(process.env.CLIENT_URL);
})

module.exports = router