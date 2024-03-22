#!/bin/bash

#Update based on python requirements
pip3 install -r requirements.txt

#run the flask server using python
python3 -m flask run --host=0.0.0.0
