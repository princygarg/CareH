var mongoose = require("mongoose");
var {Symptom} = require("./server/models/symptoms.js");
var {Room} = require("./server/models/rooms.js");

var data=[
    {
        name:"Fever",
        score: 20
    },
    {
        name:"Dry Cough",
        score: 10
    },
    {
        name:"Difficulty in breathing",
        score: 70
    },
    {
        name:"Sore throat",
        score: 10
    },
    {
        name:"Loss of taste/smell",
        score: 40
    },
    {
        name:"Chest pain",
        score: 50
    },
    {
        name:"Tiredness",
        score: 5
    },
    {
        name:"Acnes and pains",
        score: 5
    },
    {
        name:"Headache",
        score: 5
    },
    {
        name:"Lost of movement/speech",
        score: 100
    }
];

var data1=[
    {
        name:"Isolation"
    },
    {
        name:"Emergency"
    },
    {
        name:"General"
    }
    
];

function seedDB(){
        data.forEach(function(seed){
            var symptom = Symptom({
                name: seed.name,
                score: seed.score
            });
            symptom.save().then((symptom) => {
                console.log('Symptom added');
            }).catch((err) => {
                console.log(err);
            });
        });

        data1.forEach(function(seed){
            var room = Room({
                name: seed.name,
                score: seed.score
            });
            room.save().then((room) => {
                console.log('Room added');
            }).catch((err) => {
                console.log(err);
            });
        });
}

module.exports = seedDB;