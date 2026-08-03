
# AiLens Package

![](/image.jpg/)

This extension is designed to programme and drive the AiLens.

The AI Lens is able to achieve the functions of face recognition, balls tracking, cards recognition and characteristics acquisition.


## Use Tutorial

You can get a detailed tutorial on how to use it here [KEYESTUDIO WIKI](
https://www.keyesrobot.cn)
### Block
* Initialize AI Lens and wait for AIlens to upload IIC data
```JavaScript
Keyi_AILens.initModule()
```
* Switch ailens function, including, card, ball, color, line inspection, feature learning
```JavaScript
Keyi_AILens.switchfunc(Keyi_AILens.FuncList.Card)
```
* Get the data of current frame from ailens
```JavaScript
Keyi_AILens.cameraImage()
```
* Process the data of small ball in the screen (if the screen contains small ball and the function is selected as small ball)
```Javascript
Keyi_AILens.checkBall()
Keyi_AILens.ballColor(Keyi_AILens.ballColorList.Red)
Keyi_AILens.BallTotalNum()
Keyi_AILens.ballData(Keyi_AILens.Ballstatus.X)
```
* Process the data of face in the picture (if the picture contains face and the function is face)
```JavaScript
Keyi_AILens.checkFace()
Keyi_AILens.faceTotalNum()
Keyi_AILens.faceData(Keyi_AILens.Facestatus.X)
```
* Process the card data in the screen (if the screen contains cards and the function is selected as card)
```javascript
Keyi_AILens.numberCard(numberCards.1)
Keyi_AILens.letterCard(letterCards.A)
Keyi_AILens.trafficCard(trafficCards.forward)
Keyi_AILens.otherCard(otherCards.cat)
Keyi_AILens.cardTotalNum()
Keyi_AILens.CardData(Cardstatus.X)
```
* Process the data of line segments in the screen (if the screen contains line segments and the function is tracking)

```javascript
Keyi_AILens.lineData(Linestatus.angle)
Keyi_AILens.lineDirection(Linestatus.angle)
```

* Learn the characteristics of the object in the current picture, and record and save
```javascript
Keyi_AILens.learnObject(1)
```
* Remove all learned objects
```javascript
Keyi_AILens.ClearlearnObject()
```
* Deal with the confidence of the learned object in the picture
```javascript
Keyi_AILens.objectCheck(Keyi_AILens.learnID.ID1)
Keyi_AILens.objectConfidence(Keyi_AILens.learnID.ID1)
```

## Supported targets
for PXT/microbit

## License
MIT

