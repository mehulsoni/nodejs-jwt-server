var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	                                     email: String,
	                                     password: String,
	                                     firstName: String,
	                                     lastName: String,
                                     });
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');