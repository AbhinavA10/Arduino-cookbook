#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>
//#include <TimerOne.h>

#define ENCA D2
#define ENCB D3

int pos = 0;

void readEncoder()
{
  int b = digitalRead(ENCB);
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
  pinMode(ENCA, INPUT);
  pinMode(ENCB, INPUT);
  attachInterrupt(digitalPinToInterrupt(ENCA), readEncoder, RISING);
}

void loop()
{
  Serial.println(pos);
}
