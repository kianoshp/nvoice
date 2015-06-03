var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost/nvoiceDB';

mongoose.connect(connectionString);

mongoose.connection.on('error', function(err){
  console.log(err);
});

mongoose.connection.on('connected', function(){
  console.log('Mongoose is connected to ' + connectionString);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports.Schema = mongoose.Schema;
