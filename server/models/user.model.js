const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs");
const validator = require("validator")
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required : true
    },
    email : {
        type: String,
        unique: true,
        required :true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default:"https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
    },
    IsAdmin: {
        type: Boolean,
        default:false,
    }

}, { timestamps: true })

// SignUp logic
UserSchema.statics.signup = async function (email, password, username) {
    if (!email || !password || !username) {
        throw Error("All Fields must be Filled")
    }
    if (!validator.isEmail(email)) {
        throw Error ("Email Not valid")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password Not Strong")
    }
    const EmailExist = await this.findOne({ email })
    const UsernameExist = await this.findOne({ username });
    if (EmailExist) {
        throw Error("email already in use")
    }
    if (UsernameExist) {
         throw Error("UserName already in use")
    }
    // const salt = await bcrypt.genSalt(10)
    const hash = await bcryptjs.hashSync(password,10)
    const user = await this.create({ email, password:hash, username })
    return user
}
// SignIn logic

UserSchema.statics.signIn = async function (email,password) {
    if (!email || !password) {
        throw Error("All Fields must be Filled")
    }
    const user = await this.findOne({email})
    if (!user) {
         throw Error("Incorrect email")
    }

    const match = await bcryptjs.compare(password, user.password)
    if (!match) {
        throw Error ("Incorrect password")
    }
    return user
}
const User = mongoose.model("User", UserSchema);

module.exports = User;