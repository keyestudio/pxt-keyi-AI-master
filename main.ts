/**
 * This extension is designed to programme and drive the Smart AI Lens(科易)
 */
//% color=#0031AF icon="\uf06e" 
//% groups='["Basic", "Ball", "Face", "Card", "Color", "Tracking", "Learn"]'
//% block="Keyi_AI-Lens"
namespace Keyi_AILens {
    const CameraAdd = 0X14;
    let DataBuff = pins.createBuffer(9);
    /**
    * Status List of Ball
    */
    export enum FuncList {
        //% block="Card recognition"
        Card = 2,
        //% block="Face recognition" 
        Face = 6,
        //% block="Ball recognition"
        Ball = 7,
        //% block="Tracking recognition"
        Tracking = 8,
        //% block="Color recognition"
        Color = 9,
        //% block="Learn Object"
        Things = 10
    }
    /**
    * Status List of Ball
    */
    export enum Ballstatus {
        //% block="X"
        X = 2,
        //% block="Y"
        Y = 3,
        //% block="Size"
        Size = 4,
        //% block="Confidence level "
        Confidence = 6,
        //% block="Ball ID"
        ID = 8
    }
    /**
    * Status List of Face
    */
    export enum Facestatus {
        //% block="X"
        X = 2,
        //% block="Y"
        Y = 3,
        //% block="W"
        W = 4,
        //% block="H"
        H = 5,
        //% block="Confidence level "
        Confidence = 6,
        //% block="Face ID"
        ID = 8
    }
    /**
    * Status List of Card
    */
    export enum Cardstatus {
        //% block="X"
        X = 2,
        //% block="Y"
        Y = 3,
        //% block="Size"
        Size = 4,
        //% block="Confidence level "
        Confidence = 6,
        //% block="Card ID"
        ID = 8
    }
    /**
    * Status List of Color
    */
    export enum Colorstatus {
        //% block="X"
        X = 2,
        //% block="Y"
        Y = 3,
        //% block="Size"
        Size = 4,
        //% block="Confidence level "
        Confidence = 6,
        //% block="Color ID"
        ID = 8
    }
    /**
    * Status List of Color
    */
    export enum ColorLs {
        //% block="Black"
        black = 4,
        //% block="Blue"
        blue = 2,
        //% block="Green"
        green = 1,
        //% block="Red"
        red = 5,
        //% block="White"
        white = 6,
        //% block="Yellow"
        yellow = 3
    }

    export enum Linestatus {
        //% block="Angle"
        angle = 1,
        //% block="Width"
        width = 2,
        //% block="Len"
        len = 3
    }
    export enum LineTrend {
        //% block="Left"
        left,
        //% block="Right"
        right,
        //% block="Front"
        front,
        //% block="None"
        none
    }
    /**
    * Number Cards List
    */
    export enum numberCards {
        //% block="0"
        zero = 1,
        //% block="1"
        one = 2,
        //% block="2"
        two = 3,
        //% block="3"
        three = 4,
        //% block="4"
        four = 5,
        //% block="5"
        five = 6,
        //% block="6"
        six = 7,
        //% block="7"
        seven = 8,
        //% block="8"
        eight = 9,
        //% block="9"
        nine = 10
    }
    /*
    * Letters Cards List
    */
    export enum letterCards {
        //% block="A"
        A = 1,
        //% block="B"
        B = 2,
        //% block="C"
        C = 3,
        //% block="D"
        D = 4,
        //% block="E"
        E = 5
    }
    /*
    * Traffic Cards List
    */
    export enum trafficCards {
        //% block="Forward"
        forward = 18,
        //% block="Back"
        back = 20,
        //% block="Stop"
        stop = 19,
        //% block="Turn left"
        turnleft = 16,
        //% block="Turn right"
        turnright = 17
    }
    /*
    * Other Cards List
    */
    export enum otherCards {
        //% block="Mouse"
        mouse = 1,
        //% block="micro:bit"
        microbit = 2,
        //% block="Ruler"
        ruler = 3,
        //% block="Cat"
        cat = 4,
        //% block="Pear"
        pear = 5,
        //% block="Ship"
        ship = 6,
        //% block="Apple"
        apple = 7,
        //% block="Car"
        car = 8,
        //% block="Pen"
        pen = 9,
        //% block="Dog"
        dog = 10,
        //% block="Umbrella"
        umbrella = 11,
        //% block="Airplane"
        airplane = 12,
        //% block="Clock"
        clock = 13,
        //% block="Grape"
        grape = 14,
        //% block="Cup"
        cup = 15
    }
    export enum learnID {
        ID1 = 1,
        ID2 = 2,
        ID3 = 3,
        ID4 = 4,
        ID5 = 5
    }
    export enum ballColorList {
        //% block="Red"
        Red = 2,
        //% block="Blue"
        Blue = 1
    }
    /////////ASR
    export enum vocabularyList {
        //% block="Lights on"
        TurnOn_Light = 1,
        //% block="Lights off"
        TurnOff_Light = 2,
        //% block="Turn on red light"
        TurnOn_RLight = 13,
        //% block="Turn off red light"
        TurnOff_RLight = 14,
        //% block="Turn on green light"
        TurnOn_GLight = 15,
        //% block="Turn off green light"
        TurnOff_GLight = 16,
        //% block="Turn on blue light"
        TurnOn_BLight = 17,
        //% block="Turn off blue light"
        TurnOff_BLight = 19,
        //% block="Full speed ahead"
        Advance = 25,
        //% block="Reversing"
        Back_off = 26,
        //% block="Turn left"
        Turn_left = 27,
        //% block="Turn right"
        Turn_right = 28,
        //% block="Tracking mode"
        Tracking = 29,
        //% block="Following mode"
        follow = 30,
        //% block="Avoiding mode"
        Avoidance = 31,
        //% block="Stop"
        Stop = 33,
        //% block="Turn on rgb light"
        TurnOn_RGB = 36,
        //% block="Turn off rgb light"
        TurnOff_RGB = 37,
        //% block="Increase the angle of the servo"
        PlusJD = 45,
        //% block="Reduce the angle of the servo"
        MinusJD = 46,
        //% block="Distance"
        Distance = 54,
        //% block="Move left"
        Left_Move = 69,
        //% block="Move right"
        Right_Move = 70,
        //% block="Move up to left"
        LU_Move = 71,
        //% block="Move down to left"
        LD_Move = 72,
        //% block="Move up to right"
        RU_Move = 73,
        //% block="Move down to right"
        RD_Move = 74,
        //% block="Left drift"
        drift_left = 75,
        //% block="Right drift"
        drift_right = 76
    }
    /**
    * TODO: Waiting for module initialize.
    */
    //% block="Initialize AI-Lens"
    //% group="Basic" weight=100 subcategory=Vision
    //% color=#00B1ED
    export function initModule(): void {
        let timeout = input.runningTime()
        while (!(pins.i2cReadNumber(CameraAdd, NumberFormat.Int8LE))) {
            if (input.runningTime() - timeout > 30000) {
                while (true) {
                    basic.showString("Init AILens Error!")
                }
            }
        }
    }
    /**
    * TODO: Switch recognition objects.
    * @param fun Function list 
    */
    //% block="Switch function as %fun"
    //% fun.fieldEditor="gridpicker"
    //% fun.fieldOptions.columns=3
    //% group="Basic" weight=95 subcategory=Vision
    //% color=#00B1ED
    export function switchfunc(fun: FuncList): void {
        let funcBuff = pins.i2cReadBuffer(CameraAdd, 9)
        funcBuff[0] = 0x20
        funcBuff[1] = fun
        pins.i2cWriteBuffer(CameraAdd, funcBuff)
    }

    /**
    * TODO: Get the image in a frame
    */
    //% block="Get one image from AI-Lens"
    //% group="Basic" weight=90 subcategory=Vision
    //% color=#00B1ED
    export function cameraImage(): void {
        DataBuff = pins.i2cReadBuffer(CameraAdd, 9)
        basic.pause(30)
    }

    /**
    * TODO: Judge the image contains a ball
    */
    //% block="Image contains ball(s)"
    //% group="Ball" weight=85 subcategory=Vision
    //% color=#00B1ED
    export function checkBall(): boolean {
        return DataBuff[0] == 7
    }
    //% block="Image contains %ballcolor ball"
    //% group="Ball" weight=84
    //% ballcolor.fieldEditor="gridpicker"
    //% ballcolor.fieldOptions.columns=2 subcategory=Vision
    //% color=#00B1ED
    export function ballColor(ballcolor: ballColorList): boolean {
        if (DataBuff[0] == 7) {
            return ballcolor == DataBuff[1]
        }
        else {
            return false
        }
    }
    //% block="In the image get ball(s)' total"
    //% group="Ball" weight=83 subcategory=Vision
    //% color=#00B1ED
    export function BallTotalNum(): number {
        if (DataBuff[0] == 7) {
            return DataBuff[7]
        }
        else {
            return 0
        }
    }
    /**
    * TODO: In the image get ball(s)' info
    */
    //% block="In the image get ball(s)' info: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Ball" weight=80 subcategory=Vision
    //% color=#00B1ED
    export function ballData(status: Ballstatus): number {
        if (DataBuff[0] == 7) {
            switch (status) {
                case Ballstatus.X:
                    return DataBuff[2]
                    break
                case Ballstatus.Y:
                    return DataBuff[3]
                    break
                case Ballstatus.Size:
                    return DataBuff[4]
                    break
                case Ballstatus.Confidence:
                    return 100 - DataBuff[6]
                    break
                case Ballstatus.ID:
                    return DataBuff[8]
                    break
                default:
                    return 0;
            }
        }
        else {
            return 0
        }
    }


    /**
    * TODO: Judge whether there is a face in the picture
    */
    //% block="Image contains a face"
    //% group="Face" weight=75 subcategory=Vision
    //% color=#00B1ED
    export function checkFace(): boolean {
        return DataBuff[0] == 6
    }
    //% block="In the image get face(s)' total"
    //% group="Face" weight=74 subcategory=Vision
    //% color=#00B1ED
    export function faceTotalNum(): number {
        if (DataBuff[0] == 6) {
            return DataBuff[7]
        }
        else {
            return 0
        }
    }
    /**
    * TODO: Judge whether there is a face in the picture
    * @param status Facestatus
    */
    //% block="In the image get face(s)' info: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Face" weight=70 subcategory=Vision
    //% color=#00B1ED
    export function faceData(status: Facestatus): number {
        if (DataBuff[0] == 6) {
            switch (status) {
                case Facestatus.X:
                    return DataBuff[2]
                    break
                case Facestatus.Y:
                    return DataBuff[3]
                    break
                case Facestatus.W:
                    return DataBuff[4]
                    break
                case Facestatus.H:
                    return DataBuff[5]
                    break
                case Facestatus.Confidence:
                    return 100 - DataBuff[6]
                    break
                case Facestatus.ID:
                    return DataBuff[8]
                    break
                default:
                    return 0
            }
        }
        else {
            return 0
        }
    }
    /**
    * TODO: Judge whether there is a digital card in the screen
    * @param status numberCards
    */
    //% block="Image contains number card(s): %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Card" weight=65 subcategory=Vision
    //% color=#00B1ED
    export function numberCard(status: numberCards): boolean {
        if (DataBuff[0] == 2) {
            return status == DataBuff[1]
        }
        else
            return false
    }
    /**
    * TODO: Judge whether there is a letter card in the screen
    * @param status letterCards
    */
    //% block="Image contains letter card(s): %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Card" weight=60 subcategory=Vision
    //% color=#00B1ED
    export function letterCard(status: letterCards): boolean {
        if (DataBuff[0] == 4) {
            return status == DataBuff[1]
        }
        else
            return false
    }
    /**
    * TODO: Judge whether there is a traffic card in the screen
    * @param status trafficCards
    */
    //% block="Image contains traffic card(s): %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Card" weight=55 subcategory=Vision
    //% color=#00B1ED
    export function trafficCard(status: trafficCards): boolean {
        if (DataBuff[0] == 3) {
            return status == DataBuff[1]
        }
        else
            return false
    }
    /**
    * TODO: Judge whether there is a other card in the screen
    * @param status otherCards
    */
    //% block="Image contains other card(s): %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Card" subcategory=Vision
    //% color=#00B1ED
    export function otherCard(status: otherCards): boolean {
        if (DataBuff[0] == 3) {
            return status == DataBuff[1]
        }
        else
            return false
    }
    //% block="In the image get Card(s)' total"
    //% group="Card" weight=49 subcategory=Vision
    //% color=#00B1ED
    export function cardTotalNum(): number {
        if (DataBuff[0] == 2 || DataBuff[0] == 3 || DataBuff[0] == 4) {
            return DataBuff[7]
        }
        else {
            return 0
        }
    }
    /**
    * TODO: Card parameters in the screen
    * @param status otherCards
    */
    //% block="In the image get Card(s)' info: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Card" weight=45 subcategory=Vision
    //% color=#00B1ED
    export function CardData(status: Cardstatus): number {
        if (DataBuff[0] == 2 || DataBuff[0] == 3 || DataBuff[0] == 4) {
            switch (status) {
                case Cardstatus.X:
                    return DataBuff[2]
                    break
                case Cardstatus.Y:
                    return DataBuff[3]
                    break
                case Cardstatus.Size:
                    return DataBuff[4]
                    break
                case Cardstatus.Confidence:
                    return 100 - DataBuff[6]
                    break
                case Cardstatus.ID:
                    return DataBuff[8]
                    break
                default:
                    return 0
            }
        }
        else
            return 0
    }
    /**
    * TODO: Judge whether there is a color in the screen
    * @param status ColorLs
    */
    //% block="Image contains color card(s): %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Color" weight=30 subcategory=Vision
    //% color=#00B1ED
    export function colorCheck(status: ColorLs): boolean {
        if (DataBuff[0] == 9) {
            return status == DataBuff[1]
        }
        else
            return false
    }
    //% block="In the image get color card(s)' total"
    //% group="Color" weight=29 subcategory=Vision
    //% color=#00B1ED
    export function colorTotalNum(): number {
        if (DataBuff[0] == 9) {
            return DataBuff[7]
        }
        else {
            return 0
        }
    }
    /**
    * TODO: color parameters in the screen
    * @param status Colorstatus
    */
    //% block="In the image get color card(s)' info: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Color" weight=25 subcategory=Vision
    //% color=#00B1ED
    export function colorData(status: Colorstatus): number {
        if (DataBuff[0] == 9) {
            switch (status) {
                case Colorstatus.X:
                    return DataBuff[2]
                    break
                case Colorstatus.Y:
                    return DataBuff[3]
                    break
                case Colorstatus.Size:
                    return DataBuff[4]
                    break
                case Colorstatus.Confidence:
                    return 100 - DataBuff[6]
                    break
                case Colorstatus.ID:
                    return DataBuff[8]
                    break
                default:
                    return 0
            }
        }
        else {
            return 0
        }
    }
    /**
    * TODO: line parameters in the screen
    * @param status Linestatus
    */
    //% block="In the image get line(s)' info: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Tracking"
    //% weight=35 subcategory=Vision
    //% color=#00B1ED
    export function lineData(status: Linestatus): number {
        if (DataBuff[0] == 8) {
            switch (status) {
                case Linestatus.angle:
                    return DataBuff[1]
                    break
                case Linestatus.width:
                    return DataBuff[2]
                    break
                case Linestatus.len:
                    return DataBuff[3]
                    break
                default:
                    return 0
            }
        }
        else
            return 0
    }
    /**
    * TODO: line parameters in the screen
    * @param status Linestatus
    */
    //% block="Image contains line's direction towards %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=2
    //% group="Tracking"
    //% weight=34 subcategory=Vision
    //% color=#00B1ED
    export function lineDirection(status: LineTrend): boolean {
        if (DataBuff[0] == 8) {
            switch (status) {
                case LineTrend.none:
                    return false
                    break
                case LineTrend.left:
                    if (DataBuff[2] < 90) {
                        return true
                    }
                    else {
                        return false
                    }
                    break
                case LineTrend.right:
                    if (DataBuff[2] > 130) {
                        return true
                    }
                    else {
                        return false
                    }
                    break
                case LineTrend.front:
                    if (DataBuff[2] > 90 && DataBuff[2] < 130) {
                        return true
                    }
                    else {
                        return false
                    }
                    break
            }
        }
        else {
            if (status == LineTrend.none)
                return true
        }
        return false
    }

    /**
    * TODO: Learn an object in a picture
    * @param thingsID Edit a label for the object
    */
    //% block="Learn an object with: %thingsID"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Learn" weight=20 subcategory=Vision
    //% color=#00B1ED
    export function learnObject(thingsID: learnID): void {
        let thingsBuf = pins.createBuffer(9)
        thingsBuf[0] = 10
        thingsBuf[1] = thingsID
        pins.i2cWriteBuffer(CameraAdd, thingsBuf)
    }
    /**
    * TODO: Clear Learned Objects
    */
    //% block="Clear learned objects"
    //% group="Learn" weight=15 subcategory=Vision
    //% color=#00B1ED
    export function ClearlearnObject(): void {
        let thingsBuf = pins.createBuffer(9)
        thingsBuf[0] = 10
        thingsBuf[1] = 10
        pins.i2cWriteBuffer(CameraAdd, thingsBuf)
    }
    /**
    * TODO: Judge whether there are any learned objects in the picture
    */
    //% block="Image contains learned objects: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Learn" weight=14 subcategory=Vision
    //% color=#00B1ED
    export function objectCheck(status: learnID): boolean {
        if (DataBuff[0] == 10 && status == DataBuff[1]) {
            if (objectConfidence(status) >= 83) {
                return true
            }
            else {
                return false
            }
        }
        else
            return false
    }
    /**
    * TODO: Judge whether there are any learned objects in the picture
    */
    //% block="In the image get learn object %thingsID Confidence"
    //% group="Learn" weight=10 subcategory=Vision
    //% color=#00B1ED
    export function objectConfidence(thingsID: learnID): number {
        if (DataBuff[0] == 10 && DataBuff[2] < 30) {
            if (DataBuff[1] == thingsID) {
                return 100 - DataBuff[2]
            }
            else {
                return 0
            }
        }
        return 0
    }
    const asrEventId = 8901;
    let vocInitFlag = 0;
    let lastvoc = 0;
    let serial: Serial | null = null;
    
    enum vocabularyList {
        cmd1 = 1,
        cmd2 = 2,
        cmd3 = 3,
    }
    function strToVoc(cmdStr: string): number {
        if (cmdStr.includes("CMD1")) return vocabularyList.cmd1;
        if (cmdStr.includes("CMD2")) return vocabularyList.cmd2;
        if (cmdStr.includes("CMD3")) return vocabularyList.cmd3;
        return 0;
    }
    
    //% block="init ASR UART RX %rx TX %tx"
    //% subcategory=ASR group="UART Port"
    //% color=#00B1ED
    export function initASRUart(rx: DigitalPin, tx: DigitalPin) {
        serial = serial.createSerial(rx, tx, BaudRate.BaudRate9600);
    }
    
    //% block="ASR sensor hear %vocabulary"
    //% subcategory=ASR group="UART Port"
    //% vocabulary.fieldEditor="gridpicker" vocabulary.fieldOptions.columns=3
    //% color=#00B1ED
    export function onASR(vocabulary: vocabularyList, handler: () => void) {
        control.onEvent(asrEventId, vocabulary, handler);
        if (!vocInitFlag) {
            vocInitFlag = 1;
            control.inBackground(() => {
                while (true) {
                    if(serial && serial.canReadLine()){
                        const str = serial.readLine().trim();
                        const voc = strToVoc(str);
                        if (voc != 0 && voc != lastvoc) {
                            lastvoc = voc
                            control.raiseEvent(asrEventId, lastvoc);
                        }
                    }
                    basic.pause(50);
                }
            })
        }
    }
    
    //% block="ASR sensor enter learning-model"
    //% subcategory=ASR group="UART Port"
    //% color=#00B1ED
    export function setASRLearn(): void {
        if(serial) serial.writeLine("LEARN");
    }
    
    //% block="ASR sensor clear learned entrys"
    //% subcategory=ASR group="UART Port"
    //% color=#00B1ED
    export function delASRLearn(): void {
        if(serial) serial.writeLine("CLEAR");
    }