#ifndef ENCRYPT_H
#define ENCRYPT_H

/*
********************************************************************************************
* INCLUDES
********************************************************************************************
*/

#include "Struct.h"
/*
*****************************************************************************************
* FUNCTION PROTOTYPES
*****************************************************************************************
*/

void Construct_Data_MIC(sBuffer *Buffer, sLoRa_Session *Session_Data, sLoRa_Message *Message);
void Calculate_MIC(sBuffer *Buffer, unsigned char *Key, sLoRa_Message *Message);
void Encrypt_Payload(sBuffer *Buffer, unsigned char *Key, sLoRa_Message *Message);
void Generate_Keys(unsigned char *Key, unsigned char *K1, unsigned char *K2);

#endif

