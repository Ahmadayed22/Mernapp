const jwt = require("jsonwebtoken")
 const verifyToken = async (req,res,next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return  res.status(401).json({error:"Unauthorized"})
    }
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
           return res.status(401).json({error:"Unauthorized" || err})
        }
        req.user = user
       next()
    })

}
module.exports = verifyToken