// Use with 2 blue motors. This code does not have encoder code.

#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>

// Motor A (front left)
int enA = D12;
int in1 = D11;
int in2 = D10;

// Motor B (front right)
int enB = D7;
int in3 = D9;
int in4 = D8;

void runMotors(int mspeed, float delayAmount)
{
  // Run all the motors for a certain amount of time
  analogWrite(enA, mspeed);
  analogWrite(enB, mspeed);
  delay(delayAmount);

  // Stop when done
  analogWrite(enA, 0);
  analogWrite(enB, 0);
}

// Function to Move Forward
void MoveForward(int mspeed, float delayAmount)
{
  // Set Motor A forward
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);

  // Set Motor B forward
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);

  // Run the motors at the specified speed, and amount of time
  runMotors(mspeed, delayAmount);
}

// Function to Move Reverse
void MoveReverse(int mspeed, float delayAmount)
{
  // Set Motor A reverse
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);

  // Set Motor B reverse
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);

  // Run the motors at the specified speed, and amount of time
  runMotors(mspeed, delayAmount);
}

// Function to Spin Right
void SpinRight(int mspeed, float delayAmount)
{
  // Set Motor A reverse
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);

  // Set Motor B forward
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);

  // Run the motors at the specified speed, and amount of time
  runMotors(mspeed, delayAmount);
}

// Function to Spin Left
void SpinLeft(int mspeed, float delayAmount)
{
  // Set Motor A forward
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);

  // Set Motor B reverse
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);

  // Run the motors at the specified speed, and amount of time
  runMotors(mspeed, delayAmount);
}

void setup()
{
  // On an STM32, setting the pinmode is necessary it seems. In an arduino, it automatically does it.
  pinMode(D12, OUTPUT);
  pinMode(D11, OUTPUT);
  pinMode(D10, OUTPUT);
  pinMode(D9, OUTPUT);
  pinMode(D8, OUTPUT);
  pinMode(D7, OUTPUT);

  // ****Motor Movement****
  /*
    255 is the max speed a motor can handle
    Blue motors can run at max 9V. 
    Battery pack I am using is a 8 pack AA pack, meaning it gives 12V (1.5V x 8), 
    Motor driver takes 1.4V about, meaning 10.6V is left for the motors.
    So 9/10.6 = x/255, therefore x = 215
    Therefore speeds that these blue motors can run at: Min = 140, Max = 215, (140-215)
  */
  // Format: MotorDirection(speed of motors (0-255), how ms long that action should last)

  MoveForward(140, 4000); // Ex: Forward at 140 speed for 4000 ms
  delay(1000);            // Wait one second
  MoveReverse(190, 4000);
  delay(1000); // Wait one second
  SpinRight(140, 4000);
  delay(1000); // Wait one second
  SpinLeft(200, 4000);
  delay(1000); // Wait one second
  MoveForward(190, 2000);
}

void loop()
{
}