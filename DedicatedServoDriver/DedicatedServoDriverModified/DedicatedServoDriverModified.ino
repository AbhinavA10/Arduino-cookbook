#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

// called this way, it uses the default address 0x40
// pwm is adafruits library meant to mimic things like servo.writeMicroseconds in order for them to use it on the dedicated servo driver
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

#define SERVOMIN  600 // This is the rounded 'minimum' microsecond length, in this case the servo can have a minimum of 600 (600-2400 for 270 degrees rotation)
#define SERVOMAX  2400 // This is the rounded 'maximum' microsecond length, in this case the servo can have a maximum of 2400
#define SERVO_FREQ 50 // Analog servos run at ~50 Hz updates

// our servo # counter
uint8_t servonum = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("2 channel Servo test!");

  pwm.begin();
  /*
     In theory the internal oscillator (clock) is 25MHz but it really isn't
     that precise. You can 'calibrate' this by tweaking this number until
     you get the PWM update frequency you're expecting!
     The int.osc. for the PCA9685 chip is a range between about 23-27MHz and
     is used for calculating things like writeMicroseconds()
     Analog servos run at ~50 Hz updates, It is importaint to use an
     oscilloscope in setting the int.osc frequency for the I2C PCA9685 chip.
     1) Attach the oscilloscope to one of the PWM signal pins and ground on
        the I2C PCA9685 chip you are setting the value for.
     2) Adjust setOscillatorFrequency() until the PWM update frequency is the
        expected value (50Hz for most ESCs)
     Setting the value here is specific to each individual I2C PCA9685 chip and
     affects the calculations for the PWM update frequency.
     Failure to correctly set the int.osc value will cause unexpected PWM results
  */
  pwm.setOscillatorFrequency(27000000);
  pwm.setPWMFreq(SERVO_FREQ);  // Analog servos run at ~50 Hz updates

  delay(10);
}


void loop() {

  // Drive each servo one at a time using writeMicroseconds(), it's not precise due to calculation rounding!
  // The writeMicroseconds() function is used to mimic the Arduino Servo library writeMicroseconds() behavior.

  //Turn completely from the min to max position
  for (uint16_t microsec = SERVOMIN; microsec < SERVOMAX; microsec++) {
    pwm.writeMicroseconds(servonum, microsec);
    delay(1); //increase or decrease this to increase or decrease speed of the servo
  }

  delay(500);

  //Turn completely from the max to min position
  for (uint16_t microsec = SERVOMAX; microsec > SERVOMIN; microsec--) {
    pwm.writeMicroseconds(servonum, microsec);
    delay(1);
  }

  delay(500);

  servonum++;
  if (servonum > 1) servonum = 0; // Testing the first 2 servo channels, change the number in the if statement if you have more servos
}