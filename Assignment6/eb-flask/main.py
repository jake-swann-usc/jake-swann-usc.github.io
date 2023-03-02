from flask import Flask, request, jsonify, Response
import requests
import json

# ticketmaster api key -- aCWLPVCmdiIXGGhqklGGswfAP32Knqsu
# ipinfo api key -- d7637bfe3b1b96
# google api key -- AIzaSyBA3i9a3LPKXS06qtgdPUxHnOFXDxA0Ssg

app = Flask(__name__)

@app.route("/")
def home():
    return app.send_static_file("events.html")

@app.route("/search", methods=['GET'])
def results():
    key = request.args.get('key')
    dist = request.args.get('dist')
    cat = request.args.get('cat')
    loc = request.args.get('location')
    sort = request.args.get('sort')

    url = f'https://app.ticketmaster.com/discovery/v2/events.json?keyword={key}&geoPoint={loc}&radius={dist}&unit=miles&segmentId={cat}&sort={sort}&apikey=aCWLPVCmdiIXGGhqklGGswfAP32Knqsu'

    response = requests.get(url)
    #response.headers.add('Access-Control-Allow-Origin', '*')

    if response.status_code == 200:
        return response.text
    else:
        return 'Response Error'


if __name__ == "__main__":
    app.run(debug=True)

