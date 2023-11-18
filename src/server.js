const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const server = express();

const JWTValidation = require("./jwt-validation")
const taskRoutes = require("./tasks.routes");

server.use(express.json());
// server.use(JWTValidation);

server.use("/api/tasks", JWTValidation, taskRoutes);

const users = [
  { email: "admin@example.com", name: "admin", rol: "admin" },
  { email: "user@example.com", name: "user", rol: "user" },
];

server.get("/", function (req, res) {
  res.send("Bienvenido proyecto integrador api rest server lista de tareas con jwt y express");
});

server.post("/login", function (req, res) {
  const email = req.body.email;
  const exist = users.find((user) => user.email === email);
  if (!exist) {
    return res.status(401).send({ error: "Invalid user name or password" });
  }
  const token = jwt.sign(exist, process.env.SECRET_KEY, {
    expiresIn: 3600,
    algorithm: "HS256",
  });
    exist.token = token;
    res.json({ token });
});

// Escuchar en un puerto específico (por ejemplo, el puerto 3000)
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});