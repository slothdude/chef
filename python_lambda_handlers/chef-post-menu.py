import json
import certifi
from elasticsearch import Elasticsearch


def lambda_handler(event, context):
    params = event.get('queryStringParameters', {})
    uid = params.get('uid', -1)
    body = event.get('body', {})

    menu = json.loads(body)
    user = menu.get('user', {})
    items = user.get('items', {})


    print(items)
    doc = {
        'menu': items,
    }
    es = Elasticsearch(['https://search-chefs-4jaw7tcf3j2ipj7jbrk3k3icny.us-east-1.es.amazonaws.com'])

    res = es.index(index="test-menu", doc_type='menu', id=uid, body=doc)
    response = {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": 'true'
        },
        'body': json.dumps({"res": res})
    }
    return response
