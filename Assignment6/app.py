from flask import Flask
from flask import jsonify
import json

app = Flask(__name__)

@app.route("/", methods=["GET"])
def hello():
    return "Hello World!\n"

