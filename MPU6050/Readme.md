# MPU6050
## Libraries:
- Under `\i2cdevlib-master_Arduino.zip\i2cdevlib-master\Arduino`, take the `I2Cdev` and `MPU6050` folder and put it in libraries of the Documents\Arduino.
- Install toxiclib libraries in processing or take the 2 folders inside `Toxiclib.zip` and put it in `\Documents\Processing\libraries`
    
## Notes / Help:
- To fix the MPU hanging at random times: ([Source](https://github.com/jrowberg/i2cdevlib/issues/519))

```cpp
    #if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
        Wire.begin();
        Wire.setClock(400000);
        Wire.setWireTimeout(3000, true); // Add in this line
```

- For the MPU teapot demo ([Source](https://create.arduino.cc/projecthub/Aritro/visualising-3d-motion-of-imu-sensor-3933b0)):

```cpp
    #define OUTPUT_TEAPOT //Uncomment this line
```