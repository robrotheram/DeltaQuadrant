var Kafka = require('no-kafka');
var connectionStr = "172.17.0.3:9092";
var producer = new Kafka.Producer({
  connectionString:connectionStr
});


function publishKafka(topic, message){
    producer.init().then(function(){
        var strMessage = JSON.stringify(message)
        console.log('sent message to kafka '+strMessage+' in topic '+topic);
        return producer.send({
            connectionString: connectionStr,
            topic: topic,
            partition: 0,
            message: {
                value: strMessage
            }
        });
    });
}




publishKafka('test','this is a test topic A');

publishKafka('test','this is a test topic B');


publishKafka('test','this is a test topic C');
process.exit();
