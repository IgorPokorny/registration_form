import os
from flask import Flask, send_file, request

app = Flask(__name__)

@app.route("/")
def registration_form():
    return send_file("reg-form.html")

@app.route("/<filename>")
def static_file(filename):
    if os.path.exists(filename):
        return send_file(filename)
    else:
        return "Not found", 404

FIELDS = [
    "title",
    "first-name",
    "last-name",
    "pap-address",
    "institution",
    "department",
    "street",
    "city",
    "zipcode",
    "phone",
    "e-mail",
    "ico",
    "dic",
    "dph",
    "from",
    "to",
    "accommodation",
    "nights",
    "sum",
]

@app.route("/register", methods=['POST'])
def register():
    with open("registrations.csv", "a") as csv_file:
        values = []
        for field in FIELDS:
            values.append(request.form[field])
        csv_file.write(",".join(values))
        csv_file.write("\n")

    return "<b>Registration completed.</b>"

if __name__ == "__main__":
    app.run()