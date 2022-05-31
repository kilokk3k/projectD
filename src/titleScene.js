/**
 * Created by USER on 2017/4/10.
 */
var titleScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new titleLayer();
        this.addChild(layer);
    }
});

var titleLayer = cc.Layer.extend({
    data: [{"id":"shipTest","name":"船圖測試"},{"id":"skillTest","name":"技能測試"}],
    ctor: function(){
        this._super();
        return true;
    },
    onEnter:function(){
        this._super();
        for(var i = 0; i < this.data.length; i++) {
            /**觸控文字*/
            var btn = new ccui.Text();
            btn.setString(this.data[i].name);
            btn.setName(this.data[i].id);
            btn.setTextColor(cc.color(125,125,0));
            btn.setFontSize(40);

            btn.addTouchEventListener(this._btnTouch, this);
            btn.setTouchEnabled(true);
            btn.setPosition(640,200+ (i*100));
            this.addChild(btn);
        }
    },
    _btnTouch: function(sender, type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                switch(sender.getName()){
                    case "shipTest":
                        cc.director.runScene(new rockerTestScene(sender.getName()));
                        break;
                    case "skillTest":
                        cc.director.runScene(new skillScene(sender.getName()));
                        break;
                }

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
    }


});