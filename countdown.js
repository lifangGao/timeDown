var WINDOW_WIDTH=800;
var WINDOW_HEIGHT=400;
var r=5;
var MARGIN_TOP=60;
var MARGIN_LEFT=100;

var balls =[];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload=function(){
	scrollWidth=document.body.scrollWidth;
	scrollHeight=document.body.scrollHeight;
	console.log('屏幕：寬：'+scrollWidth+'高'+scrollHeight);
	
	WINDOW_WIDTH=scrollWidth;
	WINDOW_HEIGHT=scrollHeight*0.8;
	console.log('畫布：寬：'+WINDOW_WIDTH+'高'+WINDOW_HEIGHT);
	
	MARGIN_TOP=scrollHeight*0.2;
	MARGIN_LEFT=scrollWidth*0.15;
	console.log('位置'+MARGIN_LEFT+'高'+MARGIN_TOP);
	
	r=(scrollWidth*0.6)/105-1;
	
	var canvas=document.getElementById("canvas");
	var context= canvas.getContext("2d");
	
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	
	timeDown(context);
	
}

function timeDown(cxt){
	var currentTime=getTime();
	var ballsDown=setInterval(function(){				
		var nextTime=getTime();	
		update(currentTime,nextTime);
				
			render(cxt,nextTime);
			currentTime=nextTime;
									
	},50)
}
function update(currentTime,nextTime){
	if(currentTime!=nextTime){
		var nowhours=parseInt(currentTime / 60 / 60);
		var nowminutes=parseInt((currentTime-nowhours*60*60)/60);
		var nowseconds=parseInt(currentTime%60);
		
		var nexthours=parseInt((nextTime-1) / 60 / 60);
		var nextminutes=parseInt(((nextTime-1)-nexthours*60*60)/60);
		var nextseconds=parseInt((nextTime-1)%60);
		
		if(parseInt(nowhours/10)!=parseInt(nexthours/10)){
			addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(nowhours/10));
		}
		if(parseInt(nowhours%10)!=parseInt(nexthours%10)){
			addBalls(MARGIN_LEFT+15*(r+1),MARGIN_TOP,parseInt(nowhours%10));
		}
		if(parseInt(nowminutes/10)!=parseInt(nextminutes/10)){
			addBalls(MARGIN_LEFT+15*(r+1)*2+9*(r+1),MARGIN_TOP,parseInt(nowminutes/10));
		}
		if(parseInt(nowminutes%10)!=parseInt(nextminutes%10)){
			addBalls(MARGIN_LEFT+15*(r+1)*3+9*(r+1),MARGIN_TOP,parseInt(nowminutes%10));
		}
		if(parseInt(nowseconds/10)!=parseInt(nextseconds/10)){
			addBalls(MARGIN_LEFT+15*(r+1)*4+9*(r+1)*2,MARGIN_TOP,parseInt(nowseconds/10));
		}
		if(parseInt(nowseconds%10)!=parseInt(nextseconds%10)){
			addBalls(MARGIN_LEFT+15*(r+1)*5+9*(r+1)*2,MARGIN_TOP,parseInt(nowseconds%10));
		}
	}
	updateBall();
	
	
		
}

function render(cxt,time){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	for( var i = 0 ; i < balls.length ; i ++ ){
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , r , 0 , 2*Math.PI , true );
        cxt.closePath();

        cxt.fill();
    }
	
	var hours=parseInt(time / 60 / 60);
	var minutes=parseInt((time-hours*60*60)/60);
	var seconds=parseInt(time%60);
	//console.log('时'+hours)
	//console.log('分'+minutes)
	//console.log('秒'+seconds)
	
	
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT+15*(r+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT+15*(r+1)*2,MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+15*(r+1)*2+9*(r+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+15*(r+1)*3+9*(r+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT+15*(r+1)*4+9*(r+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+15*(r+1)*4+9*(r+1)*2,MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+15*(r+1)*5+9*(r+1)*2,MARGIN_TOP,parseInt(seconds%10),cxt);
}

function getTime(){
	var date=new Date(2018,3,13,0,0,0);
	var newDate=new Date();
	var time=parseInt(date.getTime() / 1000)-parseInt(newDate.getTime() / 1000);
	//console.log(time)
	//console.log(date)
	//console.log(newDate)
	return time;
}

function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				var ball={
					x:x+j*2*(1+r)+(r+1)+r,
					y:y+i*2*(r+1)+(r+1),
					r:r,
					g:1.2+Math.random(),
					vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
					vy:-5,color:colors[parseInt(Math.random()*9)]
				}
				balls.push(ball)
			}
		}

	}	
}

function updateBall(){
	for(var i=0;i<balls.length;i++){
		balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
		if( balls[i].y >= WINDOW_HEIGHT-r ){
            balls[i].y = WINDOW_HEIGHT-r;
            balls[i].vy = - balls[i].vy*0.7;
        }
	}
	var cnt = 0
    for( var i = 0 ; i < balls.length ; i ++ )
        if( balls[i].x + r > 0 && balls[i].x -r < WINDOW_WIDTH )
            balls[cnt++] = balls[i]

    while( balls.length > cnt ){
        balls.pop();
    }
	
	
}

function renderDigit(x,y,num,cxt){
	cxt.fillStyle="rgb(0,102,153)";
	//console.log(num)
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(1+r)+(r+1)+r,y+i*2*(r+1)+(r+1),r, 0 , 2*Math.PI);
				
				cxt.closePath();				
				cxt.fill();
			}
		}

	}	
}
