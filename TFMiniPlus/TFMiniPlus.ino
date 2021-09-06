//#include<SoftwareSerial.h>
//SoftwareSerial Serial3(10, 9); //Set Transmit and Recieve pins, pin 2 is RX, pin 3 is TX

int dist;
int strength;
int check;
int uart[9];
int i;
const int HEADER = 0x59;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial3.begin(115200);
  Serial.println("start");
}

void loop() {
  if (Serial3.available()) {
    if (Serial3.read() == HEADER) {
      uart[0] = HEADER;
      if (Serial3.read() == HEADER) {
        uart[1] = HEADER;
        for (i = 2; i < 9; i++) {
          uart[i] = Serial3.read();
        }
        check = uart[0] + uart[1] + uart[2] + uart[3] + uart[4] + uart[5] + uart[6] + uart[7];
        if (uart[8] == (check & 0xff)) {
          dist = uart[2] + uart[3] * 256;
          strength = uart[4] + uart[5] * 256;
          Serial.print(dist);
          Serial.print('\n');
          delay(10);
        }
      }
    }
  }
}
