var 
    AWS = require("aws-sdk"),                               
    DDB = new AWS.DynamoDB({
        apiVersion: "2012-08-10",
        region: "us-east-1"
    });                                                     

(function uploadItemstoDynamoDB(){
    var 
        cat_1 = {
            Item:{
                "petname":{
                    S: "Puddles"
                },
                "breed":{
                    S: "Russian Blue"
                }
            }, 
            ReturnConsumedCapacity: "TOTAL", 
            TableName: "lostcats"
        };
     DDB.putItem(cat_1, function(err, data){   
         console.log(err, data);         
     });
     var 
        cat_2 = {
            Item:{
                "petname":{
                    S: "Hosepipe"
                },
                "breed":{
                    S: "Scottish Fold"
                }
            }, 
            ReturnConsumedCapacity: "TOTAL", 
            TableName: "lostcats"
        };
     DDB.putItem(cat_2, function(err, data){   
         console.log(err, data);         
     });
})();
