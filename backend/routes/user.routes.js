const express = require("express");
const router = express.Router();


const userController = require("../controllers/user.controller")

router.get("/users", userController.users)
router.post("/users",userController.updateUser)
router.post("/login", userController.login)
router.get("/users/:id", userController.userInfo)

module.exports = router