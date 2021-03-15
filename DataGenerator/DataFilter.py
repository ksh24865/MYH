# res = open('DATA/서울시 한강공원 이용객 현황 통계/report','w')
# for n in range(1,85):
#     report='DATA/서울시 한강공원 이용객 현황 통계/report ('+str(n)+').txt'    
#     f = open(report,'r')
#     line = f.readlines()
#     for i in range(2,len(line)):
#         res.write(line[i])
#     res.write('\n')


# res = open('DATA/서울시 한강공원 이용객 현황 통계/report2','w')
# report = open('DATA/서울시 한강공원 이용객 현황 통계/report','r')
# report = report.read()
# report=report.replace(',',"")
# res.write(report)

import random
res = open('DATA/trashinfo.txt','w')
text=""
i=0
while i < 597543:
    per = 0
    while per<100 :
        i+=1
        text+=str(per)+'\n'
        per+=random.randrange(1,10)
res.write(text)