const mongoose = require('mongoose');
const _ = require('lodash');
var {scoreOfSymptom, Symptom} = require('./symptoms.js');
var rooms = require('./rooms.js');

var PatientSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	dateOfBirth: {
		type: String,
		required: true,
	},
	sex: {
		type: Boolean,
		required: true,
		default: true
	},
	hospitalNumber: {
		type: String,
		required: true,
		unique: true
	},
	
	symptoms: {
        type: Array,
        default: []
     },
     score: {
        type: Number,
	   required: true,
	   default: 0
     },
	room: {
		type: String,
		required: true,
		default: 'noroom'
	},
	lastUpdate: {
		type: Number,
		required: true
	}
});

PatientSchema.methods.updateScore = function () {
	var patient = this;
	var promise = new Promise(function(resolve, reject) {
		resolve(patient);
		reject(patient);
	})

	Promise.all([promise.then(function (patient) { return patient; }), Symptom.find({})])
         .then((data) => {
             var patient = data[0];
             var symptoms = data[1];

             var scoreOfSymptom = {};
             var score = 0;

		   if (! _.isEmpty(symptoms) && _.isArray(symptoms)) {
                 for (var i = 0; i < symptoms.length; ++i) {
                     scoreOfSymptom[symptoms[i].name] = symptoms[i].score;
                 }

            	  for (var i = 0; i < patient.symptoms.length; ++i) {
	                if (scoreOfSymptom[patient.symptoms[i]] > score) {
	        			score = scoreOfSymptom[patient.symptoms[i]];
	        	 	 }
             	 }
             }

             patient.score = score;
             patient.save().catch((err) => {
			   console.log(err);
		   });
         }).catch((err) => {
             console.log(err);
	 });
}

var Patient = mongoose.model('Patient', PatientSchema);
module.exports = {Patient};
