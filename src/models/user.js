// user modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


//admin and user database schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true, //mandatory
      trim: true,     //tream blank spaces
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true, //mandatory
      trim: true,     //tream blank spaces
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,     //every user unique
      index: true,      //creating index based on username
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,         //tream blank spaces
      unique: true,       //every user unique
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    contactNumber: { type: String },
    pofilePicture: { type: String },
  },
  { timestamps: true }
);

userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compareSync(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema);