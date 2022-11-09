const { createUser,userLogin } = require("../controller/userController");

const router = async (req, res) => {
  //register
  if (req.url === "/register" && req.method === "POST") {
    try {
      const savedUser = await createUser(req, res);
      res.end(savedUser);
    } catch (error) {
      res.writeHead(400, { "Content-TYpe": "application/json" });
      return res.end(JSON.stringify({ message: "Route not found" }));
    }
  }

  //login
  if (req.url === "/login" && req.method === "POST") {
    try {
        const login = await userLogin(req,res)
        res.end(login);
    } catch (error) {
      res.writeHead(400, { "Content-TYpe": "application/json" });
      return res.end(JSON.stringify({message: 'Route not found'}))
    }
  }
};

module.exports = router;
