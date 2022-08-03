# syntax=docker/dockerfile:1

FROM python:alpine3.16
WORKDIR /app
COPY ./site .
RUN pip3 install --upgrade pip -r requirements.txt
CMD ["gunicorn", "run:application", "--bind", "0.0.0.0:80", "--worker-class", "aiohttp.GunicornWebWorker", "-w", "2"]
