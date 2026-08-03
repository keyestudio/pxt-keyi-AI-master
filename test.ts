Keyi_AILens.initModule()
Keyi_AILens.switchfunc(Keyi_AILens.FuncList.Color)
basic.forever(function () {
    Keyi_AILens.cameraImage()
    if (Keyi_AILens.colorCheck(Keyi_AILens.ColorLs.black)) {
        music.playTone(262, music.beat(BeatFraction.Whole))
        basic.pause(500)
    }
    if (Keyi_AILens.colorCheck(Keyi_AILens.ColorLs.white)) {
        music.playTone(294, music.beat(BeatFraction.Whole))
        basic.pause(500)
    }
    if (Keyi_AILens.colorCheck(Keyi_AILens.ColorLs.blue)) {
        music.playTone(330, music.beat(BeatFraction.Whole))
        basic.pause(500)
    }
    if (Keyi_AILens.colorCheck(Keyi_AILens.ColorLs.green)) {
        music.playTone(349, music.beat(BeatFraction.Whole))
        basic.pause(500)
    }
    if (Keyi_AILens.colorCheck(Keyi_AILens.ColorLs.yellow)) {
        music.playTone(392, music.beat(BeatFraction.Whole))
        basic.pause(500)
    }
    if (Keyi_AILens.colorCheck(Keyi_AILens.ColorLs.red)) {
        music.playTone(440, music.beat(BeatFraction.Whole))
        basic.pause(500)
    }
})
