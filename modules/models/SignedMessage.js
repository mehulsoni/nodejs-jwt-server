const mongoose = require('mongoose');
const SignedMessageSchema = new mongoose.Schema({
	                                     owner: String,
	                                     sign: String,
	                                     isValid: Boolean,
	                                     message: String,
	                                     signedAddress: String,
	                                     signed_time: Date,
                                     });
mongoose.model('SignedMessage', SignedMessageSchema);

module.exports = mongoose.model('SignedMessage');