# syntax=docker/dockerfile:1

FROM python:3.10.5-alpine3.16
WORKDIR /app
COPY . .
RUN pip3 install --upgrade pip -r requirements.txt
CMD ["gunicorn", "--bind", "0.0.0.0:80", "run:application"]