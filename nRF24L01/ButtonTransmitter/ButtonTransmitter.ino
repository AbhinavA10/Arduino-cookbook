// Works with SimpleReciever

#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(7, 8); // CE, CSN
const byte address[6] = "00001";

int button_pin = 2;
boolean button_state = 0;

void setup() {
  pinMode(button_pin, INPUT);
  radio.begin();
  radio.openWritingPipe(address);
  radio.setPALevel(RF24_PA_MIN);
  radio.stopListening();
}

void loop() {
  button_state = digitalRead(button_pin);
  if (button_state == HIGH) {
    const char text[] = "Hello World";
    radio.write(&text, sizeof(text));
  }
  delay(100);
}

//
//void loop()
//{
//  button_state = digitalRead(button_pin);
//  if (button_state == HIGH)
//  {
//    const char text[] = "Your Button State is HIGH";
//    radio.write(&text, sizeof(text));                  //Sending the message to receiver
//  }
//  else
//  {
//    const char text[] = "Your Button State is LOW";
//    radio.write(&text, sizeof(text));                  //Sending the message to receiver
//  }
//  radio.write(&button_state, sizeof(button_state));  //Sending the message to receiver
//  delay(1000);
//}
