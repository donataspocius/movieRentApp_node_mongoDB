const User = require("./../models/user.model.js");

const userSignup = async (req, res) => {
  const newUserData = req.body;

  try {
    const isUserExist = await User.findOne({ email: newUserData.email });

    if (!isUserExist) {
      const newUser = new User(newUserData);

      const createdUser = await newUser.save();

      res.json({
        message: "User created",
        user: createdUser,
      });
    } else {
      res.json({ message: "User with given email already exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  const userData = req.body;

  try {
    const user = await User.findOne(userData);

    if (user) {
      res.json({ message: "User founded", user });
    } else {
      res.json({ message: "User with given email and password not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserInfo = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userSignup, userLogin, getUserInfo };
