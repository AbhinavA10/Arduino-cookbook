/*
  Repeats UART message to Serial
  Useful for seeing decoding capabilities of an oscilloscope.
*/

void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.print("Hello World!");
  delay(20);
}
