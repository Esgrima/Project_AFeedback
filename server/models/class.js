var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Building = require('./building'),
    ObjectID = Schema.Types.ObjectId;

var courseTaught = new Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: ObjectID,
        ref: "Building",
        required: true
    },
    room:{
        type: String,
        required: true,
    },
    //Gonna have to figure a way to have recurring dates 
    time: [String]//This will be of the type Day + Start Time + End Time
    /*
        time : [
            M:  9:35 - 10:25
            W:  9:35 - 10:25
            F:  9:35 - 10:25
        ]
    */,
    classType: {
        type: String,
        enum: ['Office Hour', 'Lecture', 'Discussion'],
        required: [true, "Need a class type"]
    }
});

var Class = mongoose.model("Class", courseTaught);

module.exports = Class, courseTaught;