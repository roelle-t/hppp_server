const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


// we are defining a Schema by specifying data types
const noteSchema = new mongoose.Schema({
    username: String,
    message: String,
    time: String

});

// userSchema.methods.authenticate = function(password) {      
//     return this.password === password;
//   }
// Compile a 'Movie' model using the movieSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Movies' for these documents.
module.exports = mongoose.model('Note', noteSchema)