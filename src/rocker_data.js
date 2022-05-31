
gs.mapData.direction = gs.mapData.direction || {};
gs.mapData.rockerDirection = gs.mapData.rockerDirection || {};
gs.mapData.rockerAngle = gs.mapData.rockerAngle || [];
gs.mapData.rockerDirectionArray = gs.mapData.rockerDirectionArray || [];

gs.rocker.rockerObject = gs.rocker.rockerObject || {}; //new搖桿物件
gs.rocker.ROCKER_TYPE = gs.rocker.ROCKER_TYPE || {};//搖桿的形態

gs.rocker.ROCKER_TYPE.DEFAULT = "DEFAULT";// 默认类型
gs.rocker.ROCKER_TYPE.AUTO = "AUTO";      // 自动类型
gs.rocker.ROCKER_TYPE.HIDE = "HIDE";      // 隐藏类型
gs.rocker.ROCKER_TYPE.OPACITY = 255;      // 不透明类型


//搖桿方向
gs.mapData.rockerDirection = {
    "RIGHT": "RIGHT",
    "RIGHT_RIGHT_UP": "RIGHT_RIGHT_UP",
    "RIGHT_UP": "RIGHT_UP",
    "RIGHT_UP_UP": "RIGHT_UP_UP",
    "UP": "UP",
    "LEFT_UP_UP": "LEFT_UP_UP",
    "LEFT_UP": "LEFT_UP",
    "LEFT_LEFT_UP": "LEFT_LEFT_UP",
    "LEFT": "LEFT",
    "LEFT_LEFT_DOWN": "LEFT_LEFT_DOWN",
    "LEFT_DOWN": "LEFT_DOWN",
    "LEFT_DOWN_DOWN": "LEFT_DOWN_DOWN",
    "DOWN": "DOWN",
    "RIGHT_DOWN_DOWN": "RIGHT_DOWN_DOWN",
    "RIGHT_DOWN": "RIGHT_DOWN",
    "RIGHT_RIGHT_DOWN": "RIGHT_RIGHT_DOWN",
    "ORIGIN": "ORIGIN",
};

gs.mapData.rockerAngle = [
    11.25, 33.75, 56.25, 78.75,
    101.25, 123.75, 146.25, 168.75,
    191.25, 213.75, 263.25, 258.75,
    281.25, 303.75, 326.25, 348.75
];

gs.mapData.rockerDirectionArray = [
    "RIGHT",
    "RIGHT_RIGHT_UP",
    "RIGHT_UP",
    "RIGHT_UP_UP",
    "UP",
    "LEFT_UP_UP",
    "LEFT_UP",
    "LEFT_LEFT_UP",
    "LEFT",
    "LEFT_LEFT_DOWN",
    "LEFT_DOWN",
    "LEFT_DOWN_DOWN",
    "DOWN",
    "RIGHT_DOWN_DOWN",
    "RIGHT_DOWN",
    "RIGHT_RIGHT_DOWN",
    "ORIGIN"
];
//從右邊開始，逆時針開始增加，是程式實際運算的數字
gs.mapData.direction.realStrToNum = {
    "RIGHT": 0,
    "RIGHT_RIGHT_UP": 1,
    "RIGHT_UP": 2,
    "RIGHT_UP_UP": 3,
    "UP": 4,
    "LEFT_UP_UP": 5,
    "LEFT_UP": 6,
    "LEFT_LEFT_UP": 7,
    "LEFT": 8,
    "LEFT_LEFT_DOWN": 9,
    "LEFT_DOWN": 10,
    "LEFT_DOWN_DOWN": 11,
    "DOWN": 12,
    "RIGHT_DOWN_DOWN": 13,
    "RIGHT_DOWN": 14,
    "RIGHT_RIGHT_DOWN":15
};
//從右邊開始，逆時針開始增加，是程式實際運算的數字
gs.mapData.direction.realNumToStr= {
    0:"RIGHT",
    1:"RIGHT_RIGHT_UP",
    2:"RIGHT_UP",
    3:"RIGHT_UP_UP",
    4:"UP",
    5:"LEFT_UP_UP",
    6:"LEFT_UP",
    7:"LEFT_LEFT_UP",
    8:"LEFT",
    9:"LEFT_LEFT_DOWN",
    10:"LEFT_DOWN",
    11:"LEFT_DOWN_DOWN",
    12:"DOWN",
    13:"RIGHT_DOWN_DOWN",
    14:"RIGHT_DOWN",
    15:"RIGHT_RIGHT_DOWN"
};
//gs.mapData.direction.realNumToVec = {
//    0:{x: 1,y: 0},//"RIGHT",
//    1:{x: 0.9238*1.1,y: 0.3826*1.1},//"RIGHT_RIGHT_UP",
//    2:{x: 0.7071*1.2,y: 0.7071*1.2},//"RIGHT_UP",
//    3:{x: 0.3826*1.1,y: 0.9238*1.1},//"RIGHT_UP_UP",
//    4:{x:0,y:1},//"UP",
//    5:{x: -0.3826*1.1,y: 0.9238*1.1},//"LEFT_UP_UP",
//    6:{x: -0.7071*1.2,y: 0.7071*1.2},//"LEFT_UP",
//    7:{x: -0.9238*1.1,y: 0.3826*1.1},//"LEFT_LEFT_UP",
//    8:{x:-1,y:0},//"LEFT",
//    9:{x: -0.9238*1.1,y: -0.3826*1.1},//"LEFT_LEFT_DOWN",
//    10:{x: -0.7071*1.2,y: -0.7071*1.2},//"LEFT_DOWN",
//    11:{x: -0.3826*1.1,y: -0.9238*1.1},//"LEFT_DOWN_DOWN",
//    12:{x:0,y:-1},//"DOWN",
//    13:{x: 0.3826*1.1,y: -0.9238*1.1},//"RIGHT_DOWN_DOWN",
//    14:{x: 0.7071*1.2,y: -0.7071*1.2},//"RIGHT_DOWN",
//    15:{x: 0.9238*1.1,y: -0.3826*1.1},//"RIGHT_RIGHT_DOWN"
//};
gs.mapData.direction.realNumToVec = {
    0:{x: 1,y: 0},//"RIGHT",
    1:{x: 0.9238,y: 0.3826},//"RIGHT_RIGHT_UP",
    2:{x: 0.7071,y: 0.7071},//"RIGHT_UP",
    3:{x: 0.3826,y: 0.9238},//"RIGHT_UP_UP",
    4:{x:0,y:1},//"UP",
    5:{x: -0.3826,y: 0.9238},//"LEFT_UP_UP",
    6:{x: -0.7071,y: 0.7071},//"LEFT_UP",
    7:{x: -0.9238,y: 0.3826},//"LEFT_LEFT_UP",
    8:{x:-1,y:0},//"LEFT",
    9:{x: -0.9238,y: -0.3826},//"LEFT_LEFT_DOWN",
    10:{x: -0.7071,y: -0.7071},//"LEFT_DOWN",
    11:{x: -0.3826,y: -0.9238},//"LEFT_DOWN_DOWN",
    12:{x:0,y:-1},//"DOWN",
    13:{x: 0.3826,y: -0.9238},//"RIGHT_DOWN_DOWN",
    14:{x: 0.7071,y: -0.7071},//"RIGHT_DOWN",
    15:{x: 0.9238,y: -0.3826},//"RIGHT_RIGHT_DOWN"
};
//回傳船圖片的實際數值，或圖片的範圍
cc.rect(0, 0, 256, 256);
gs.mapData.direction.setRectFromeStrToPicture = {
    "UP": function(that){that.cocosIcon.flippedX = true;return cc.rect(0, 0, 256, 256);},//return 0;},
    "RIGHT_UP_UP": function(that){that.cocosIcon.flippedX = true;return cc.rect(0, 1*256, 256, 256);},//return 1;},
    "RIGHT_UP": function(that){that.cocosIcon.flippedX = true;return cc.rect(0, 2*256, 256, 256);},//return 2;},
    "RIGHT_RIGHT_UP": function(that){that.cocosIcon.flippedX = true;return cc.rect(0, 3*256, 256, 256);},//return 3;},
    "RIGHT": function(that){that.cocosIcon.flippedX = true;return cc.rect(0, 4*256, 256, 256);},//return 4;},
    "RIGHT_RIGHT_DOWN": function(that){that.cocosIcon.flippedX = true;return cc.rect(0, 5*256, 256, 256);},//return 5;},
    "RIGHT_DOWN": function(that){that.cocosIcon.flippedX = true;return cc.rect(0, 6*256, 256, 256);},//return 6;},
    "RIGHT_DOWN_DOWN": function(that){that.cocosIcon.flippedX = true;return cc.rect(0, 7*256, 256, 256);},//return 7;},
    "LEFT_UP_UP": function(that){that.cocosIcon.flippedX = false;return cc.rect(0, 1*256, 256, 256);},//return 1;},
    "LEFT_UP": function(that){that.cocosIcon.flippedX = false;return cc.rect(0, 2*256, 256, 256);},//return 2;},
    "LEFT_LEFT_UP": function(that){that.cocosIcon.flippedX = false;return cc.rect(0, 3*256, 256, 256);},//return 3;},
    "LEFT": function(that){that.cocosIcon.flippedX = false;return cc.rect(0, 4*256, 256, 256);},//return 4;},
    "LEFT_LEFT_DOWN": function(that){that.cocosIcon.flippedX = false;return cc.rect(0, 5*256, 256, 256);},//return 5;},
    "LEFT_DOWN": function(that){that.cocosIcon.flippedX = false;return cc.rect(0, 6*256, 256, 256);},//return 6;},
    "LEFT_DOWN_DOWN": function(that){that.cocosIcon.flippedX = false;return cc.rect(0, 7*256, 256, 256);},//return 7;},
    "DOWN": function(that){that.directionNum.currentNode = 12;return cc.rect(0, 8*256, 256, 256);},//return 8;}
};

//setRect: {
//    "UP": function(that){that.directionNum.currentNode = 4;that.cocosIcon.flippedX = true;return 0;},
//    "RIGHT_UP_UP": function(that){that.directionNum.currentNode = 3;that.cocosIcon.flippedX = true;return 1;},
//    "RIGHT_UP": function(that){that.directionNum.currentNode = 2;that.cocosIcon.flippedX = true;return 2;},
//    "RIGHT_RIGHT_UP": function(that){that.directionNum.currentNode = 1;that.cocosIcon.flippedX = true;return 3;},
//    "RIGHT": function(that){that.directionNum.currentNode = 0;that.cocosIcon.flippedX = true;return 4;},
//    "RIGHT_RIGHT_DOWN": function(that){that.directionNum.currentNode = 15;that.cocosIcon.flippedX = true;return 5;},
//    "RIGHT_DOWN": function(that){that.directionNum.currentNode = 14;that.cocosIcon.flippedX = true;return 1;return 6;},
//    "RIGHT_DOWN_DOWN": function(that){that.directionNum.currentNode = 13;that.cocosIcon.flippedX = true;return 7;},
//    "LEFT_UP_UP": function(that){that.directionNum.currentNode = 5;that.cocosIcon.flippedX = true;return 1;},
//    "LEFT_UP": function(that){that.directionNum.currentNode = 6;that.cocosIcon.flippedX = false;return 2;},
//    "LEFT_LEFT_UP": function(that){that.directionNum.currentNode = 7;that.cocosIcon.flippedX = false;return 3;},
//    "LEFT": function(that){that.directionNum.currentNode = 8;that.cocosIcon.flippedX = false;return 4;},
//    "LEFT_LEFT_DOWN": function(that){that.directionNum.currentNode = 9;that.cocosIcon.flippedX = false;return 5;},
//    "LEFT_DOWN": function(that){that.directionNum.currentNode = 10;that.cocosIcon.flippedX = false;return 6;},
//    "LEFT_DOWN_DOWN": function(that){that.directionNum.currentNode = 11;that.cocosIcon.flippedX = false;return 7;},
//    "DOWN": function(that){that.directionNum.currentNode = 12;return 8;}
//};
//setRect: function(i){
//    var direction =null;
//   switch(i){
//       case "UP":
//           direction = 0;
//           break;
//       case "RIGHT_UP_UP":
//           direction = 1;
//           this.cocosIcon.flippedX = true;
//           //this.cocosIcon.setFlippedX(true);
//           break;
//       case "RIGHT_UP":
//           direction = 2;
//           this.cocosIcon.flippedX = true;
//           break;
//       case "RIGHT_RIGHT_UP":
//           direction = 3;
//           this.cocosIcon.flippedX = true;
//           break;
//       case "RIGHT":
//           direction = 4;
//           this.cocosIcon.flippedX = true;
//           break;
//       case "RIGHT_RIGHT_DOWN":
//           direction = 5;
//           this.cocosIcon.flippedX = true;
//           break;
//       case "RIGHT_DOWN":
//           direction = 6;
//           this.cocosIcon.flippedX = true;
//           //this.cocosIcon.setFlippedX(true);
//           break;
//       case "RIGHT_DOWN_DOWN":
//           direction = 7;
//           this.cocosIcon.flippedX = true;
//           break;
//
//       case "LEFT_UP_UP":
//           direction = 1;
//           this.cocosIcon.flippedX = false;
//           break;
//       case "LEFT_UP":
//           direction = 2;
//           this.cocosIcon.flippedX = false;
//           break;
//       case "LEFT_LEFT_UP":
//           direction = 3;
//           this.cocosIcon.flippedX = false;
//           break;
//       case "LEFT":
//           direction = 4;
//           this.cocosIcon.flippedX = false;
//           break;
//       case "LEFT_LEFT_DOWN":
//           direction = 5;
//           this.cocosIcon.flippedX = false;
//           break;
//       case "LEFT_DOWN":
//           direction = 6;
//           this.cocosIcon.flippedX = false;
//           break;
//       case "LEFT_DOWN_DOWN":
//           direction = 7;
//           this.cocosIcon.flippedX = false;
//           break;
//       case "DOWN":
//           direction = 8;
//           break;
//   }
//    return cc.rect(0,0+ (direction*64), 64, 64);
//},
//getSpriteFrame1: function(i){
//    var range = new cc.rect(0, 0 + (i*64), 64, 64);
//    var frame = new cc.SpriteFrame(res.ship_png, range);
//    return frame;
//},