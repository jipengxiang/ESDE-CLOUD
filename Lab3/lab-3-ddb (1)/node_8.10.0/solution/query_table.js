var 
    AWS = require("aws-sdk"),                            
    DDB = new AWS.DynamoDB({
        apiVersion: "2012-08-10",
        region: "us-east-1"
    });                                                   

(function queryTable(){
    var 
        params = {
            ExpressionAttributeValues: {
                ":catname": {
                    S: "Puddles"
                }
            },
            KeyConditionExpression: "petname = :catname",
            ProjectionExpression: "notable_features",
            TableName: "lostcats"
        };
     DDB.query(params, function(err, data){
         if(err){
             throw err;
         }
         console.log(data.Items[0].notable_features.S); 
     });
})();
