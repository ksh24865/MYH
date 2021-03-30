#ifndef LORAMAC_H
#define LORAMAC_H

/*
********************************************************************************************
* INCLUDES
********************************************************************************************
*/

#include "Struct.h"

/*
********************************************************************************************
* TYPE DEFINITION
********************************************************************************************
*/

typedef enum {NO_RFM_COMMAND, NEW_RFM_COMMAND, RFM_COMMAND_DONE, JOIN} RFM_command_t;
/*
*****************************************************************************************
* FUNCTION PROTOTYPES
*****************************************************************************************
*/

void LORA_Cycle(sBuffer *Data_Tx, sBuffer *Data_Rx, RFM_command_t *RFM_Command, sLoRa_Session *Session_Data, sLoRa_OTAA *OTAA_Data, sLoRa_Message *Message_Tx, sLoRa_Message *Message_Rx, sSettings *LoRa_Settings);
void LORA_Send_Data(sBuffer *Data_Tx, sLoRa_Session *Session_Data, sLoRa_Message *Message_Tx,sSettings *LoRa_Settings);
void LORA_Receive_Data(sBuffer *Data_Rx, sLoRa_Session *Session_Data, sLoRa_OTAA *OTAA_Data, sLoRa_Message *Message, sSettings *LoRa_Settings);
bool LORA_join_Accept(sBuffer *Data_Rx,sLoRa_Session *Session_Data, sLoRa_OTAA *OTAA_Data, sLoRa_Message *Message, sSettings *LoRa_Settings);
void LoRa_Send_JoinReq(sLoRa_OTAA *OTAA_Data, sSettings *LoRa_Settings);

#endif

