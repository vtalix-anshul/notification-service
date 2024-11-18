const express = require("express");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { isAdmin } = require("../../middlewares/checkRole");
const router = express.Router();

router.use("/create-user", (req,res)=>{
    console.log('working while creating notification');
    res.send("working while creating notification");
})
router.put("/update/:id", authMiddleware, isAdmin, (req,res)=>{
    console.log('working while updating notification');
    res.send('working while updating notification');
});

router.delete("/delete/:id", authMiddleware, isAdmin, (req,res)=>{
    console.log(":working while deleting the notification");
    res.send("working while deleting the notificationzx ")
});

module.exports = router;
