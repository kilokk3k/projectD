/**
 * Created by USER on 2017/4/10.
 */
var skillScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new skillLayer();
        this.addChild(layer);
    }
});

var skillLayer = cc.Layer.extend({
    //data: [{"id":"shipTest","name":"船圖測試"},{"id":"skillTest","name":"技能測試"}],
    ctor: function(){
        this._super();
        return true;
    },
    onEnter:function(){
        this._super();
        for(var i = 0; i < 3; i++) {
            var node1 = new ccui.CheckBox();
            if(i == 0)node1.loadTextures(res.skill1Disable_png, res.skill1_png, res.skill1_png, res.skill1Disable_png, res.skill1Disable_png);
            if(i == 1)node1.loadTextures(res.skill2Disable_png, res.skill2_png, res.skill2_png, res.skill2Disable_png, res.skill2Disable_png);
            if(i == 2)node1.loadTextures(res.skill3Disable_png, res.skill3_png, res.skill3_png, res.skill3Disable_png, res.skill3Disable_png);
            node1.setTouchEnabled(true);
            node1.addEventListener(this.checkFun, this);
            node1.setPosition(200+(i*120), 360);
            this.addChild(node1);
        }

    },
    checkFun: function(){
        cc.log("kkkk");
    }

});