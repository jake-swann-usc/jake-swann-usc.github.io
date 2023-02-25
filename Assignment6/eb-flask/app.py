from flask import Flask, request
from flask import jsonify
import requests
import json

# ticketmaster api key -- aCWLPVCmdiIXGGhqklGGswfAP32Knqsu
# ipinfo api key -- d7637bfe3b1b96
# google api key -- AIzaSyBA3i9a3LPKXS06qtgdPUxHnOFXDxA0Ssg

app = Flask(__name__)

@app.route("/")
def home():
    return app.send_static_file("events.html")

@app.route("/?key=<key>&dist=<dist>&cat=<cat>&autoLocate=on")
def results():
    key=request.args.get("key")
    dist=request.args.get("dist")
    cat=request.args.get("cat")
    return key



if __name__ == "__main__":
    app.run(debug=True)










# # print a nice greeting.
# def say_hello(username = "World"):
#     return '<p>Hello %s!</p>\n' % username

# # some bits of text for the page.
# header_text = '''
#     <html>\n<head> <title>EB Flask Test</title> </head>\n<body>'''
# instructions = '''
#     <p><em>Hint</em>: This is a RESTful web service! Append a username
#     to the URL (for example: <code>/Thelonious</code>) to say hello to
#     someone specific.</p>\n'''
# home_link = '<p><a href="/">Back</a></p>\n'
# footer_text = '</body>\n</html>'

# # EB looks for an 'application' callable by default.
# application = Flask(__name__)

# # add a rule for the index page.
# application.add_url_rule('/', 'index', (lambda: header_text +
#     say_hello() + instructions + footer_text))

# # add a rule when the page is accessed with a name appended to the site
# # URL.
# application.add_url_rule('/<username>', 'hello', (lambda username:
#     header_text + say_hello(username) + home_link + footer_text))

# # run the app.
# if __name__ == "__main__":
#     # Setting debug to True enables debug output. This line should be
#     # removed before deploying a production app.
#     application.debug = True
#     application.run()