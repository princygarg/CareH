const express = require('express');
const _ = require('lodash');
const router = express.Router();

var {scoreOfSymptom, Symptom} = require('../server/models/symptoms.js');
var {Patient} = require('../server/models/patient.js');

router.get('/app/addsymptomPage', (req, res) => {
    res.status(200).render('addsymptom', {pageTitle: "Add symptom"});
});

router.post('/app/addsymptomPage', (req, res) => {
    var symptomName = req.body.symptomName;
    var symptomScore = req.body.symptomScore;
    if (_.isString(symptomName) && !_.isNaN(symptomScore)) {
        var symptom = Symptom({
            name: _.capitalize(symptomName),
            score: symptomScore
        });

        symptom.save().then((symptom) => {
            console.log('Symptom added');
            res.status(200).redirect('/app/addsymptomPage');
        }).catch((err) => {
            console.log(err);
            res.status(400).redirect('/app/addsymptomPage');
        });
    } else {
        res.status(400).redirect('/app/addsymptomPage',{messages: req.flash('success_msg', 'Succesful test') });
    }
});

router.get('/app/getsymptoms', (req, res) => {
    Symptom.find({}, null, {sort: {name: 1}}).then((symptoms) => {
        var scoreOfSymptomJSON = {};
        if (_.isArray(symptoms)) {
            for (var i = 0; i < symptoms.length; ++i) {
                scoreOfSymptomJSON[symptoms[i].name] = symptoms[i].score;
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(scoreOfSymptomJSON));
    }).catch((err) => {
        console.log(err);
        res.status(404).send();
    });
});

router.post('/app/deletesymptoms', (req, res) => {
    var symptomsToDelete = req.body.DD;

    if (_.isArray(symptomsToDelete)) {
        for (var i = 0; i < symptomsToDelete.length; ++i) {
            var symptom = symptomsToDelete[i];
            Symptom.find({
                name: symptomsToDelete[i]
            }).remove().catch((err) => {
                console.log(err);
            });
            var promise = new Promise ((resolve, reject) => {
                 resolve(symptom);
                 reject(symptom);
            });
            Promise.all([promise.then(function (symptom) { return symptom; }), Patient.find({ symptoms: symptom })])
                 .then((data) => {
                     var symptomToDel = data[0];
                     console.log(symptomToDel);
                     var patients = data[1];
                     for (var i = 0; i < patients.length; ++i) {
                          var patient = patients[i];
                          var newSymptoms = [];
                          for (var j = 0; j < patient.symptoms.length; ++j)
                              if (patient.symptoms[j] !== symptomToDel) {
                                   newSymptoms.push(patient.symptoms[j]);
                              }
                          patient.symptoms = newSymptoms;
                          patient.lastUpdate = new Date().getTime();
                          patient.save().then((patient) => {
                               patient.updateScore();
                          }).catch((err) => {
                               console.log(err);
                          });
                     }
                 }).catch((err) => {
                      console.log(err);
                 });
        }
        res.status(200).redirect('/app/addsymptomPage');
    } else {
        console.log("POST /app/deletesymptom, symptomsToDelete is not an array");
        res.status(400).redirect('/app/addsymptomPage');
    }
});

module.exports = router;
