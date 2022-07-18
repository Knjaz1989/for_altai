from dotenv import load_dotenv
from flask import render_template, request
from app import application, celery
from mail import sending
import os

load_dotenv()


def show_page():
    return render_template("index.html")


# @celery.task
def send_mail():
    user_mail = request.form['mail'].lower()
    text = request.form['text']
    files = request.files.getlist("files")
    login = os.getenv("LOGIN")
    password = os.getenv("PASSWORD")
    files_dict = {}
    for file in files:
        if file.filename:
            byte_string = file.stream.read()
            files_dict[file.filename] = byte_string.decode()
    data = sending.delay(login, password, user_mail, text, files_dict)
    return render_template("index.html", data=data)


application.add_url_rule('/', view_func=show_page)
application.add_url_rule('/', view_func=send_mail, methods=['POST'])
