const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const {check, validationResult} = require("express-validator");

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
var User = require('../models/User');

// CREATES A NEW USER
router.post('/register', [
	check("email", "Please enter a valid email").isEmail(),
	check("password", "Please enter a valid password").isLength({
		                                                            min: 6
	                                                            })
], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			                            errors: errors.array()
		                            });
	}

	const {
		lastName,
		firstName,
		email,
		password
	} = req.body;

	try {
		let user = await User.findOne({
			                              email
		                              });
		if (user) {
			return res.status(400).json({
				                            msg: "User Already Exists"
			                            });
		}
		user = new User({
			                email,
			                password,
			                firstName,
			                lastName,
		                });
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		await user.save();
		user.password = "<hidden>";
		res.status(200).json({auth: true, user: user});
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Error in Saving");
	}
});

router.post(
	"/authenticate",
	[
		check("email", "Please enter a valid username").isEmail(),
		check("password", "Please enter a valid password").isLength({
			                                                            min: 6
		                                                            })
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				                            errors: errors.array()
			                            });
		}

		const {email, password} = req.body;
		try {
			let user = await User.findOne({
				                              email
			                              });
			if (!user) {
				return res.status(400).json({
					                            message: "User Not Exist"
				                            });
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({
					                            message: "Incorrect Password !"
				                            });
			}

			const payload = {
				user: {
					email: user.email
				}
			};

			jwt.sign(
				payload,
				config.secret,
				{
					expiresIn: '1h'
				},
				(err, token) => {
					if (err) {
						throw err;
					}
					user.password = "<hidden>"
					res.status(200).json({
						                     auth: true,
						                     user: user,
						                     token: token,
					                     });
				}
			);
		} catch (e) {
			console.error(e);
			res.status(500).json({
				                     message: "Server Error"
			                     });
		}
	}
);

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
	User.findById(req.params.id, function (err, user) {
		if (err) {
			return res.status(500).send("There was a problem finding the user.");
		}
		if (!user) {
			return res.status(404).send("No user found.");
		}
		res.status(200).send(user);
	});
});


module.exports = router;