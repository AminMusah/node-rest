const User = require("../Model/User");
const { getPostData } = require("../utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create a User
// POST /register
async function createUser(req, res) {
  try {
    const body = await getPostData(req);

    const { name, email, password } = JSON.parse(body);

    //hash password
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hash,
    };

    //checking if user already exist
    const emailExist = await User.findOne({ email });

    if (emailExist) {
      res.writeHead(400, { "Content-TYpe": "application/json" });
      return res.end("User Already Exist");
    }

    const newUser = await User.create(user);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ user: newUser._id }));
  } catch (error) {
    console.log(error);
  }
}

// user login
// POST /login
async function userLogin(req, res) {
  try {
    const body = await getPostData(req);

    const { name, email, password } = JSON.parse(body);

    //hash password
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hash,
    };

    //checking if email already exist
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      res.writeHead(400, { "Content-TYpe": "application/json" });
      return res.end("Email is wrong");
    }

    //checking if password is correct
    const validPassword = await bcrypt.compare(password, currentUser.password);

    if (!validPassword) {
      res.writeHead(400, { "Content-TYpe": "application/json" });
      return res.end("Invalid password");
    }

    //create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.setHeader("auth-token", token);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(token);
  } catch (error) {
    console.log(error);
  }
}

// Gets All users
// GET /users
async function getUsers(req, res) {
  try {
    const body = await getPostData(req);

    const { name, email } = JSON.parse(body);

    const user = {
      name,
      email,
    };

    const users = await User.find({ user })

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser,
  userLogin,
  getUsers,
};
