const {model} = require('mongoose');
const {UserSchema} = require('../schemas/Users');
const bcrypt = require("bcrypt");


UserSchema.pre("save", async function () {
  if(!this.isModified("password")) return;
  
    this.password = await bcrypt.hash(this.password, 12);
 
});

const UserModel = new model('user',UserSchema)


module.exports = {UserModel};