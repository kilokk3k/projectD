/**
 * Created by USER on 2017/4/10.
 */
var rockerTestScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new RockerLayer();
        this.addChild(layer);
    }
});

var RockerLayer = cc.LayerColor.extend({
    pictureDirection: null,
    realNumToStr: null,
    rocker : null, //搖桿
    cocosIcon : null,
    enemyNode : null,
    directionNum:{
        rocker:0,//目前搖查方向
        ship:0,//目前船的方向
    },
    ctor: function(){
        this._super(cc.color(150,150,150));
        this._init();
        this.loadCocosIcon();
        //測試
        this.loadRocker();
        //  路徑選擇
        //this.testGoPath();
        //加入船

        return true;
    },
    onEnter:function(){
        //this.setEnemyShip();
    },
    _init: function(){
        this.directionNum.rocker = 0;//右邊
        this.directionNum.ship = 0;//右邊
        this.pictureDirection = gs.mapData.direction.setRectFromeStrToPicture;
        this.realNumToStr =gs.mapData.direction.realNumToStr;
        //沉船按鈕
        this.wreckBtn();
    },
    setEnemyShip: function(){
        //this.enemyNode
        var node = new cc.Sprite(res.enemyShip_png,cc.rect(0, 0, 256, 256),false);
        //node.setTextureRect(cc.rect(0,64 , 64, 64));
        this.addChild(node);
        this.enemyNode = node;
        node.setPosition(680, 620);
        //初始化---
        //一開始化右
        var setRect = gs.mapData.direction.setRectFromeStrToPicture;
        var directionRect = cc.rect(0,0+ (setRect["RIGHT"](this)*256), 256, 256);
        //this.enemyNode.setTextureRect(this.pictureDirection["RIGHT"](this));
        this.testGoPath(this.cocosIcon);
    },
    //沉船效果按鈕
    wreckBtn: function(){
        var cityShopButton = new ccui.Text();
        cityShopButton.setString("沉船按鈕");
        //cityShopButton.setName(cityData[item].id);
        cityShopButton.setFontSize(40);
        cityShopButton.setPosition(200,300);
        //按下變大
        cityShopButton.setTouchScaleChangeEnabled(true);
        cityShopButton.setColor(cc.color(255,0,0,255));
        cityShopButton.addTouchEventListener(this._wreckBtnTouch, this);
        cityShopButton.setTouchEnabled(true);
        this.addChild(cityShopButton);
        //==============================
        var arrAnimFrames = [];
        for (var i = 9; i < 12; i++) {
            arrAnimFrames.push(this.getSpriteFrame(i));
        }
        var fTime = 1.0 / 5;
        var animation = new cc.Animation(arrAnimFrames, fTime);
        var animate = new cc.Animate(animation);
        var sprite = new cc.Sprite(this.getSpriteFrame(0));
        sprite.setPosition(600, 300);
        //sprite.setScaleX(-1);
        //sprite.setFlippedX(true);
        this.wreckSpritShip = sprite;
        this.wreckSpritShip.animate = animate;
        this.addChild(this.wreckSpritShip, 37, 37);
    },
    _wreckBtnTouch: function(sender, type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                //var target = sender.getCurrentTarget();
                this._doShipAnim();
                cc.log("---CCCC---");
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
            default:
                break;
        }
    },
    /**船沉船動畫圖*/
    _doShipAnim: function(){
        if (this.wreckSpritShip) {
            this.wreckSpritShip.stopAllActions();
            //this.wreckSpritShip.runAction(new cc.RepeatForever(this.wreckSpritShip.animate));
            this.wreckSpritShip.runAction(this.wreckSpritShip.animate);
        }
    },
    getSpriteFrame: function(i){
        var range = new cc.rect(0, 0 + (i*256), 256, 256);
        var frame = new cc.SpriteFrame(res.ship_png, range);
        //frame.ScaleX = -1;
        //var frame1 = new cc.Sprite(frame);
        //frame1.setFlippedY(true);
        //frame1 = frame1.getSpriteFrame();
        //return frame1;
        return frame;
    },
    testGoPath: function(mainActorNode){
        //cc.log(mainActorNode);
        //方向
        var targetPosition = this.enemyNode.convertToNodeSpace(cc.p(mainActorNode.x, mainActorNode.y));
        cc.log("target:", targetPosition);
        this.onUpdate(targetPosition);
        //this.cocosIcon.x += (gs.mapData.direction.realNumToVec[this.directionNum.ship].x*1.3);
        //this.cocosIcon.y += (gs.mapData.direction.realNumToVec[this.directionNum.ship].y*1.3);
    },
    onUpdate: function(pos){
        this.onUpdateAngle(pos);
        this.onUpdateDirection(pos);
        //this.onUpdateVelocity();//加速度
    },
    onUpdateAngle: function(pos){
        //回傳角度0～360
        this.enemyNode._angle = cc.radiansToDegrees(cc.pToAngle(pos));
        if(this.enemyNode._angle < 0){
            this.enemyNode._angle += 360;
        }
        cc.log("this.enemyNode._angle:", this.enemyNode._angle);
    },
    onUpdateDirection: function(){
        for(var i =1; i < this._rockAngle.length; i++){
            this._direction = this._rockerDirectionArray[0];
            if(this._angle >= this._rockAngle[i - 1] && this._angle < this._rockAngle[i]){
                this._direction = this._rockerDirectionArray[i];
                //cc.log("ii", i);
                break;
            }
        }
    },
    loadCocosIcon: function(){
        var node = new cc.Sprite(res.ship_png,cc.rect(0, 0, 256, 256),false);
        //node.setTextureRect(cc.rect(0,64 , 64, 64));
        this.addChild(node);
        this.cocosIcon = node;
        node.setPosition(480, 320);
        //初始化---
        //一開始化右
        //var setRect = gs.mapData.direction.setRectFromeStrToPicture;
        //var directionRect = cc.rect(0,0+ (setRect["RIGHT"](this)*64), 64, 64);
        this.cocosIcon.setTextureRect(this.pictureDirection["RIGHT"](this));
    },
    loadRocker: function(){
        var i = 0;
        var node = new gs.rocker.rockerObject(res.u5_control_base_png, res.u5_control_knob_png, gs.rocker.ROCKER_TYPE.DEFAULT);
        //var node = new Rocker(res.u5_control_base_png, res.u5_control_knob_png, gs.rocker.ROCKER_TYPE.HIDE);
        //var node = new Rocker(res.u5_control_base_png, res.u5_control_knob_png, gs.rocker.ROCKER_TYPE.AUTO);
        this.addChild(node);
        node.setCallback(function(vec){
            //cc.log("---------------");
            //cc.log("速度，x：", vec.x, " y：", vec.y);
            //cc.log("角度：", node.angle);
            //cc.log("方向：", node.direction);
            //i++;
            //cc.log(i);

            //var directionRect = cc.rect(0,0+ (this.setRect[node.direction](this)*64), 64, 64);
            //this.cocosIcon.setTextureRect(directionRect);
            //目前搖桿的方向
            var directionNum = gs.mapData.direction.realStrToNum;
            this.directionNum.rocker = directionNum[node.direction];
            var num = this.directionNum.ship - this.directionNum.rocker;
            //var numTurn = 0;
            if(num == 0 ){
                //i = 0;
                //不移動
                //this.cocosIcon.x += vec.x * 1;
                //this.cocosIcon.y += vec.y * 1;
                //this.cocosIcon.x += gs.mapData.direction.realNumToVec[this.directionNum.ship].x;
                //this.cocosIcon.y += gs.mapData.direction.realNumToVec[this.directionNum.ship].y;
            //} else if(num > 0 && i > 10){
            } else if(num > 0 ){
                i = 0;
                this.directionNum.ship = this.directionNum.ship - 1;
            } else if(num <0 ) {
                i = 0;
                this.directionNum.ship = this.directionNum.ship + 1;
            }
            //this.pictureDirection[this.directionNum.ship];
            //var directionRect = cc.rect(0,0+ (this.setRect[this.pictureDirection[this.directionNum.ship]](this)*64), 64, 64);
            //cc.log("--",this.realNumToStr[this.directionNum.ship]);
            //cc.log("--",this.directionNum.rocker);
            //cc.log("++",this.directionNum.ship);
            this.cocosIcon.setTextureRect(this.pictureDirection[this.realNumToStr[this.directionNum.ship]](this));
            //this.cocosIcon.x += (gs.mapData.direction.realNumToVec[this.directionNum.ship].x*1.3);
            //this.cocosIcon.y += (gs.mapData.direction.realNumToVec[this.directionNum.ship].y*1.3);
        }.bind(this));
        node.setPosition(200,130);
    },
    //setDirection:function(currentNode,targetNode){
    //    if(this.directionNum.currentNode){
    //
    //    }
    //    this.directionNum.targetNode = targetNode;
    //    if(){
    //    }
    //},



});