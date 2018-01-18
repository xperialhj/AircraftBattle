function MyPlane(){
	this.ele=$("<div></div>");
	this.ele.addClass("myPlane");
	this.ele.appendTo("#box");
	this.shoot();
}
MyPlane.prototype.start=function(){
		var self=this;
		this.ele.mousedown(function(e){
			e.preventDefault() 
			var dataX=e.offsetX;
			var dataY=e.offsetY;
		  $(document).mousemove(function(e){
		  	e.preventDefault() 
		  	var x=e.clientX-dataX;
		  	var y=e.clientY-dataY;
		  	self.move(x,y);
		  })
		})
		$(document).mouseup(function(){
			self.stop();
		})
		$(document).keydown(function(e){
			if(e.keyCode==37){
				var x=parseInt(self.ele.css("left"));
				var y=parseInt(self.ele.css("top"));
				x-=10;
				self.move(x,y);
			}else if(e.keyCode==39){
				var x=parseInt(self.ele.css("left"));
				var y=parseInt(self.ele.css("top"));
				x+=10;
				self.move(x,y);
			}else if(e.keyCode==38){
				var x=parseInt(self.ele.css("left"));
				var y=parseInt(self.ele.css("top"));
				y-=10;
				self.move(x,y);
			}else if(e.keyCode==40){
				var x=parseInt(self.ele.css("left"));
				var y=parseInt(self.ele.css("top"));
				y+=10;
				self.move(x,y);
			}
		})
	}
MyPlane.prototype.move=function(x,y){
	if(x<0){
		x=0;
	}else if(x>$("#box").width()-this.ele.width()){
		x=$("#box").width()-this.ele.width();
	}
	if(y<0){
		y=0;
	}else if(y>$("#box").height()-this.ele.height()){
		y=$("#box").height()-this.ele.height();
	}
	this.ele.css({
		left:x,
		top:y		
	})
}
MyPlane.prototype.stop=function(){
	$(document).off("mousemove");
}
MyPlane.prototype.shoot=function(){
	setInterval(function(){
		var bullet=new Bullet();
		bullet.move();
		gameEngine.allBullet[bullet.id]=bullet;
	},200)	
}

function Bullet(){
	this.ele=$("<div></div>");
	this.ele.addClass("bullet");
	this.ele.appendTo("#box");
	this.ele.css({
		left:parseInt($(".myPlane").css("left"))+46,
		top:parseInt($(".myPlane").css("top"))-18
    })
	this.id=Math.random()*1000+"B";
}
Bullet.prototype.move=function(){
	var self=this;
	this.ele.animate({top:0},500,function(){
	    this.remove();
	    delete gameEngine.allBullet[self.id];
	});
}
Bullet.prototype.boom=function(x,y){
	var bulletBoom=$("<div></div>");
	bulletBoom.addClass("bulletBoom");
	bulletBoom.appendTo("#box");
	bulletBoom.css({
		left:x,
		top:y
	})
	setInterval(function(){
		bulletBoom.css("background","url(img/die1.png)");
	},100)
}



function SmallPlane(){
	this.ele=$("<div></div>");
	this.ele.addClass("smallPlane");
	this.ele.appendTo("body");
	this.id=Math.random()*1000+"P";
	this.hp=1;
}
SmallPlane.prototype.move=function(){
	var self=this;
	var l=Math.random()*($("#box").width()-this.ele.width())
	this.ele.css({left:l,top:-this.ele.height()});
	this.ele.animate({top:$("#box").height()},3000,function(){
		 this.remove();
		 delete gameEngine.allEnemy[self.id];
	})
}

function MediumPlane(){
	SmallPlane.call(this);
	this.hp=3;
	this.ele.removeClass().addClass("mediumPlane");
}
MediumPlane.prototype=new SmallPlane();
MediumPlane.prototype.move=function(){
	var self=this;
	var l=Math.random()*($("#box").width()-this.ele.width())
	this.ele.css({left:l,top:-this.ele.height()});
	this.ele.animate({top:$("#box").height()},6000,function(){
		 this.remove();
		 delete gameEngine.allEnemy[self.id];
	})
}

function BigPlane(){
	SmallPlane.call(this);
	this.hp=6;
	this.ele.removeClass().addClass("bigPlane");
}
BigPlane.prototype=new SmallPlane();
BigPlane.prototype.move=function(){
	var self=this;
	var l=Math.random()*($("#box").width()-this.ele.width())
	this.ele.css({left:l,top:-this.ele.height()});
	this.ele.animate({top:$("#box").height()},9000,function(){
		 this.remove();
		 delete gameEngine.allEnemy[self.id];
	})
}




//enemyPlane.prototype.add=function(){
//		var x=Math.random();
//		if(x>0.9){
//			this.ele.addClass("bigPlane");
//			var speed=10000;
//		}else if(x>0.6){
//			this.ele.addClass("mediumPlane");
//			var speed=8000;
//		}else{
//			this.ele.addClass("smallPlane");
//			var speed=5000;
//		}
//		
//		this.ele.appendTo("body");
//		var l=Math.random()*($("#box").width()-this.ele.width())
//		this.ele.css({left:l,top:-this.ele.height()});
//		
//		this.ele.animate({top:$("#box").height()},speed,function(){
//			 this.remove();
//		})
//}
//enemyPlane.prototype.start=function(){
//	var self=this;
//	setInterval(function(){
//		new enemyPlane().add();
//	},1000)
//}
//enemyPlane.prototype.underAttack=function(){
//	
//}
