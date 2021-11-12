#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>
//#include <TimerOne.h>

#define ENCA D2
#define ENCB D3

int pos = 0;
// Reads data coming from encoder and changes encoder count
void readEncoder()
{
  // Read data from other encoder pin
  int b = digitalRead(ENCB);
  // Depending on which way you are rotating the wheels, it increases or decreases the count
  // 135 count = 1 rotation
  if (b > 0)
  {
    pos++;
  }
  else
  {
    pos--;
  }
}

void setup()
{
  Serial.begin(9600);
  // Set Encoder pins to input
  pinMode(ENCA, INPUT);
  pinMode(ENCB, INPUT);
  // Attach the interrupt pin to the function whenever there is a rising edge in the signal
  attachInterrupt(digitalPinToInterrupt(ENCA), readEncoder, RISING);
}

void loop()
{
  Serial.println(pos);
}