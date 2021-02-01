import FMI

DDB_RESOURCE = boto3.resource("dynamodb", region_name="<FMI>")

table = DDB_RESOURCE.<FMI>("lostcats")

table.<FMI>(
   Item={
        "breed": "Russian Blue",
        "petname": "Puddles"
    }
)

table.<FMI>(
   Item={
        "breed": "Scottish Fold",
        "<FMI>": "Hosepipe"
    }
)
