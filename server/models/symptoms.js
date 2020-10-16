const mongoose = require ('mongoose');
var SymptomSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
	   required: true 
    },
    score: {
        type: Number,
        required: true,
        default: 0
    }
});

var Symptom = mongoose.model('Symptom', SymptomSchema);

var scoreOfSymptom = {};

module.exports = {scoreOfSymptom, Symptom};
