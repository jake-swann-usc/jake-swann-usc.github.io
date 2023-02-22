from flask import Flask
import requests
import json

# ticketmaster api key -- aCWLPVCmdiIXGGhqklGGswfAP32Knqsu
# ipinfo api key -- d7637bfe3b1b96

app = Flask(__name__)

@app.route("/static/events.html", methods=["GET"])



