const jwt = require("jsonwebtoken")
 const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return  res.status(401).json({error:"Unauthorized Token"})
    }
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
           return res.status(401).json({error:"Unauthorized  or Invalid Token" , details: err.message })
        }
        req.user = user
       next()
    })

}
module.exports = verifyToken