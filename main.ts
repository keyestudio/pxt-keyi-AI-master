/**
 * This extension is designed to programme and drive the Smart AI Lens(科易)
 */
//% color=#0031AF icon="\uf06e" 
//% groups='["Basic", "Ball", "Face", "Card", "Color", "Tracking", "Learn","ASR"]'
//% block="Keyi_AI-Lens"
namespace Keyi_AILens {
    const CameraAdd = 0X14;
    let DataBuff = pins.createBuffer(9);
    const asrEventId = 8901;
    let vocInitFlag = 0;
    let lastvoc = 0;
    let serial: Serial | null = null;

    /**
    * Recognition Function List
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
    * Ball data field
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
    * Face data field
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
    * Card data field
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
    * Color target data field
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
        //% block="ID1"
        ID1 = 1,
        //% block="ID2"
        ID2 = 2,
        //% block="ID3"
        ID3 = 3,
        //% block="ID4"
        ID4 = 4,
        //% block="ID5"
        ID5 = 5
    }
    export enum ballColorList {
        //% block="Red"
        Red = 2,
        //% block="Blue"
        Blue = 1
    }
    /////////ASR Voice Command
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
     * Initialize AI-Lens, return true if camera detected
    * @returns camera online status
    */
    //% block="Initialize AI-Lens"
    //% group="Basic" weight=100
    //% color=#00B1ED
    export function initModule(): boolean {
        let timeout = input.runningTime()
        while (!(pins.i2cReadNumber(CameraAdd, NumberFormat.Int8LE))) {
            if (input.runningTime() - timeout > 30000) {
                return false;
            }
        }
        return true;
    }

    /**
    * Switch recognition objects.
    * @param fun Function list 
    */
    //% block="Switch function as %fun"
    //% fun.fieldEditor="gridpicker"
    //% fun.fieldOptions.columns=3
    //% group="Basic" weight=95
    //% color=#00B1ED
    export function switchfunc(fun: FuncList): void {
        const funcBuff = pins.createBuffer(9)
        funcBuff[0] = 0x20
        funcBuff[1] = fun
        pins.i2cWriteBuffer(CameraAdd, funcBuff)
    }

    /**
    * Fetch one frame detection data from AI-Lens
    */
    //% block="Get one image from AI-Lens"
    //% group="Basic" weight=90
    //% color=#00B1ED
    export function cameraImage(): void {
        DataBuff = pins.i2cReadBuffer(CameraAdd, 9)
        basic.pause(30)
    }

    //================ Ball Recognition =================
    //% block="Image contains ball(s)"
    //% group="Ball" weight=85
    //% color=#00B1ED
    export function checkBall(): boolean {
        return DataBuff[0] == 7
    }
    //% block="Image contains %ballcolor ball"
    //% group="Ball" weight=84
    //% ballcolor.fieldEditor="gridpicker"
    //% ballcolor.fieldOptions.columns=2
    //% color=#00B1ED
    export function ballColor(ballcolor: ballColorList): boolean {
        if (DataBuff[0] == 7) {
            return ballcolor == DataBuff[1]
        }
        return false
    }
    //% block="In the image get ball(s)' total"
    //% group="Ball" weight=83
    //% color=#00B1ED
    export function BallTotalNum(): number {
        if (DataBuff[0] == 7) {
            return DataBuff[7]
        }
        return 0
    }
    //% block="In the image get ball(s)' info: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Ball" weight=80
    //% color=#00B1ED
    export function ballData(status: Ballstatus): number {
        if (DataBuff[0] == 7) {
            switch (status) {
                case Ballstatus.X: return DataBuff[2]
                case Ballstatus.Y: return DataBuff[3]
                case Ballstatus.Size: return DataBuff[4]
                case Ballstatus.Confidence: return 100 - DataBuff[6]
                case Ballstatus.ID: return DataBuff[8]
                default: return 0;
            }
        }
        return 0
    }

    //================ Face Recognition =================
    //% block="Image contains a face"
    //% group="Face" weight=75
    //% color=#00B1ED
    export function checkFace(): boolean {
        return DataBuff[0] == 6
    }
    //% block="In the image get face(s)' total"
    //% group="Face" weight=74
    //% color=#00B1ED
    export function faceTotalNum(): number {
        if (DataBuff[0] == 6) {
            return DataBuff[7]
        }
        return 0
    }
    //% block="In the image get face(s)' info: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Face" weight=70
    //% color=#00B1ED
    export function faceData(status: Facestatus): number {
        if (DataBuff[0] == 6) {
            switch (status) {
                case Facestatus.X: return DataBuff[2]
                case Facestatus.Y: return DataBuff[3]
                case Facestatus.W: return DataBuff[4]
                case Facestatus.H: return DataBuff[5]
                case Facestatus.Confidence: return 100 - DataBuff[6]
                case Facestatus.ID: return DataBuff[8]
                default: return 0
            }
        }
        return 0
    }

    //================ Card Recognition (FIXED) =================
    //% block="Image contains number card(s): %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Card" weight=65
    //% color=#00B1ED
    export function numberCard(status: numberCards): boolean {
        if (DataBuff[0] == FuncList.Card) {
            return status == DataBuff[1]
        }
        return false
    }
    //% block="Image contains letter card(s): %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Card" weight=60
    //% color=#00B1ED
    export function letterCard(status: letterCards): boolean {
        if (DataBuff[0] == FuncList.Card) {
            return status == DataBuff[1]
        }
        return false
    }
    //% block="Image contains traffic card(s): %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Card" weight=55
    //% color=#00B1ED
    export function trafficCard(status: trafficCards): boolean {
        if (DataBuff[0] == FuncList.Card) {
            return status == DataBuff[1]
        }
        return false
    }
    //% block="Image contains other card(s): %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Card"
    //% color=#00B1ED
    export function otherCard(status: otherCards): boolean {
        if (DataBuff[0] == FuncList.Card) {
            return status == DataBuff[1]
        }
        return false
    }
    //% block="In the image get Card(s)' total"
    //% group="Card" weight=49
    //% color=#00B1ED
    export function cardTotalNum(): number {
        if (DataBuff[0] == FuncList.Card) {
            return DataBuff[7]
        }
        return 0
    }
    //% block="In the image get Card(s)' info: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Card" weight=45
    //% color=#00B1ED
    export function CardData(status: Cardstatus): number {
        if (DataBuff[0] == FuncList.Card) {
            switch (status) {
                case Cardstatus.X: return DataBuff[2]
                case Cardstatus.Y: return DataBuff[3]
                case Cardstatus.Size: return DataBuff[4]
                case Cardstatus.Confidence: return 100 - DataBuff[6]
                case Cardstatus.ID: return DataBuff[8]
                default: return 0
            }
        }
        return 0
    }

    //================ Color Recognition =================
    //% block="Image contains color card(s): %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Color" weight=30
    //% color=#00B1ED
    export function colorCheck(status: ColorLs): boolean {
        if (DataBuff[0] == 9) {
            return status == DataBuff[1]
        }
        return false
    }
    //% block="In the image get color card(s)' total"
    //% group="Color" weight=29
    //% color=#00B1ED
    export function colorTotalNum(): number {
        if (DataBuff[0] == 9) {
            return DataBuff[7]
        }
        return 0
    }
    //% block="In the image get color card(s)' info: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Color" weight=25
    //% color=#00B1ED
    export function colorData(status: Colorstatus): number {
        if (DataBuff[0] == 9) {
            switch (status) {
                case Colorstatus.X: return DataBuff[2]
                case Colorstatus.Y: return DataBuff[3]
                case Colorstatus.Size: return DataBuff[4]
                case Colorstatus.Confidence: return 100 - DataBuff[6]
                case Colorstatus.ID: return DataBuff[8]
                default: return 0
            }
        }
        return 0
    }

    //================ Line Tracking =================
    //% block="In the image get line(s)' info: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Tracking" weight=35
    //% color=#00B1ED
    export function lineData(status: Linestatus): number {
        if (DataBuff[0] == 8) {
            switch (status) {
                case Linestatus.angle: return DataBuff[1]
                case Linestatus.width: return DataBuff[2]
                case Linestatus.len: return DataBuff[3]
                default: return 0
            }
        }
        return 0
    }
    //% block="Image contains line's direction towards %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=2
    //% group="Tracking" weight=34
    //% color=#00B1ED
    export function lineDirection(status: LineTrend): boolean {
        if (DataBuff[0] == 8) {
            const angle = DataBuff[2];
            switch (status) {
                case LineTrend.left: return angle < 90;
                case LineTrend.right: return angle > 130;
                case LineTrend.front: return angle >= 90 && angle <= 130;
                case LineTrend.none: return false;
            }
        } else {
            return status == LineTrend.none;
        }
    }

    //================ Learn Object =================
    //% block="Learn an object with: %thingsID"
    //% thingsID.fieldEditor="gridpicker"
    //% thingsID.fieldOptions.columns=3
    //% group="Learn" weight=20
    //% color=#00B1ED
    export function learnObject(thingsID: learnID): void {
        const thingsBuf = pins.createBuffer(9)
        thingsBuf[0] = 10
        thingsBuf[1] = thingsID
        pins.i2cWriteBuffer(CameraAdd, thingsBuf)
    }
    //% block="Clear learned objects"
    //% group="Learn" weight=15
    //% color=#00B1ED
    export function ClearlearnObject(): void {
        const thingsBuf = pins.createBuffer(9)
        thingsBuf[0] = 10
        thingsBuf[1] = 10
        pins.i2cWriteBuffer(CameraAdd, thingsBuf)
    }
    //% block="Image contains learned objects: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Learn" weight=14
    //% color=#00B1ED
    export function objectCheck(status: learnID): boolean {
        if (DataBuff[0] == 10 && status == DataBuff[1]) {
            if (objectConfidence(status) >= 83) {
                return true
            }
        }
        return false
    }
    //% block="In the image get learn object %thingsID Confidence"
    //% group="Learn" weight=10
    //% color=#00B1ED
    export function objectConfidence(thingsID: learnID): number {
        if (DataBuff[0] == 10 && DataBuff[1] == thingsID) {
            return Math.max(0, 100 - DataBuff[2])
        }
        return 0
    }

    //================ ASR UART Voice Module =================
    function strToVoc(cmdStr: string): vocabularyList {
        // 这里你需要根据ASR模块输出字符串自行映射命令
        // 示例模板，按需修改
        return 0;
    }

    //% block="init ASR UART RX %rx TX %tx"
    //% group="ASR"
    //% color=#00B1ED
    export function initASRUart(rx: DigitalPin, tx: DigitalPin) {
        serial = serial.createSerial(rx, tx, BaudRate.BaudRate9600);
    }

    //% block="When ASR sensor hear %vocabulary"
    //% group="ASR"
    //% vocabulary.fieldEditor="gridpicker" vocabulary.fieldOptions.columns=3
    //% color=#00B1ED
    export function onASR(vocabulary: vocabularyList, handler: () => void) {
        control.onEvent(asrEventId, vocabulary, handler);
        if (!vocInitFlag) {
            vocInitFlag = 1;
            control.inBackground(() => {
                while (true) {
                    if (serial && serial.canReadLine()) {
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
    //% group="ASR"
    //% color=#00B1ED
    export function setASRLearn(): void {
        if (serial) serial.writeLine("LEARN");
    }

    //% block="ASR sensor clear learned entrys"
    //% group="ASR"
    //% color=#00B1ED
    export function delASRLearn(): void {
        if (serial) serial.writeLine("CLEAR");
    }
}