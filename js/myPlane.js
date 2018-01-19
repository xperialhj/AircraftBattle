function MyPlane(){
	this.ele=$("<div></div>");
	this.ele.addClass("myPlane");
	this.ele.appendTo("#box");
	this.score=0;
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
MyPlane.prototype.boom=function(){
	var self=this;
	var count=0;
	var timer=setInterval(function(){
			count++;
			self.ele.css("background","url(img/me_die"+count+".png)");
			if(count==4){
				clearInterval(timer);
			}
		},100)
	setTimeout(function(){
		self.ele.remove();
		alert("游戏结束");
		location.reload();
	},500)
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
	//this.id="B"+gameEngine.allBullet.length++;
}
Bullet.prototype.move=function(){
	var self=this;
	this.ele.animate({top:0},500,"linear",function(){
	    this.remove();
	    delete gameEngine.allBullet[self.id];
	});
}
Bullet.prototype.boom=function(){
	var self=this;
	var bulletBoom=$("<div></div>");
	bulletBoom.addClass("bulletBoom");
	bulletBoom.appendTo(this.ele);
    this.ele.stop();
    delete gameEngine.allBullet[this.id];
    var count=0;
	var timer=setInterval(function(){
		count++;
		bulletBoom.css("background","url(img/die"+count+".png)");
		if(count==2){
			self.ele.remove();
			clearInterval(timer);
		}
	},100)
}



function SmallPlane(){
	this.ele=$("<div></div>");
	this.ele.addClass("smallPlane");
	this.ele.appendTo("#box");
	this.id=Math.random()*1000+"P";
	this.hp=1;
	this.speed=4;
}
SmallPlane.prototype.move=function(){
	var self=this;
	var t=4000/this.speed;
	var l=Math.random()*($("#box").width()-this.ele.width())
	this.ele.css({left:l,top:-this.ele.height()});
	this.ele.animate({top:$("#box").height()},t,"linear",function(){
		 this.remove();
		 delete gameEngine.allEnemy[self.id];
	})
}
SmallPlane.prototype.boom=function(){
	var self=this;
	if(this.hp<=0){
		self.ele.stop();
		var count=0;
		var timer=setInterval(function(){
			count++;
			self.ele.css("background","url(img/plain1_die"+count+".png)");
			if(count==3){
				clearInterval(timer);
			}
		},100)
		setTimeout(function(){
			self.ele.remove();
		},300)
		delete gameEngine.allEnemy[this.id];
		myPlane.score+=1;
		gameEngine.showScore();
	}
}

function MediumPlane(){
	SmallPlane.call(this);
	this.hp=3;
	this.speed=2;
	this.ele.removeClass().addClass("mediumPlane");
}
MediumPlane.prototype={};
for(var k in SmallPlane.prototype){
	MediumPlane.prototype[k]=SmallPlane.prototype[k];
}

MediumPlane.prototype.boom=function(){
	var self=this;
	if(this.hp<=0){
		self.ele.stop();
		var count=0;
		var timer=setInterval(function(){
			count++;
			self.ele.css("background","url(img/plain2_die"+count+".png)");
			if(count==4){
				clearInterval(timer);
			}
		},100)
		setTimeout(function(){
			self.ele.remove();
		},400)
		delete gameEngine.allEnemy[self.id];
		myPlane.score+=2;
		gameEngine.showScore();
	}
	
}

function BigPlane(){
	SmallPlane.call(this);
	this.hp=6;
	this.speed=1;
	this.ele.removeClass().addClass("bigPlane");
}
BigPlane.prototype={};
for(var k in SmallPlane.prototype){
	BigPlane.prototype[k]=SmallPlane.prototype[k];
}
BigPlane.prototype.boom=function(){
	var self=this;
	if(this.hp<=0){
		self.ele.stop();
		var count=0;
		var timer=setInterval(function(){
			count++;
			self.ele.css("background","url(img/plain3_die"+count+".png)");
			if(count==6){
				clearInterval(timer);
			}
		},100)
		setTimeout(function(){
			self.ele.remove();
		},600)
		delete gameEngine.allEnemy[self.id];
		myPlane.score+=3;
		gameEngine.showScore();
	}
}




