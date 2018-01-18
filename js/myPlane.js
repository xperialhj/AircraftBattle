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
		new Bullet().move();
	},100)	
}
function Bullet(){
	this.ele=$("<div></div>");
	this.ele.addClass("bullet");
	this.ele.appendTo("#box");
	this.ele.css({
		left:parseInt($(".myPlane").css("left"))+46,
		top:parseInt($(".myPlane").css("top"))-18
    })
}
Bullet.prototype.move=function(){
	this.ele.animate({top:0},500,function(){
	    this.remove();
	});
}


function enemyPlane(){
		
}
enemyPlane.prototype.add=function(){
		var x=Math.random();
		var plane=$("<div></div>");
		if(x>0.9){
			plane.addClass("bigPlane");
			var speed=10000;
		}else if(x>0.6){
			plane.addClass("mediumPlane");
			var speed=8000;
		}else{
			plane.addClass("smallPlane");
			var speed=5000;
		}
		
		plane.appendTo("body");
		var l=Math.random()*($("#box").width()-plane.width())
		console.log(plane.width(),plane.height())
		plane.css({left:l,top:-plane.height()});
		
		plane.animate({top:$("#box").height()},speed,function(){
			 plane.remove();
		})
}
enemyPlane.prototype.start=function(){
	var self=this;
	setInterval(function(){self.add()},1000)
}
