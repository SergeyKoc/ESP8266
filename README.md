# ESP8266 IoT extension for BBC micro:bit MakeCode editor

This extension/package is modified from elecfreaks/pxt-esp8266iot:
1. Allowing users to choose baud rate; newer ESP8266 firmware version use 115200. Older versions use 57600 or 9600.
2. Allowing users to set ThingSpeak server IP if they have DNS problems.
3. Updated ThingSpeak api and reduced waiting time between AT commands.

You also need a account and a channel on [ThingSpeak](https://thingspeak.com/) to get the write API key.

![pctdetail 775-090 1](https://user-images.githubusercontent.com/44191076/50425186-76ada780-08ac-11e9-956c-9ebd6be09bb2.jpg)
![esp8266-pinout](https://user-images.githubusercontent.com/44191076/50428909-fc097a00-08f5-11e9-91f1-921d1b957f29.png)
![esp8266_bb](https://user-images.githubusercontent.com/44191076/50541952-e513a200-0beb-11e9-9820-05f6798b2044.png)

Connect VCC and CH to 3.3V (sufficint power needed; the power from micro:bit's USB cable is NOT ENOUGH), GND to GND, RX and TX to two I/O pins, ignore the rest. See [here](https://components101.com/wireless/esp8266-pinout-configuration-features-datasheet) for more details.

![microbit-](https://user-images.githubusercontent.com/44191076/50448851-838ad380-095e-11e9-86dc-99f6cb8af56c.png)

The following pic is a example sending readings from a MQ-2 smoke detector to ThingSpeak:

![1](https://user-images.githubusercontent.com/44191076/50448902-dc5a6c00-095e-11e9-9c7c-5f6c766732cd.jpg)

If you want to monitor serial port responses from ESP8266, you can attach a OLED or something and read strings from serial in a seperate forever loop.

## License

MIT

## Supported targets

* for PXT/microbit
