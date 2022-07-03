from flask import render_template
from app import application


def show_page():
    return render_template("index.html")


application.add_url_rule('/', view_func=show_page)
