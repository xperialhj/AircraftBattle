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
		return this;
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
	return this;
}
MyPlane.prototype.stop=function(){
	$(document).off("mousemove");
	return this;
}
MyPlane.prototype.shoot=function(){
	setInterval(function(){
		var bullet=new Bullet();
		bullet.move();
		gameEngine.allBullet[bullet.id]=bullet;
	},200)
	return this;
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
	return this;
}
function Bullet(){
	this.ele=$("<div></div>");
	this.ele.addClass("bullet");
	this.ele.appendTo("#box");
	this.ele.css({
		left:parseInt($(".myPlane").css("left"))+46,
		top:parseInt($(".myPlane").css("top"))-18
    })
	//this.id=Math.random()*1000+"B";
	this.id="B"+gameEngine.allBullet.length++;
}
Bullet.prototype.move=function(){
	var self=this;
	this.ele.animate({top:0},500,"linear",function(){
	    this.remove();
	    delete gameEngine.allBullet[self.id];
	});
	return this;
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
	return this;
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
	return this;
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
	return this;
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
	return this;
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
	return this;
}

function HaoShen(){
	this.ele=$("<div></div>");
	this.ele.appendTo("#box");
	this.ele.css({left:"46%",top:-300});
	this.ele.animate({top:0},2000);
	this.ele.addClass("linian");
	this.hp=1000;
	this.speed=5;
	this.id="LiNianOrochi";
	this.hpBox=$("<div>HP</div>");
	this.hpBox.appendTo("#box");
	this.hpBox.addClass("bossHp");
}
HaoShen.prototype.move=function(){
	var self=this;
	var t=4000/this.speed;
	var x=Math.random()*($("#box").width()-this.ele.width());
	var y=Math.random()*($("#box").height()-this.ele.height());
	this.ele.animate({left:x,top:y},t,"linear",function(){
		setTimeout(function(){
			self.move();
		},4000)	
	})
}
HaoShen.prototype.skill=function(){
	var self=this;
	var haojiao=setInterval(function(){
		var x=parseInt(self.ele.css("left"))+self.ele.width()/2;
		var y=parseInt(self.ele.css("top"))+self.ele.height()/2;
		self.ele.css("background-image","url(img/boss"+Math.floor(Math.random()*3+1)+".png)")
		for (var i = 0; i <15; i++) {
	 		new Haojiao().fly(x,y);
	 	}
		if(self.hp<=0){
			clearInterval(haojiao);
		}
	},10000)
}
HaoShen.prototype.boom=function(){
	var self=this;
	if(this.hp<=0){
		this.ele.css("background-image","url(img/boss_die.png)");
		this.ele.animate({top:0},3000,function(){
			self.ele.remove();
			alert("离年宝宝溜了");
		})
	}
}
HaoShen.prototype.showHP=function(){
	this.hpBox.css({width:this.hp/2});
}

function Haojiao(){
   	 this.ele=$("<div></div>");
   	 this.ele.addClass("haojiao");
   	 this.id=this.id=Math.random()*1000+"BT";
   }

   Haojiao.prototype.fly=function(x,y){
   	var self=this;
   	 this.ele.css({left:x,top:y});
   	 x=x+(Math.random()+0.5)*2000-2000;
   	 y=y+(Math.random()+0.5)*2000-2000;
   	 this.ele.appendTo("#box");
   	 gameEngine.bossAttack[this.id]=this;
   	 this.ele.animate({left:x,top:y},4000,function(){ 	
 	 		self.ele.remove();
 	 		delete gameEngine.bossAttack[self.id];
   	 })
   }