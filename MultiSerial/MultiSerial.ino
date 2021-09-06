/*
  Multiple Serial test
  Receives from serial port 0, sends to the Serial 1.

  For Arduino MEGA
  
  The circuit:
  - any serial device attached to Serial port 1
  - Serial Monitor open on Serial port 0
*/


void setup() {
  // initialize both serial ports:
  Serial.begin(9600);
  Serial1.begin(9600);
}

void loop() {
  // read from port 0, send to port 1:
  if (Serial.available()) {
    int inByte = Serial.read();
    Serial1.write(inByte);
  }
}
