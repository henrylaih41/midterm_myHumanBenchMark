const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const loginMessageSchema = new Schema({
	username: {
		type: String,
		required: [true, 'username field is required.']
	},
	password: {
		type: String,
		required: [true, 'password field is required.']
	}
})

// Creating a table within database with the defined schema
const loginMessage = mongoose.model('loginMessage', loginMessageSchema)

// Exporting table for querying and mutating
module.exports = loginMessage
