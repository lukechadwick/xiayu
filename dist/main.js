!function(e){var t={};function l(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.m=e,l.c=t,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)l.d(n,a,function(t){return e[t]}.bind(null,a));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="",l(l.s=0)}([function(e,t,l){"use strict";function n(){I.plat=[];for(let e=0;e<m/300;e++)for(let e=0;e<x/50;e++){let t=Math.random()*(55*e-55*e)+55*e;I.plat[I.plat.length]={x:t,endX:t+50,y:Math.random()*(m-80-50)+50}}}function a(e){let t=v.bullets.length;for(let l=v.bullets.length;l<t+1;l++){let t,n;"b"!==e?(w.players[e].facingLeft||(t=M+Math.random(),n=40),w.players[e].facingLeft&&(t=-M+Math.random(),n=-20),v.bullets[l]={dx:t,dy:0,x:w.players[e].x+n,y:w.players[e].y+15,origin:0}):v.bullets[l]={dx:6*Math.random()-3,dy:6*Math.random()-3,x:E.x+63,y:E.y+63,origin:1,hasBounced:0}}}function r(){B()}function o(e){var t="keydown"==event.type;for(let l=0;l<w.players.length;l++)l<2&&(e.keyCode==(0==l?65:37)&&(w.players[l].leftState=t),e.keyCode==(0==l?87:38)&&(w.players[l].upState=t),e.keyCode==(0==l?68:39)&&(w.players[l].rightState=t),e.keyCode==(0==l?83:40)&&(w.players[l].duckState=t),e.keyCode==(0==l?32:16)&&(w.players[l].shootState=t),!w.players[l].reloading&&w.players[l].shootState&&y(l));s()}function y(e){w.players[e].reloading||(a(e),w.players[e].reloading=!0),w.players[e].reloading&&setTimeout(function(){w.players[e].reloading=!1},400)}function s(){for(let e=0;e<w.players.length;e++)w.players[e].duckState?w.players[e].height=g:w.players[e].height=2*g}l.r(t),document.addEventListener("DOMContentLoaded",function(){document.getElementById("startGame").onclick=r});let u=0;function i(){w.players=[];for(let e=0;e<b+u;e++)w.players[e]={height:h,width:h/2,x:Math.random()*x,y:0,xVelocity:0,yVelocity:0,reloading:!1,health:100,facingLeft:!1,color:"#"+(16777215*Math.random()<<0).toString(16),jumpState:!1,leftState:!1,rightState:!1,upState:!1,duckState:!1,shootState:!1}}function p(){E.x+=E.dx,E.y+=E.dy,function(){(E.x+E.dx>x+10||E.x+E.dx<-130)&&(E.dx=-E.dx);(E.y+E.dy>m-100||E.y+E.dy<-50)&&(E.dy=-E.dy)}(),E.ammo>0&&(E.ammo--,a("b"))}document.addEventListener("DOMContentLoaded",function(){document.getElementById("rp0").onclick=function(){u=0},document.getElementById("rp1").onclick=function(){u=1},document.getElementById("rp2").onclick=function(){u=2}}),l.d(t,"gameWindow",function(){return c}),l.d(t,"controlState",function(){return f}),l.d(t,"playerSize",function(){return h}),l.d(t,"duckHeight",function(){return g}),l.d(t,"playerNumber",function(){return b}),l.d(t,"windowHeight",function(){return m}),l.d(t,"windowWidth",function(){return x}),l.d(t,"groundHeight",function(){return S}),l.d(t,"bulletRadius",function(){return k}),l.d(t,"bulletVelocity",function(){return M}),l.d(t,"bulletArray",function(){return v}),l.d(t,"playerArray",function(){return w}),l.d(t,"platformArray",function(){return I}),l.d(t,"boss",function(){return E}),l.d(t,"setupGame",function(){return B}),document.addEventListener("keydown",o),document.addEventListener("keyup",o);let c=document.querySelector("canvas").getContext("2d");function d(e){m=1==e?300:2==e?450:3==e?600:750,x=1==e?700:2==e?1050:3==e?1400:1750,c.canvas.height=m,c.canvas.width=x,n()}document.addEventListener("DOMContentLoaded",function(){document.getElementById("ws0").onclick=function(){d(1)},document.getElementById("ws1").onclick=function(){d(2)},document.getElementById("ws2").onclick=function(){d(3)},document.getElementById("ws3").onclick=function(){d(4)}});let f={left:!1,right:!1,up:!1,down:!1,shoot:!1},h=40,g=h/2,b=4,m=300,x=700,S=25,k=5,M=5,P=0;c.canvas.height=m,c.canvas.width=x;let v={bullets:[]},w={players:[]},I={plat:[]},E={x:Math.random()*(x-0)+0,y:0,dx:2*Math.random()+1,dy:2*Math.random()+1,health:200,state:"left",ammo:100};function B(){b=Number(document.getElementById("botPlayerAmount").value),n(),i()}function T(){let e=document.getElementById("myCanvas");var t=e.getBoundingClientRect();let l=document.getElementById("gameSetup");l.style.top=t.top+e.offsetHeight/2-l.offsetHeight/2+"px",l.style.left=t.left+e.offsetWidth/2-l.offsetWidth/2+"px"}T(),n(),i(),setInterval(function(){E.ammo=100},8e3),setInterval(function(){!function(){for(let e=0;e<w.players.length;e++)e>=u&&(w.players[e].leftState=Math.random()>=.5,w.players[e].upState=Math.random()>=.9,w.players[e].rightState=Math.random()>=.5,w.players[e].duckState=Math.random()>=.9,!w.players[e].reloading&&Math.random()>=.7&&y(e));s()}(),v.bullets.forEach(e=>{e.hasBounced=0}),T()},200),setTimeout(function(){P=1},6e4),function e(){c.clearRect(0,0,x,m),1==P&&E.y<m+100&&(function(){let e=new Image;0==E.ammo?e.src="./assets/boss.png":e.src="./assets/bossGreen.png",c.drawImage(e,E.x,E.y)}(),p()),function(){for(let e=0;e<w.players.length;e++)w.players[e].health<21?c.fillStyle="red":w.players[e].health<51?c.fillStyle="orange":c.fillStyle="#2aff00",c.beginPath(),c.rect(w.players[e].x-5,w.players[e].y-15,w.players[e].health/3.3,5),c.fill(),c.strokeStyle="black",c.stroke(),c.closePath(),c.beginPath(),c.rect(E.x+10,E.y-10,E.health/1.9,5),c.fill(),c.strokeStyle="black",c.stroke(),c.closePath()}(),function(){for(let e=0;e<w.players.length;e++)1==w.players[e].upState&&0==w.players[e].jumping&&(w.players[e].yVelocity-=20,w.players[e].jumping=!0),w.players[e].leftState&&(w.players[e].facingLeft=!0,w.players[e].xVelocity-=.4),w.players[e].rightState&&(w.players[e].facingLeft=!1,w.players[e].xVelocity+=.4),w.players[e].yVelocity+=1.2,w.players[e].x+=w.players[e].xVelocity,w.players[e].y+=w.players[e].yVelocity,E.health<1&&(E.y+=.5),w.players[e].xVelocity*=.9,w.players[e].yVelocity*=.9,w.players[e].health>1&&w.players[e].y>m-S-w.players[e].height&&(w.players[e].y=m-S-w.players[e].height,w.players[e].jumping=!1,w.players[e].yVelocity=0)}(),function(){for(let e=0;e<w.players.length;e++)w.players[e].x<-h&&(w.players[e].x=-10,w.players[e].xVelocity=0),w.players[e].x>x&&(w.players[e].x=x)}(),function(){for(let e=0;e<v.bullets.length;e++)for(let t=0;t<1;t++)v.bullets[e].x-E.x<80&&v.bullets[e].x-E.x>50&&v.bullets[e].y-E.y<120&&v.bullets[e].y-E.y>0&&0==E.ammo&&1!=v.bullets[e].origin&&(E.health-=10,v.bullets[e].y=v.bullets[e].y+1e3)}(),function(){for(let e=0;e<v.bullets.length;e++)for(let t=0;t<I.plat.length;t++)v.bullets[e].x-I.plat[t].x<50&&v.bullets[e].x-I.plat[t].x>0&&v.bullets[e].y-I.plat[t].y<10&&v.bullets[e].y-I.plat[t].y>0&&1!=v.bullets[e].hasBounced&&(v.bullets[[e]].dy=-v.bullets[[e]].dy,v.bullets[e].hasBounced=1)}(),function(){for(let e=0;e<I.plat.length;e++){c.beginPath(),c.fillStyle="#ff4300",c.rect(I.plat[e].x,I.plat[e].y,I.plat[e].endX-I.plat[e].x,10),c.fill(),c.strokeStyle="black",c.stroke(),c.closePath();for(let t=0;t<6;t++)c.strokeStyle="black",c.beginPath(),c.moveTo(I.plat[e].x+10*t,I.plat[e].y),c.lineTo(I.plat[e].x+10*t,I.plat[e].y+10),c.stroke(),c.closePath()}}(),function(){for(let e=0;e<v.bullets.length;e++)for(let t=0;t<v.bullets.length;t++)v.bullets[e].x-v.bullets[t].x<5&&v.bullets[e].x-v.bullets[t].x>-5&&v.bullets[e].y-v.bullets[t].y<5&&v.bullets[e].y-v.bullets[t].y>-5&&e!=t&&(v.bullets[[e]].dy=-5*Math.random(),v.bullets[[t]].dy=5*Math.random())}(),function(){for(let e=0;e<w.players.length;e++){c.beginPath(),c.fillStyle=w.players[e].color,0==e&&(c.fillStyle="red"),1==e&&(c.fillStyle="yellow"),2==e&&(c.fillStyle="blue"),3==e&&(c.fillStyle="green"),c.rect(w.players[e].x,w.players[e].y,w.players[e].width,w.players[e].height),c.fill(),c.strokeStyle="black",c.stroke(),c.closePath(),c.beginPath(),c.arc(w.players[e].x+5,w.players[e].y+5,2,0,2*Math.PI),c.stroke(),c.beginPath(),c.arc(w.players[e].x+15,w.players[e].y+5,2,0,2*Math.PI),c.stroke(),c.beginPath(),c.arc(w.players[e].x+10,w.players[e].y+9,1,0,2*Math.PI),c.stroke();let t=0;t=w.players[e].health<30?2*Math.PI:Math.PI,c.beginPath(),c.arc(w.players[e].x+10,w.players[e].y+15,3,0,t),c.stroke(),w.players[e].facingLeft?(c.beginPath(),c.moveTo(w.players[e].x-20+20,w.players[e].y+15),c.lineTo(w.players[e].x-20+20,w.players[e].y+20),c.lineTo(w.players[e].x-25+20,w.players[e].y+15),c.lineTo(w.players[e].x-30+20,w.players[e].y+15),c.lineTo(w.players[e].x-20+20,w.players[e].y+15),c.stroke()):(c.beginPath(),c.moveTo(w.players[e].x+20,w.players[e].y+15),c.lineTo(w.players[e].x+20,w.players[e].y+20),c.lineTo(w.players[e].x+25,w.players[e].y+15),c.lineTo(w.players[e].x+30,w.players[e].y+15),c.lineTo(w.players[e].x+20,w.players[e].y+15),c.stroke()),w.players[e].y>m&&w.players.splice(e,1)}}(),function(){for(let e=0;e<v.bullets.length;e++)for(let t=0;t<w.players.length;t++)v.bullets[e].x-w.players[t].x<20&&v.bullets[e].x-w.players[t].x>0&&v.bullets[e].y-w.players[t].y<40&&v.bullets[e].y-w.players[t].y>0&&(w.players[[t]].health-=10,v.bullets[[e]].y=v.bullets[[e]].y+1e3)}(),function(){for(let e=0;e<w.players.length;e++)for(let t=0;t<I.plat.length;t++)w.players[e].y>I.plat[t].y-w.players[e].height&&w.players[e].y<I.plat[t].y&&w.players[e].x>I.plat[t].x-20&&w.players[e].x<I.plat[t].endX&&(w.players[e].jumping=!1,w.players[e].health>1&&(w.players[e].yVelocity=0,w.players[e].y=I.plat[t].y-w.players[e].height+4))}(),function(){for(let e=0;e<v.bullets.length;e++)v.bullets[e].y<m&&v.bullets[e].x<x&&v.bullets[e].x>0?(c.beginPath(),c.arc(v.bullets[e].x,v.bullets[e].y,k,0,2*Math.PI),c.fillStyle="#"+(16777215*Math.random()<<0).toString(16),c.fill(),c.strokeStyle="black",c.stroke(),c.closePath()):v.bullets.splice(e,1)}(),function(){for(let e=0;e<v.bullets.length;e++)v.bullets[e].x+=v.bullets[e].dx,v.bullets[e].y+=v.bullets[e].dy}(),window.requestAnimationFrame(e)}()}]);