import random
import socket
import time

def get_state():
    if random.randint(0,10) > 2:
        return "true"
    else:
        return "false"
def make_msg(sid):
    msg=""
    msg+='{'    
    msg+='"sid": '+str(sid)+', "state": ['
    for nid in range(1,10):
        msg+='{"nid": '+str((sid-1)*9+nid)+', "state": '+get_state()+', "battery": '+str(100-nid)+'}'
        if nid < 9:
            msg+=','
        else:
            msg+=']}'
    return msg


for i in range(1,12):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
    sock.connect(('10.5.110.11', 8085)) 
    sock.send(make_msg(i).encode())    
    time.sleep(0.2)

{
    "sensor_id": 12,
    "node_id":34,
    "values" : [
        56.78,
        9.0
    ],
    "timestamp": "2021-03-25 18:29:42"
}
