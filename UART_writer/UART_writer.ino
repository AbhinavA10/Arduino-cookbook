/*
  For Arduino MEGA
  
  The circuit:
  - Arduino running "UART_printer" attached to Serial port 3
*/

int counter =0;
void setup() {
  Serial3.begin(9600);
}

void loop() {
  while(counter<255){
    Serial3.write(counter);
    counter++;
    delay(20);
  }
}
