from kafka import KafkaProducer 
from json import dumps 
from datetime import datetime
import time
import conf
import func
# sink : 1(광나루), 2(잠실), 3(뚝섬), 4(잠원), 5(반포), 6(이촌), 7(여의도), 8(양화), 9(망원), 10(난지), 11(강서)
# node : 각 공원당 12개씩

# sensor : [1(udust), 2(dust), 3(humid)], [4(lux), 5(shumid)], [6(visitor)], [7(trash)] 

# 한가앙 이름 순으로 한바퀴씩 돌면서 node 4개씩 있다고 가정 



line = func.get_data(conf.datapath)
producer = KafkaProducer(acks=0, compression_type='gzip', bootstrap_servers=[conf.ip + ':' + conf.port], value_serializer=lambda x: dumps(x).encode('utf-8')) 

i=1
# while(i<597543):
for node in range(3):
    timestamp = func.now()
    for sink in range(11):
        nowline = line[i].rstrip().split(',')
        i+=1
        for sensor in range(1,4):
            data = {"sensor_id":sensor,"node_id": 12*sink+3*node+1,"values":[nowline[sensor]],"timestamp":timestamp}
            func.produce_data(producer,data,conf.topic)
        for sensor in range(4,6):
            data = {"sensor_id":sensor,"node_id": 12*sink+3*node+2,"values":[nowline[sensor]],"timestamp":timestamp}
            func.produce_data(producer,data,conf.topic)
        sensor=6
        data = {"sensor_id":sensor,"node_id": 12*sink+3*node+3,"values":[nowline[sensor]],"timestamp":timestamp}
        func.produce_data(producer,data,conf.topic)
        sensor=7
        data = {"sensor_id":sensor,"node_id": 12*sink+3*node+4,"values":[nowline[sensor]],"timestamp":timestamp}
        func.produce_data(producer,data,conf.topic)
    # time.sleep(30)


