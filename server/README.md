## Pigpio Installation instructions
____

Pigpio is the library we are using for now to control the servos with PWM. This allows us to control multiple motors with software controlled PWM. The default raspberry pi GPIO library only allows for the 1 GPIO pin to be used.

Run this script once to download the library and program
    
    sudo apt-get update    
    sudo apt-get install pigpio python-pigpio python3-pigpio

Whenever you want to run the server, you will need to have the pigpio daemon running
by executing

    sudo pigpiod

To kill this run 
    
    sudo killall pigpiod

