from ast import arguments
from blockFunctions import *
from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin

app = Flask(__name__)
api = Api(app)

cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


class Transactions(Resource):
    def get(self):
        try:
            parser = reqparse.RequestParser() 
            parser.add_argument('txHash',required=True, type=str, help="txHash is required ", location="args")
            arguments = parser.parse_args()

            txInfo = getTransactionInfo(arguments["txHash"])
            return {"fullTxInfo": txInfo}, 200
        except:
            print("Error at transaction")


class Block(Resource):
    def get(self):
        try:
            parser = reqparse.RequestParser()  # initialize
            parser.add_argument('blockHash', required=True, location="args") #location="args"

            arguments = parser.parse_args()

            blockData = getBlockData(arguments["blockHash"])
            return {"blockData": blockData}, 200
        except:
            print("Error at block")


api.add_resource(Transactions, '/transactions')
api.add_resource(Block, '/block')

if __name__ == '__main__':
    app.run(debug=True)
