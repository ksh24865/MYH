
struct Actuator{
  int actuatorId;
  int value[6];
  unsigned long interval[6];
  unsigned long previousMillis = 0;
  short int running_index=0;
  bool run  = false;
  short values_len = 0;
};