import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = mongoose.Schema({
  nim: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  dateOfBirth: {type: String, required: true},
  userName: {type: String, required: true},
  isDelete: {type: Boolean, default: false},
}, {
  timestamps: true,
});

userSchema.methods.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

userSchema.methods.validPassword = (password, user) => {
  const passFromDb = this === undefined ? user.password : this.password;
  return bcrypt.compareSync(password, passFromDb);
};

export default mongoose.model('User', userSchema);
