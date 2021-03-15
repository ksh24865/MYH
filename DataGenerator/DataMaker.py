import pandas as pd
import numpy

#기상정보
air_df=pd.read_csv('DATA/스마트서울 도시데이터 센서(S-DoT) 환경정보/S-DoT07.csv') # 읽어오기
air_df.drop(air_df[air_df['조도(lux)']  == 0].index,inplace=True) # 조도 0,null제거
air_df.drop(air_df[numpy.isnan(air_df['조도(lux)'])].index,inplace=True)
air_df = air_df[['초미세먼지(㎍/㎥)','미세먼지(㎍/㎥)','상대습도( %)','조도(lux)']] # 필요한 것만 인덱싱

#쓰레기통 정보
trash_df = pd.read_csv('DATA/trashinfo.txt')


#토양 정보
soil_df = pd.read_csv('DATA/Soil_humidity.csv') #읽어오기
soil_humid = soil_df[['10CM_정시_토양수분(%)']][:597543] #필요한 것 597543개만 인덱싱

#방문객 정보
visitor_df = pd.read_csv('DATA/서울시 한강공원 이용객 현황 통계/report2', sep = "\t") #읽어오기
visitor_df = (visitor_df[['합계']]//27)[:597543] #필요한 것 597543개만 인덱싱

#df 합친 후 저장
result = pd.concat([air_df,soil_humid,visitor_df,trash_df],axis=1, join='inner') # 데이터 모두 합치기
result.columns=["udust","dust","humid","lux","shumid","visitor","trash"] # col 이름 변경
result.to_csv("DATA/data.csv",mode='w') # csv파일로 저장