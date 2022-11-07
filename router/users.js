const { getUsers } = require("../controller/userController");

const router = async (req, res) => {
  //All users
  if (req.url === "/users" && req.method === "GET") {
    try {
      const users = await getUsers(req, res);
      res.writeHead(200, { "Content-Type": "application/json" });

      res.end(users);
    } catch (error) {
      res.writeHead(400, { "Content-TYpe": "application/json" });
      return res.end(JSON.stringify({ message: "Route not found" }));
    }
  }
};

module.exports = router;