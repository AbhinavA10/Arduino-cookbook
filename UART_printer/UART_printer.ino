/*
  For Arduino MEGA
  
  The circuit:
  - Arduino running "UART_writer" attached to Serial port 0
  - Serial Monitor open on Serial port 0
*/


void setup() {
  // initialize both serial ports:
  Serial.begin(9600);
  Serial3.begin(9600);
}

void loop() {
  // read from port 3, send to port 0:
  if (Serial3.available()) {
    int inByte = Serial3.read();
    Serial.println(inByte);
  }
}
