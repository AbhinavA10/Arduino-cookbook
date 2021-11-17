- (Task interval, num iterations, callback, scheduler reference, enabled?)
- TaskInterval in milliseconds
- ColorSensors Minimum read time: Integration time

In `main.cpp`
```cpp
Task t_readSensors(3UL, TASK_FOREVER, &init_sensors, &runner, true);
Task t_navigation(15UL, TASK_FOREVER, &Navigation::init, &runner, true);
Task t_motorControl(10UL, TASK_FOREVER, &MotorControl::init_motor_control, &runner, true);
```

- Through the above constructor and parameters, the tasks are created and scheduled & enabled to run at the next runner.execute();
- We are using this approach:  https://github.com/arkhipenko/TaskScheduler/wiki/Full-Document#3-multiple-possible-callbacks-for-task
- The task will initialize during first execution pass and switch to "regular" callback  execution starting with second pass.
- There is a delay between first and second passes of the task (scheduling period, if defined).


- edited the TaskScheduler library to be a header and `.cpp` file instead of 2 `.h` files.

At the end of setup()
-  `runner.startNow();` // Use when there is long running functions in setup()
-  Sets ALL active tasks in the execution chain to start execution immediately.
-  Should be placed at the end of setup() method to prevent task execution race due to long running setup tasks (hardware initialization, etc.) following task activation

in loop()
-  `runner.execute();`