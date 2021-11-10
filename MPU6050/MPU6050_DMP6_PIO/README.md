This project compiles fine in Platformio.

MPU6050 and I2Cdev folders taken from the zip file as described in earlier README.

## No longer relevant: (issue was fixed in the library itself)

To get compilation without warnings, followed: https://github.com/jrowberg/i2cdevlib/issues/424#issuecomment-501341054

In `MPU6050.h`, removed the `if def` and `endif` lines:

```cpp
#if defined(MPU6050_INCLUDE_DMP_MOTIONAPPS20) or defined(MPU6050_INCLUDE_DMP_MOTIONAPPS41)
uint8_t *dmpPacketBuffer;
uint16_t dmpPacketSize;
#endif
```

Also changed this in `MPU6050_6Axis_MotionApps20.h`:
From:
```cpp
- (int32_t)qI[2] * qI[2] + (int32_t)qI[3] * qI[3]) / (2 * 16384);
```
To:
```cpp
- (int32_t)qI[2] * qI[2] + (int32_t)qI[3] * qI[3]) / (2 * 16384UL);
```

           