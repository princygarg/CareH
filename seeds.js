var mongoose = require("mongoose");
var {Disease} = require("./server/models/diseases.js");
var {Room} = require("./server/models/rooms.js");

var data=[
    {
        name:"Fever",
        score: 20
    },
    {
        name:"Cough",
        score: 10
    },
    {
        name:"Breathing problem",
        score: 30
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
            var disease = Disease({
                name: seed.name,
                score: seed.score
            });
            disease.save().then((disease) => {
                console.log('Disease added');
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