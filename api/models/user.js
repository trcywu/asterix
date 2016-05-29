var mongoose  = require('mongoose');
var bcrypt    = require("bcrypt-nodejs");
var validator = require('validator');

var userSchema = new mongoose.Schema({
  firstName:    { type: String },
  lastName:     { type: String },
  image:        { type: String },
  username:     { type: String, required: true, unique: true },
  email:        { type: String, required: true, unique: true },
  passwordHash: { type: String }
}, {
  timestamps: true
});



  userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.passwordHash, null);
  };

  userSchema.virtual('password')
    .set(function(password){
      this._password    = password;
      this.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    });

  userSchema.virtual('passwordConfirmation')
    .set(function(passwordConfirmation){
      this._passwordConfirmation = passwordConfirmation;
    });

    userSchema.path('passwordHash')
    .validate(function(){
      if (this.isNew){
        if (!this._password){
          this.invalidate('password', 'Password is required');
        }
        if (this._password.length < 6){
          this.invalidate('password', 'Password must be longer than 6 characters.');
        }
        if (this._password !== this._passwordConfirmation){
          this.invalidate('passwordConfirmation', 'Passwords must match');
        }
      }
    });

    userSchema.set('toJSON', {
  transform: function(doc, ret, options){
      delete ret.passwordHash;
      return ret;
  }
});

module.exports = mongoose.model("User", userSchema);
