var kafka = require('kafka-node');
var Producer = kafka.Producer;
var Client = kafka.Client;
var client = new Client('172.17.0.2:2181');
var producer = new Producer(client);
producer.on('ready', function () {
    producer.send([
        { topic: 'test', key:'key1', partition: 0, messages: ['banana','carrot','lemon','apple','melon','kiwi','mango','avacado'], attributes: 0}
        ], function (err, result) {
        console.log(err || result);
        process.exit();
    });
});
