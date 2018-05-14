import json
import certifi
from elasticsearch import Elasticsearch


def lambda_handler(event, context):

    #body = event.get('body', {})

    #menu = json.loads(body)
    #uids = menu.get('uids', {})


    #print(uid)
    doc = {
        'uids': ["7o8vlxdWqfe3m2hfIPH6nj0tpHJ3"],
    }
    es = Elasticsearch(['https://search-chefs-4jaw7tcf3j2ipj7jbrk3k3icny.us-east-1.es.amazonaws.com'])

    res = es.index(index="test-chefs", doc_type='chef', id=1, body=doc)
    response = {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": 'true'
        },
        'body': json.dumps({"res": res})
    }
    print(response)
    return response

lambda_handler("a","b")