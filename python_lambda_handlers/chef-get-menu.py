from elasticsearch import Elasticsearch
import json
import certifi


def lambda_handler(event, context):
    params = event.get('queryStringParameters', {})
    uid = params.get('uid', -1)

    es = Elasticsearch(['https://search-chefs-4jaw7tcf3j2ipj7jbrk3k3icny.us-east-1.es.amazonaws.com'])
    res = es.get(index="test-menu", doc_type='menu', id=uid)
    response = {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": 'true'
        },
        'body': json.dumps({"res": res})
    }

    return response




