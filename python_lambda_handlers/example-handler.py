import json


def lambda_handler(event, context):
    # uid is guaranteed to be present because required query parameter
    params = event.get('queryStringParameters', {})
    uid = params.get('uid', -1)
    print(uid)
    response = {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": 'true'
        },
        'body': json.dumps({"uid": uid})
    }

    return response