

// 游戏引擎        游戏背景						开始， 结束


var gameEngine = {
	
	ele: $("#box"),		
    start:function(){
		this.moveBg();
		this.addEnemyPlane();
		this.crashListening();
		this.showScore();
    },
	moveBg: function() {	
		var self = this
		var h=parseInt($("body").css("width"))*853/483;
		this.ele.animate({"background-position-y":h+"px"}, 10000, "linear", function() {
			self.ele.css({"background-position-y": "0"})
			self.moveBg()
		})
	},
	
	addEnemyPlane:function(){
		    	var add=setInterval(function(){
					var x=Math.random();
					if(x>0.9){
						var plane=new BigPlane();
					}else if(x>0.6){
						var plane=new MediumPlane()
					}else{
						var plane=new SmallPlane();
					}
					plane.move();
	                gameEngine.allEnemy[plane.id]=plane;
		        },500)		
	},
	isTouch:function ($box1, $box2) {
	  	var x1 = $box1.position().left - $box2.width()/2
		var y1 = $box1.position().top - $box2.height()/2
		
		var x2 = $box1.position().left + $box1.width() + $box2.width()/2
		var y2 = $box1.position().top + $box1.height() + $box2.height()/2
	
		var x0 = $box2.position().left + $box2.width()/2
		var y0 = $box2.position().top + $box2.height()/2
		
		if ( x0 >= x1 && x0 <= x2  && y0 >= y1 && y0 <= y2) {
			return true;
		} else {
			return false;
		}
	},
	allBullet:{},
	allEnemy:{},
	crashListening:function(){
		setInterval(function(){
		//判断子弹与敌机碰撞
		for(var k in gameEngine.allBullet){
		  for(var j in gameEngine.allEnemy){
		  	    if(gameEngine.allEnemy[j]&&gameEngine.allBullet[k]){
		  	    	if(gameEngine.isTouch(gameEngine.allEnemy[j].ele,gameEngine.allBullet[k].ele)){
						gameEngine.allBullet[k].boom();
						gameEngine.allEnemy[j].hp--;
						gameEngine.allEnemy[j].boom();
					
					}
		  	    }
					
				}
			 }
		},10)
		var myCarsh=setInterval(function(){
			//判断本体与敌机碰撞
			  for(var j in gameEngine.allEnemy){
				if(gameEngine.isTouch(gameEngine.allEnemy[j].ele,$(".myPlane"))){
					myPlane.boom();
					clearInterval(myCarsh);
				}
			  }
		},10)
	},
	showScore:function(){
		$("#showScore").html("分数："+myPlane.score);
	},
	loading:function(){
		var load=$("<div></div>");
		load.addClass("loading");
		load.appendTo("#box");
		var count=0;
		var timer=setInterval(function(){
			count++;
			load.css("background","url(img/loading"+count+".png)");
			if(count==3){
				clearInterval(timer);
			}
		},1000)
		setTimeout(function(){
			load.remove();
			$("#logo").remove();
		},4000)
	}
}
