from elasticsearch import Elasticsearch
import json
import certifi


def lambda_handler(event, context):
    es = Elasticsearch(['https://search-chefs-4jaw7tcf3j2ipj7jbrk3k3icny.us-east-1.es.amazonaws.com'])
    res = es.get(index="test-chefs", doc_type='chef', id=1)
    response = {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": 'true'
        },
        'body': json.dumps({"res": res})
    }

    return response




