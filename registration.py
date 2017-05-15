import csv
import os

from flask import Flask, send_file, request, render_template

app = Flask(__name__)

@app.route("/")
def registration_form():
    return send_file("reg-form.html")

FILE_NAME = "registrations.csv"
FIELDS = [
    "title",
    "first-name",
    "last-name",
    "country",
    "paper",
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
    "bus1",
    "bus2",
]

@app.route("/register", methods=['POST'])
def register():
    existed = os.path.exists(FILE_NAME)
    with open(FILE_NAME, "a") as csv_file:
        csv_writer = csv.DictWriter(csv_file, fieldnames=FIELDS, extrasaction='ignore')
        if not existed:
            csv_writer.writeheader()
        csv_writer.writerow(request.form)

    return render_template("completed.html", person=request.form, fields=['country', 'institution'])
