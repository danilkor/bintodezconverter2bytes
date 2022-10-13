/**
 * This is a 2 bytes bin-dez converter.
 * 
 * LEDs with incomplete brightness is 0, with full brightness - 1
 * 
 * Barely visible LEDs are empty cells
 * 
 * Instruction:
 * 
 * Blinking LED is the cursor;
 * 
 * press A to add 0;
 * 
 * press B to add 1;
 * 
 * press AB to clear Everything;
 * 
 * All values are also output to Serial;
 * 
 * To change brightness look to the start void
 */
function BinToDez (BinaryString: string, intToOut: number) {
    decimal = 0
    while (index < 16) {
        decimal += parseInt(binary.charAt(15 - index)) * 2 ** index
        index += 1
    }
    index = 0
    serial.writeLine("")
    serial.writeLine("Decimal =   " + decimal)
    serial.writeLine("")
    basic.showNumber(decimal)
    posx = 0
    posy = 0
    for (let index2 = 0; index2 < 2; index2++) {
        posx = 0
        for (let index2 = 0; index2 < 4; index2++) {
            led.plotBrightness(posx, posy, BarelyBr)
            posx += 1
        }
        posy += 1
    }
    posy += 1
    for (let index2 = 0; index2 < 2; index2++) {
        posx = 0
        for (let index2 = 0; index2 < 4; index2++) {
            led.plotBrightness(posx, posy, BarelyBr)
            posx += 1
        }
        posy += 1
    }
    posx = 0
    posy = 0
}
input.onButtonPressed(Button.A, function () {
    binary = "" + binary + "0"
    serial.writeLine("Binary =   " + binary)
    led.plotBrightness(posx, posy, MiddleBr)
    if (posx < 3) {
        posx += 1
    } else {
        posx = 0
        if (posy != 1) {
            posy += 1
        } else {
            posy += 2
        }
    }
})
input.onButtonPressed(Button.AB, function () {
    binary = ""
    serial.writeLine("Binary =   " + binary)
    posx = 0
    posy = 0
    for (let index2 = 0; index2 < 2; index2++) {
        posx = 0
        for (let index2 = 0; index2 < 4; index2++) {
            led.plotBrightness(posx, posy, BarelyBr)
            posx += 1
        }
        posy += 1
    }
    posy += 1
    for (let index2 = 0; index2 < 2; index2++) {
        posx = 0
        for (let index2 = 0; index2 < 4; index2++) {
            led.plotBrightness(posx, posy, BarelyBr)
            posx += 1
        }
        posy += 1
    }
    posx = 0
    posy = 0
})
input.onButtonPressed(Button.B, function () {
    binary = "" + binary + "1"
    serial.writeLine("Binary =   " + binary)
    led.plotBrightness(posx, posy, FullBr)
    if (posx < 3) {
        posx += 1
    } else {
        posx = 0
        if (posy != 1) {
            posy += 1
        } else {
            posy += 2
        }
    }
})
let mil = 0
let binary = ""
let index = 0
let decimal = 0
let posy = 0
let posx = 0
let FullBr = 0
let MiddleBr = 0
let BarelyBr = 0
let periodOfTime = 750
let miniTimer = control.millis()
BarelyBr = 1
MiddleBr = 120
FullBr = 255
let CursorBr = 90
posx = 0
posy = 0
for (let index2 = 0; index2 < 2; index2++) {
    posx = 0
    for (let index2 = 0; index2 < 4; index2++) {
        led.plotBrightness(posx, posy, BarelyBr)
        posx += 1
    }
    posy += 1
}
posy += 1
for (let index2 = 0; index2 < 2; index2++) {
    posx = 0
    for (let index2 = 0; index2 < 4; index2++) {
        led.plotBrightness(posx, posy, BarelyBr)
        posx += 1
    }
    posy += 1
}
posx = 0
posy = 0
basic.forever(function () {
    mil = control.millis()
    if (control.millis() - miniTimer >= periodOfTime) {
        miniTimer = control.millis()
        if (led.pointBrightness(posx, posy) < CursorBr) {
            led.plotBrightness(posx, posy, CursorBr)
        } else {
            led.plotBrightness(posx, posy, BarelyBr - 8)
        }
    }
    if (binary.length == 16) {
        BinToDez(binary, decimal)
        binary = ""
    }
})
