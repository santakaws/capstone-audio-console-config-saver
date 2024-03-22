FROM python:3.8-slim-buster

#WORKDIR /app
#COPY app.py app.py
#COPY requirements.txt requirements.txt


ARG PORT=5000
ENV PORT $PORT
EXPOSE $PORT 5001 5002

WORKDIR /opt/flask-python
ENV PATH /opt/flask-python.bin:$PATH
RUN mkdir -p /opt/flask-python
WORKDIR /opt/flask-python

ENTRYPOINT [ "./boot-script.sh" ]