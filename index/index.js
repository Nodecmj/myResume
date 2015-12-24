function getEle(ele){
    return document.querySelector(ele);
}
var bell = getEle("#bell");
var say = getEle("#say");
var music = getEle("#music");
var main = getEle("#main");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 1008;
if(winW/winH>desW/desH){
    main.style.webkitTransform = "scale("+winW/desW+")";
}else{
    main.style.webkitTransform = "scale("+winH/desH+")";
}
var loadSpan = getEle(".loadSpan");
var arr= ['phoneBg.jpg', 'cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png','phoneBtn.png', 'phoneKey.png', 'messageHead1.png', 'messageHead2.png', 'messageText.png', 'phoneHeadName.png'];
var n = 0;
fnLoad();
function fnLoad(){
    arr.forEach(function(){
        var oImg = new Image();
        oImg.src = "images/"+arguments[0];
        oImg.onload = function(){
            n++;
            loadSpan.style.width = n/arr.length*100+"%"
        }
    })
    loadSpan.addEventListener("webkitTransitionEnd",function(){
        this.parentNode.parentNode.remove();
        fnPhone.init();
    },false)

}

var phone  = getEle('#phone');
var touchClick = getEle('.touchClick');
var fnPhone = {
    init : function(){
        bell.play();
        phone.addEventListener("touchstart",this.touch,false);
    },
    touch : function(e){
        bell.pause();
      if(e.target.className =="touchClick"){
          say.play();
          touchClick.parentNode.style.display="none";
          touchClick.parentNode.nextElementSibling.style.webkitTransform = "translate(0,0)";
          touchClick.addEventListener("webkitTransitionEnd",function(){
              this.style.webkitTransition = "";
          },false)
      }else if(e.target.className == "otherClick"){
            say.pause();
            fnPhone.close();
      }
    },
    close : function(){
        phone.style.webkitTransform ="translate(0,"+desH+"px)";
        window.setTimeout(function(){
            phone.remove();
            fnMessage();
        },1000)
    }
}
var message = getEle(".message");
var messageUl = getEle('.message>ul');
var messageLis = document.querySelectorAll('.message>ul>li');
function fnMessage(){
    music.play();
    var n = 0;
    var h = 0;
   var timer = window.setInterval(function(){
       messageLis[n].style.opacity = 1;
       messageLis[n].style.webkitTransform = "translate(0,0)";
       h-=messageLis[n].offsetHeight-20;
       if(n>=3){
           messageUl.style.webkitTransform = "translate(0,"+h+"px)";
       }
       if(n==messageLis.length-1){
           window.clearInterval(timer);
           window.setTimeout(function(){
                message.remove();
               fnCube()
           },1000)
       }else{
           n++;
       }
   },1000)
}
var cube = getEle(".cube");
var cubeBox = getEle('.cubeBox');
var cubeLis = document.querySelectorAll('.cubeBox>li');
function fnCube(){
    var startTouch = {x:0,y:0};
    var startX = -45;
    var startY = -45;
    cubeBox.style.webkitTransform = "scale(0.7) rotateX(-45deg) rotateY(-45deg)";
   [].forEach.call(cubeLis,function(){
       arguments[0].addEventListener('touchstart',start,false)
       arguments[0].addEventListener('touchmove',move,false)
       arguments[0].addEventListener('touchend',end,false);
   })
    function start(e){
        startTouch.x = e.changedTouches[0].pageX;
        startTouch.y = e.changedTouches[0].pageY;
    }
    function move(e){
        var moveTouchX = e.changedTouches[0].pageX;
        var moveTouchY = e.changedTouches[0].pageY;
        this.changePosX = moveTouchX - startTouch.x;
        this.changePosY = moveTouchY - startTouch.y;
        this.parentNode.style.webkitTransform = "scale(0.7)  rotateX("+(-startY-this.changePosY)+"deg) rotateY("+(startX+this.changePosX)+"deg)";
    }
    function end(){
        startX+=this.changePosX;
        startY+=this.changePosY;
    }
}
document.addEventListener('touchstart',function(){
},false);



