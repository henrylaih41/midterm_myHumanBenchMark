const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const RecordsSchema = new Schema({
	username: {
		type: String,
		required: [true, 'username field is required.']
	},
	reactTime_Best: {
		type: Number
    },
    reactTime_Avg: {
		type: Number
    },
    reactTime_count: {
		type: Number
	},
    numMemory_Best: {
		type: Number
    },
    numMemory_Avg: {
		type: Number
    },
    numMemory_count: {
		type: Number
	}
})

// Creating a table within database with the defined schema
const Records = mongoose.model('Records', RecordsSchema)

// Exporting table for querying and mutating
module.exports = Records