/**
 * MakeCode extension for ESP8266 and ThinkSpeak website, modified from elecfreaks/pxt-esp8266iot
 * https://thingspeak.com/
 */
//% color=#0fbc11 icon="\uf1eb" weight=90
namespace ESP8266_IoT {
    let tobesendstring = ""

    /**
     * Set RX and TX pins for ESP8266 serial wifi module; baud rate set to 115200, 57600 or 9600 
     * depending on ESP8266 firmware virsions
     * (VCC and CH to 3.3V, GND to GND, RX and TX to two pins, ignore the rest. see 
     * https://components101.com/wireless/esp8266-pinout-configuration-features-datasheet)
     */
    //% weight=100
    //% blockId="wifi_init" block="Set ESP8266 RX %wifiRX TX %wifiTX at baud rate %wifiBaudrate"
    //% wifiRX.defl=SerialPin.P0
    //% wifiTX.defl=SerialPin.P1
    export function initwifi(wifiRX: SerialPin, wifiTX: SerialPin, wifiBaudrate: BaudRate): void {
        serial.redirect(
            wifiRX,
            wifiTX,
            wifiBaudrate
        )
        basic.pause(10)
        serial.writeString("AT+CWMODE=1" + "\u000D" + "\u000A")
        basic.pause(5000)
        serial.writeString("AT+RST" + "\u000D" + "\u000A")
        basic.pause(5000)
    }

    /**
     * Connect to wifi, fill in your ssid and key (password).
     */
    //% weight=99
    //% blockId="wifi_connect" block="Connect wifi SSDI %ssid KEY %key"
    export function connectwifi(ssid: string, key: string): void {
        let text = "AT+CWJAP=\""
            + ssid
            + "\",\""
            + key
            + "\""
        serial.writeString(text + "\u000D" + "\u000A")
        basic.pause(6000)
    }

    /**
     * Connect ThingSpeak IoT TCP server
     * (if you have trouble connecting ThingSpeak, try ping api.thingspeak.com
     * and use the IP instead)
    */
    //% weight=98
    //% blockId="TCP_connect" block="Connect ThingSpeak IP %ip"
    //% ip.defl=api.thingspeak.com
    export function connectthingspeak(ip: string): void {
        let text = "AT+CIPSTART=\"TCP\",\"" + ip + "\",80"
        serial.writeString(text + "\u000D" + "\u000A")
        basic.pause(6000)
    }

    /**
     * Prepare data to be sent
     * (Get your write API Key on your ThingSpeak channel)
     */
    //% weight=97
    //% blockId="send_text" block="Set data to be send | write API Key = %write_api_key|Field 1 = %n1|Field 2 = %n2|Field 3 = %n3|Field 4 = %n4|Field 5 = %n5|Field 6 = %n6|Field 7 = %n7|Field 8 = %n8"
    export function tosendtext(write_api_key: string,
        n1: number,
        n2: number,
        n3: number,
        n4: number,
        n5: number,
        n6: number,
        n7: number,
        n8: number): void {
        let text = ""
        text = "GET /update?key="
            + write_api_key
            + "&field1="
            + n1
            + "&field2="
            + n2
            + "&field3="
            + n3
            + "&field4="
            + n4
            + "&field5="
            + n5
            + "&field6="
            + n6
            + "&field7="
            + n7
            + "&field8="
            + n8
        tobesendstring = text
    }

    /**
     * Send data to ThingSpeak
     */
    //% weight=96
    //% blockId=senddata block="Send data to ThingSpeak"
    export function senddata(): void {
        let text = ""
        text = "AT+CIPSEND="
            + (tobesendstring.length + 2)
        serial.writeString(text + "\u000D" + "\u000A")
        basic.pause(3000)
        serial.writeString(tobesendstring + "\u000D" + "\u000A")
        basic.pause(6000)
    }

}
