/**
 *搖桿物件
 */
gs.rocker.rockerObject = cc.Sprite.extend({
    _baseNode        : null,      // 底盘[节点]
    _knobNode        : null,      // 把手[节点]
    _touchListener   : null,      // 触摸事件[监听器]
    _radius          : 0,         // 摇杆的可移动半径
    _angle           : 0,         // 角度
    _velocity        : cc.p(0, 0),// 速度
    _callback        : null,      // 回调函数
    _direction       : null,//ROCKER_DIRECTION.ORIGIN, // 方向
    _type            : gs.rocker.ROCKER_TYPE.DEFAULT,     // 摇杆类型

    _rockAngle: null,
    _rockerDirectionStr: null,
    _rockerDirectionArray: null,
    ctor: function(baseTexture, knobTexture, type){
        this._super();
        this._init();
        this.loadBaseAndKnob(baseTexture, knobTexture);
        this.loadConfig(type);
        this.registerEvent();
        this.scheduleUpdate();
        return true;
    },
    onExit : function(){
        this.unRegisterEvent();
        this._super();
    },
    _init : function(){
        this._rockAngle = gs.mapData.rockerAngle;
        this._rockerDirectionArray = gs.mapData.rockerDirectionArray;
        this._rockerDirectionStr = gs.mapData.rockerDirection;
        this._direction = this._rockerDirectionStr["ORIGIN"];
        //this._rockAngle = gs.mapData.rockerAngle;
    },
    unRegisterEvent : function(){
        cc.eventManager.removeListener(this._touchListener);
    },
    loadBaseAndKnob: function(baseTexture, knobTexture){
        this._baseNode = new cc.Sprite(baseTexture);
        this._knobNode = new cc.Sprite(knobTexture);
        this.addChild(this._baseNode);
        this.addChild(this._knobNode);
    },
    loadConfig: function(type){
        cc.log("====type",type);
        this._radius = this._baseNode.getContentSize().width / 2;
        if(type !== undefined){
            if(isNaN(type)) {
                this._type = type;
                if (this._type == gs.rocker.ROCKER_TYPE.HIDE) {
                    this.setVisible(false);
                }
            } else {
                this._type = gs.rocker.ROCKER_TYPE.OPACITY;
                this.setCascadeOpacityEnabled(true);
                this.setOpacity(type);
            }

        }
    },
    registerEvent: function(){
        this._touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            target: this,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });
        cc.eventManager.addListener(this._touchListener, this);
    },
    onTouchBegan: function(touch, event){
        var target = this.target;
        var knob = target._knobNode;
        var locationInNode = knob.convertToNodeSpace(touch.getLocation());
        var size = knob.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);
        if(target._type == gs.rocker.ROCKER_TYPE.DEFAULT){
            //觸控有沒有落在桿搖中間那個圓形球上
            if(!cc.rectContainsPoint(rect, locationInNode)){
                return false;
            }
        }else {
            //cc.log("----type",target._type);
            if(target._type == gs.rocker.ROCKER_TYPE.AUTO){
                //cc.log("KKKKKKKKK");
                target.setVisible(true);
            }
            target.setPosition(touch.getLocation());
        }
        return true;
    },
    onTouchMoved: function(touch, event){
        var target = this.target;
        var knob = target._knobNode;
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        target.onUpdate(locationInNode);
        var length =cc.pLength(locationInNode);
        var radians = cc.degreesToRadians(target._angle);
        if(length > target._radius){
            var x = Math.cos(radians) * target._radius;
            var y = Math.sin(radians) * target._radius;
            knob.setPosition(cc.p(x, y));
        } else{
            knob.setPosition(locationInNode);
        }
    },
    update: function(dt){
      //if(this._direction != this._rockerDirectionStr["ORIGIN"]){
          this.onCallback();
      //}
    },
    onTouchEnded: function(touch, event){
        var target = this.target;
        if(target._type == gs.rocker.ROCKER_TYPE.AUTO){
            target.setVisible(false);
        }
        target.reset();
        target.onCallback();
    },
    onUpdate: function(pos){
        this.onUpdateAngle(pos);
        this.onUpdateDirection(pos);
        this.onUpdateVelocity();//加速度
    },
    onUpdateAngle: function(pos){
        //回傳角度0～360
        this._angle = cc.radiansToDegrees(cc.pToAngle(pos));
        if(this._angle < 0){
            this._angle += 360;
        }
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
    onUpdateVelocity: function(){
        //加速度，_radius半徑
      this._velocity.x = this._knobNode.getPositionX() / this._radius;
      this._velocity.y = this._knobNode.getPositionY() / this._radius;
    },
    reset: function(){
        this._knobNode.setPosition(0,0);
        this._angle = 0;
        this._velocity = cc.p(0, 0);
        this._direction = this._rockerDirectionStr.ORIGIN;
    },
    onCallback: function(){
        (this._callback && typeof(this._callback) === "function") && this._callback(this._velocity);
    },
    getBaseNode : function(){
        return this._baseNode;
    },
    setBaseNode : function(baseNode){
        this._baseNode = baseNode;
    },
    getKnobNode : function(){
        return this._knobNode;
    },
    setKnobNode : function(knobNode){
        this._knobNode = knobNode;
    },
    getTouchListener : function(){
        return this._touchListener;
    },
    setTouchListener : function(touchListener){
        this._touchListener = touchListener;
    },
    getRadius : function(){
        return this._radius;
    },
    setRadius : function(radius){
        this._radius = radius;
    },
    getAngle : function(){
        return this._angle;
    },
    setAngle : function(angle){
        this._angle = angle;
    },
    getVelocity : function(){
        return this._velocity;
    },
    setVelocity : function(velocity){
        this._velocity = velocity;
    },
    getCallback : function(){
        return this._callback;
    },
    setCallback : function(callback){
        this._callback = callback;
    },
    getDirection : function(){
        return this._direction;
    },
    setDirection : function(direction){
        this._direction = direction;
    },
    getType : function(){
        return this._type;
    },
    setType : function(type){
        this._type = type;
    }
});

var _p = gs.rocker.rockerObject.prototype;
//用法是這樣，this.callback = function;, function的讀和寫是用後面的getCallback和setCallback
cc.defineGetterSetter(_p, "callback", _p.getCallback, _p.setCallback);
//_p.callback;
cc.defineGetterSetter(_p, "baseNode", _p.getBaseNode, _p.setBaseNode);
//_p.baseNode;
cc.defineGetterSetter(_p, "knobNode", _p.getKnobNode, _p.setKnobNode);
/** @expose */
_p.knobNode;
cc.defineGetterSetter(_p, "touchListener", _p.getTouchListener, _p.setTouchListener);
/** @expose */
_p.touchListener;
cc.defineGetterSetter(_p, "radius", _p.getRadius, _p.setRadius);
/** @expose */
_p.radius;
cc.defineGetterSetter(_p, "angle", _p.getAngle, _p.setAngle);
/** @expose */
_p.angle;
cc.defineGetterSetter(_p, "velocity", _p.getVelocity, _p.setVelocity);
/** @expose */
_p.velocity;
cc.defineGetterSetter(_p, "callback", _p.getCallback, _p.setCallback);
/** @expose */
_p.callback;
cc.defineGetterSetter(_p, "direction", _p.getDirection, _p.setDirection);
/** @expose */
_p.direction;
cc.defineGetterSetter(_p, "type", _p.getType, _p.setType);
/** @expose */
_p.type;