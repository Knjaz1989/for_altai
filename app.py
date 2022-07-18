from flask import Flask
from celery import Celery

application = Flask("my_app")

celery = Celery(
    application.name,
    broker="redis://redis:6379/0",
    backend="redis://redis:6379/0",
    include=["mail"]
)
