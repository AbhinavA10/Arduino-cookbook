/* For use with the colorview Arduino example sketch 
   Update the Serial() new call to match your serial port
   e.g. COM4, /dev/usbserial, etc!
*/

import processing.serial.*;
import java.awt.datatransfer.*;
import java.awt.Toolkit;
PrintWriter output;
Serial port;

void setup(){
 size(200,200);
 // remember to replace COM20 with the appropriate serial port on your computer ex Serial.list()[1]
 port = new Serial(this, "COM7", 9600); 
 port.clear();
 output = createWriter( "data.txt" );
}
 
String buff = "";

boolean receivedStart = false;
int wRed, wGreen, wBlue, wClear;
String hexColor = "ffffff";
 
void draw(){
 background(wRed,wGreen,wBlue);
 // check for serial, and process
 while (port.available() > 0) {
   serialEvent(port.read());
 }
}
void serialEvent(int serial) {
 
  if(serial != '\n') {
   buff += char(serial);
 } else {
    if (!receivedStart) {
      if (buff.indexOf("start")>0) {
        receivedStart = true;
        buff = "";
        return;
       } else {
          return;
        }
    }
   
   int cRed = buff.indexOf("R");
   int cGreen = buff.indexOf("G");
   int cBlue = buff.indexOf("B");
   //int clear = buff.indexOf("C");
      
   //if(clear >=0){
   //  String val = buff.substring(clear+3);
   //  val = val.split("\t")[0];
   //  wClear = Integer.parseInt(val.trim());
   //} else { return; }

   if(cRed >=0){
     String val = buff.substring(cRed+3);
     val = val.split("\t")[0]; 
     wRed = Integer.parseInt(val.trim());
   } else { return; }
   
   if(cGreen >=0) {
     String val = buff.substring(cGreen+3);
     val = val.split("\t")[0]; 
     wGreen = Integer.parseInt(val.trim());
   } else { return; }
   
   if(cBlue >=0) {
     String val = buff.substring(cBlue+3);
     val = val.split("\t")[0]; 
     wBlue = Integer.parseInt(val.trim());
   } else { return; }
   
   //wRed *= 255; wRed /= wClear;
   //wGreen *= 255; wGreen /= wClear; 
   //wBlue *= 255; wBlue /= wClear; 

   print("Red: "); print(wRed);
   print("\tGrn: "); print(wGreen);
   print("\tBlue: "); print(wBlue);
   //print("\tClr: "); println(wClear);
   hexColor = hex(color(wRed, wGreen, wBlue), 6);
   print("\t HEX: ");
   print(hexColor);
   println();
  
   buff = "";
 }
}

void printColors() {
   hexColor = hex(color(wRed, wGreen, wBlue), 6);
   output.print(wRed + ", " + wGreen + ", " + wBlue + ", " + hexColor);
   output.println();
}

void keyPressed() {
  if(key == 'r' || key == 'R'){
    output.print("Red: ");
    printColors();
  }
  else if(key == 'g' || key == 'G'){
    output.print("Green: ");
    printColors();
  }
  else if(key == 'b' || key == 'B'){
    output.print("Green: ");
    printColors();
  }
  else  if (key==CODED) {
    if (keyCode==ESC) {
      output.flush();  // Writes the remaining data to the file
      output.close();  // Finishes the file
      exit();  // Stops the program
    } 
  }
  else  if (key== 'q') {
    output.flush();  // Writes the remaining data to the file
    output.close();  // Finishes the file
    exit();  // Stops the program
  } 
}
