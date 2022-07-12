import smtplib
import os
from email.message import EmailMessage
from dotenv import load_dotenv
from flask import render_template, request
from app import application

load_dotenv()


def show_page():
    return render_template("index.html")


def send_to_user(from_, password, to, subject, content):
    msg = EmailMessage()
    msg.set_content(content)
    msg['Subject'] = subject
    msg['From'] = from_
    msg['To'] = to
    s = smtplib.SMTP(host='smtp.mail.ru', port=25)
    s.starttls()
    s.ehlo()
    s.login(from_, password)
    s.send_message(msg)
    s.quit()


def send_mail():
    LOGIN = os.getenv("LOGIN")
    PASSWORD = os.getenv("PASSWORD")
    user_mail = request.form['mail'].lower()
    text = request.form['text']
    address_list = [
        [user_mail, "Заявка на перевод", "Ваша заявка принята"],
        [LOGIN, "Новая заявка", text]
    ]
    data = None
    for item in address_list:
        try:
            send_to_user(LOGIN, PASSWORD, item[0], item[1], item[2])
        except Exception as err:
            data = "Неверный адрес электронной почты"
            break
    return render_template("index.html", data=data)


application.add_url_rule('/', view_func=show_page)
application.add_url_rule('/', view_func=send_mail, methods=['POST'])
