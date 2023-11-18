const jwt = require("jsonwebtoken");

function JWTValidation(req, res, next) {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.json({ error });
      }
      // req.rol = decoded.rol;
    });
    next();  
}

  
module.exports = JWTValidation;