//https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html

var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  });

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "lostcats";

var petname = "Puddles";



var params = {
    TableName:table,
    Key:{
        "petname": petname
        }
    //ConditionExpression:"info.rating <= :val",
    //ExpressionAttributeValues: {
      //  ":val": 5.0
    };

console.log("Attempting a conditional delete...");
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});
