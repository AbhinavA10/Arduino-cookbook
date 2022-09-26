# Dedicated Servo Driver
- Install the "Adafruit PWM Servo Driver" library in the libraries in Arduino IDE, or unzip and copy the library in this folder to "Documents/Arduino/libraries"
- Will need a 5V power supply with enough amps when running many servos
- https://learn.adafruit.com/16-channel-pwm-servo-driver/overview
- The modified test code uses microseconds, not pulses, and you must set the min and max based on your servo

Arduino Mega 2560 wiring:
- +5v -> VCC (this is power for the BREAKOUT only, NOT the servo power!)
- GND -> GND
- SDA -> SDA
- SCL -> SCL