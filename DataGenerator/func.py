from kafka import KafkaProducer 
from json import dumps 
from datetime import datetime
import time 
import conf

def now():
    return str(datetime.fromtimestamp(time.time()))[:19]
def produce_data(producer,data,topic):
    producer.send(topic, value=data) 
    producer.flush()
def get_data(datapath):
    data = open(datapath,'r')
    line = data.readlines()
    return line