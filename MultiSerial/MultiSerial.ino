/*
  Multiple Serial test

  Receives from the main serial port, sends to the others.
  Receives from serial port 1, sends to the main serial (Serial 0).

  For Arduino MEGA
  
  The circuit:
  - any serial device attached to Serial port 1
  - Serial Monitor open on Serial port 0
*/


void setup() {
  // initialize both serial ports:
  Serial.begin(9600);
  Serial1.begin(9600);
  Serial.println("Hello!");
  Serial1.println("Hello!");
}

void loop() {
  // read from port 1, send to port 0:
  if (Serial1.available()) {
    int inByte = Serial1.read();
    Serial.write(inByte);
  }

  // read from port 0, send to port 1:
  if (Serial.available()) {
    int inByte = Serial.read();
    Serial1.write(inByte);
  }
}
