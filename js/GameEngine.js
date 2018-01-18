

// 游戏引擎        游戏背景						开始， 结束


var gameEngine = {
	
	ele: $("#box"),		

	moveBg: function() {	
		var self = this
		var h=parseInt($("body").css("width"))*853/483;
		this.ele.animate({"background-position-y":h+"px"}, 10000, "linear", function() {
			self.ele.css({"background-position-y": "0"})
			self.moveBg()
		})
	},
	
	start:null
}
