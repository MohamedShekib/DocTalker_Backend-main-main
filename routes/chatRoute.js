const express = require('express');
const router = express.Router();
const {getAllChats,getChat, deleteChat, updateChat , getAllStarredMessages} = require('../APIs/chatAPIs');

const { auth } = require('../middlewares/auth');


// TODO : ADD AUTH MIDDLEWARE


// for testing only -- Chat CRUD Operations
// router.use(auth);
router.get("/:id", getChat);
router.get("/" , getAllChats);
router.delete("/:id",deleteChat);
router.put("/:id",updateChat);

// Starred Messages
router.get("/starredMessages/:id", getAllStarredMessages);



module.exports = router;    