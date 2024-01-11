const express = require('express');
const router = express.Router();
const { createUser, deleteUser, updateUser } = require('../controllers/userController');
const { auth } = require('../middlewares/auth');
const {signup , login , logOut , forgotPassword , forgotPasswordSubmit , resetPassword} = require('../controllers/authController');
const { verifyOtp } = require('../controllers/authController');
const { starMessage } = require('../controllers/userController');






function isLoggedIn(req, res, next) {
    require.user ? next() : res.sendStatus(401)
  }

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout",isLoggedIn, logOut);
// router.post("/forgotPassword", forgotPassword);
// router.post("/forgotPassword/forgotPasswordSubmit", forgotPasswordSubmit);
// router.post("/forgotPassword/forgotPasswordSubmit/resetPassword", resetPassword);

// Routes that require authentication user API
router.delete("/", auth, deleteUser);
router.put("/", auth, updateUser);

// // TODO GOOGLE AUTH
// router.get('/auth/google', passport.authenticate('google',{scope:['email','profile']}) );
// router.get('/auth/google/redirect', passport.authenticate('google',
// {
//   successRedirect:'/auth/protected',
//   failureRedirect:'/auth/failure',
// }));
// router.get('/auth/protected',isLoggedIn,(req, res) => {
//     res.send('success google authenticate')
//     })


// router.get('/auth/failure',(req, res) => {
//         res.send('something wrong try again')
// })


//TODO OTP AUTH
router.post('/otp/verify',auth,verifyOtp);
// router.post('/otp/resend',auth, resendOtp);

// user starred messages
router.post('/starMessage', auth, starMessage);

module.exports = router;
