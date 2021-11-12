#define ENCA D4
#define ENCB D5

void setup() {
  Serial.begin(9600);
  pinMode(ENCA,INPUT);
  pinMode(ENCB,INPUT);
}

void loop() {
  int a = digitalRead(ENCA);
  int b = digitalRead(ENCB);
  Serial.print(a*5);
  Serial.print(" ");
  Serial.print(b*5);
  Serial.println();
}
