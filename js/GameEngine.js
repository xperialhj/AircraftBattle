

// 游戏引擎        游戏背景						开始， 结束


var gameEngine = {
	
	ele: $("#box"),		

	start: function() {	
		var self = this
		this.ele.animate({"background-position-y": "1510px"}, 10000, "linear", function() {
			self.ele.css({"background-position-y": "0px"})
			self.start()
		})
	}
}
