var mongoose = require ('mongoose');


mongoose.Promise = global.Promise;

//change the database with yours
mongoose.connect("mongodb://localhost/nhs-app");

module.exports = {mongoose};
