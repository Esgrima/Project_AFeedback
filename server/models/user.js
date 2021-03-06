var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    Class = require('./class'),
    courseTaught = require('./class');
ObjectID = Schema.Types.ObjectId;

var userSchema = new Schema({//Both of these will have to be compared with regex validation with the argument @(\w){0,10}(?:\.)?ufl\.edu
    username: {
        type: String,
        required: true,
        match: /([0-9A-Za-z\.]){1,100}@(\w){0,10}(?:\.)?ufl\.edu///Valdiates that email is either a @<something>.ufl.edu or @ufl.edu email address

    },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    role: {
        type: String,
        enum: ['Applicant', 'Company'],
        required: [true, "Need a role"]
    },

    class: [{ type: ObjectID, ref: "courseTaught" }]

});
//Makes a super cool hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Check the password to see if it is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
