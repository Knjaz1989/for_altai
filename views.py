import smtplib
import os
import time
from email.message import EmailMessage
from dotenv import load_dotenv
from flask import render_template, request
from app import application

load_dotenv()

LOGIN = os.getenv("LOGIN")
PASSWORD = os.getenv("PASSWORD")


def show_page():
    return render_template("index.html")


def send_mail():
    user_mail = request.form['mail'].lower()
    text = request.form['text']
    address_list = [[LOGIN, text, "Новая заявка"], [user_mail, "Ваша заявка принята", "Заявка на перевод"]]
    for item in address_list:
        msg = EmailMessage()
        msg.set_content(item[1])
        msg['Subject'] = item[2]
        msg['From'] = LOGIN
        msg['To'] = item[0]
        s = smtplib.SMTP(host='smtp.mail.ru', port=25)
        s.starttls()
        s.ehlo()
        s.login(LOGIN, PASSWORD)
        s.send_message(msg)
        s.quit()
    return render_template("index.html")


application.add_url_rule('/', view_func=show_page)
application.add_url_rule('/', view_func=send_mail, methods=['POST'])
