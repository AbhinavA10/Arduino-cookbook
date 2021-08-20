/*
  Fixed UART test
  Repeats UART message to Serial1
  For Arduino MEGA
*/

void setup() {
  // initialize both serial ports:
  Serial1.begin(9600);
  Serial1.println("Hello!");
}

void loop() {
  Serial1.println("Value Test");
}
