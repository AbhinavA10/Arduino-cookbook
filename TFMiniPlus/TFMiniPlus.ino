// Demonstrates reading from TFMiniPlus sensor over UART

int uart[9];

int dist;
int strength;
int temp;

int check;
int i;

const int HEADER = 0x59; // Frame header in data
void setup() {
  Serial.begin(115200);
  Serial3.begin(115200);
}

void loop() {
  // Data structure to read in is based on datasheet
  if (Serial3.available() >= 9) {
    if (Serial3.read() == HEADER) {
      uart[0] = HEADER;
      if (Serial3.read() == HEADER) {
        uart[1] = HEADER;
        for (i = 2; i < 9; i++) {
          uart[i] = Serial3.read();
        }
        check = uart[0] + uart[1] + uart[2] + uart[3] + uart[4] + uart[5] + uart[6] + uart[7];
        if (uart[8] == (check & 0xff)) { // checksum (byte 8) is lower 8 bits of sum of first 8 bytes
          dist = uart[2] + uart[3] * 256; // in cm
          strength = uart[4] + uart[5] * 256;
          temp = uart[6] + uart[7] * 256;
          Serial.println(dist);
          delay(10);
        }
      }
    }
  }
}
