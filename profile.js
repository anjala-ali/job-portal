var express=require("express");
const router =express.Router
const auth=require('../../middleware/auth')
const User = require("./model/UserModel");

router.get('/', auth, async (req, res) => {
    try {
      // Find user by ID from authenticated user
      const User = await User.findOne({ id: req.UserModel.id }).populate('UserModel',['name','city']);
  
      if (!User) {
        return res.status(404).send('User not found');
      }
  
      // Send user data as response
      res.json(User);
    } catch (err) {
      console.error(err.message); // Corrected logging
      res.status(500).send('Server error');
    }
  });
  
  module.exports = router;