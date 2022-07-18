from flask import Flask
from celery import Celery

application = Flask("my_app")

celery = Celery(
    application.name,
    broker="redis://127.0.0.1:6379/0",
    backend="redis://127.0.0.1:6379/0",
    include=["mail"]
)
