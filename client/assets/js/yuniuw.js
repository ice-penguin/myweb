(function(e){function t(e,t){this.$ele=t,this.set=e,this.WH=this.set.vertical?t.height():t.width(),this.lis=t.find("ul li"),this.idx=0,this.timer=null}e.fn.myPic=function(n){return e.fn.myPic.defaults={vertical:!1,button:!0,auto:!0,effect:"scroll",onMouse:"mouseover"},this.each(function(){var r=n?e.extend(e.fn.myPic.defaults,n):e.fn.myPic.defaults,i=new t(r,e(this));r.button&&i.generate(e(this)),r.auto&&i.auto()}),this},t.prototype={generate:function(t){var n=e("<ol></ol>").appendTo(t),r=this;e.each(this.lis,function(t,r){e("<li>"+(t+1)+"</li>").appendTo(n)}),this.olis=t.find("ol li"),this.olis.eq(0).attr("class","on");switch(this.set.effect){case"scroll":t.find("ul").css({position:"absolute",left:0,top:0}),this.set.vertical&&this.lis.css({"float":"none"});break;case"flip":case"fade":this.lis.css({position:"absolute",left:0,top:0,"float":"none"}).eq(0).css("zIndex","2");break;case"in":this.lis.css({display:"none"}).eq(0).css("display","block");break;default:}t.delegate("ol li",this.set.onMouse,function(){var $this=e(this);setTimeout(function(){r.start($this.index())},300),r.stop()}).delegate("ol li","mouseout",function(){r.auto()})},start:function(e){this.idx=e,this.idx!=this.from&&(this.effect(this),this.reset())},effect:function(t){var n=t.idx,r={};switch(t.set.effect){case"scroll":r[t.set.vertical?"top":"left"]=-(n*this.WH),this.$ele.find("ul").stop(!0,!0).animate(r),r=null;break;case"flip":this.lis.eq(n).css("zIndex",1),this.lis.eq(this.from||0).stop(!0,!0).css("opacity",.8).animate({left:-100,opacity:0},600,function(){e(this).css({zIndex:0,opacity:1,left:0}),t.lis.eq(n).css("zIndex","2")});break;case"fade":this.lis.eq(n).css("zIndex","1"),this.lis.eq(this.from||0).stop(!0,!0).fadeOut(500,function(){e(this).css({zIndex:0,display:"block"}),t.lis.eq(n).css("zIndex","2")});break;case"in":this.lis.eq(this.from||0).stop(!0,!0).fadeOut(400,function(){t.lis.eq(n).stop(!0,!0).fadeIn(700)});default:}},reset:function(){this.olis.eq(this.from||0).attr("class",""),this.olis.eq(this.idx).attr("class","on"),this.from=this.idx||0},stop:function(){var e=this;clearInterval(e.timer)},auto:function(){var e=this,t=this.lis.length;this.timer=setInterval(function(){e.idx=e.idx>=t-1?0:++e.idx,e.start(e.idx)},3e3)}}})(jQuery);
$('#ppt5').myPic(); 

 function ShowCheck(src) {
        $(src).parent().children().removeClass("cur");
        $(src).addClass("cur");
        var Index = $(src).attr("id");
        Index = Index.substring(3, Index.length);
        var ShowIndex = "#shk" + Index
        $(src).parent().parent().parent().parent().children(".pros_ct").hide();
        $(src).parent().parent().parent().parent().find(ShowIndex).show();

    }
    var CheckIndex = "0";
    var SwichID = "#index_Product";
    $(SwichID).find("#chk" + CheckIndex).addClass("cur");
    $(SwichID).find("#shk" + CheckIndex).show();
	
//图片滚动列表 mengjia 070927
var Speed_1 = 10; //速度(毫秒)
var Space_1 = 20; //每次移动(px)
var PageWidth_1 = 225 * 4; //翻页宽度
var interval_1 = 7000; //翻页间隔
var fill_1 = 0; //整体移位
var MoveLock_1 = false;
var MoveTimeObj_1;
var MoveWay_1="right";
var Comp_1 = 0;
var AutoPlayObj_1=null;
function GetObj(objName){if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else{return eval('document.all.'+objName)}}
function AutoPlay_1(){clearInterval(AutoPlayObj_1);AutoPlayObj_1=setInterval('ISL_GoDown_1();ISL_StopDown_1();',interval_1)}
function ISL_GoUp_1(){if(MoveLock_1)return;clearInterval(AutoPlayObj_1);MoveLock_1=true;MoveWay_1="left";MoveTimeObj_1=setInterval('ISL_ScrUp_1();',Speed_1);}
function ISL_StopUp_1(){if(MoveWay_1 == "right"){return};clearInterval(MoveTimeObj_1);if((GetObj('ISL_Cont_1').scrollLeft-fill_1)%PageWidth_1!=0){Comp_1=fill_1-(GetObj('ISL_Cont_1').scrollLeft%PageWidth_1);CompScr_1()}else{MoveLock_1=false}
AutoPlay_1()}
function ISL_ScrUp_1(){if(GetObj('ISL_Cont_1').scrollLeft<=0){GetObj('ISL_Cont_1').scrollLeft=GetObj('ISL_Cont_1').scrollLeft+GetObj('List1_1').offsetWidth}
GetObj('ISL_Cont_1').scrollLeft-=Space_1}
function ISL_GoDown_1(){clearInterval(MoveTimeObj_1);if(MoveLock_1)return;clearInterval(AutoPlayObj_1);MoveLock_1=true;MoveWay_1="right";ISL_ScrDown_1();MoveTimeObj_1=setInterval('ISL_ScrDown_1()',Speed_1)}
function ISL_StopDown_1(){if(MoveWay_1 == "left"){return};clearInterval(MoveTimeObj_1);if(GetObj('ISL_Cont_1').scrollLeft%PageWidth_1-(fill_1>=0?fill_1:fill_1+1)!=0){Comp_1=PageWidth_1-GetObj('ISL_Cont_1').scrollLeft%PageWidth_1+fill_1;CompScr_1()}else{MoveLock_1=false}
AutoPlay_1()}
function ISL_ScrDown_1(){if(GetObj('ISL_Cont_1').scrollLeft>=GetObj('List1_1').scrollWidth){GetObj('ISL_Cont_1').scrollLeft=GetObj('ISL_Cont_1').scrollLeft-GetObj('List1_1').scrollWidth}
GetObj('ISL_Cont_1').scrollLeft+=Space_1}
function CompScr_1(){if(Comp_1==0){MoveLock_1=false;return}
var num,TempSpeed=Speed_1,TempSpace=Space_1;if(Math.abs(Comp_1)<PageWidth_1/2){TempSpace=Math.round(Math.abs(Comp_1/Space_1));if(TempSpace<1){TempSpace=1}}
if(Comp_1<0){if(Comp_1<-TempSpace){Comp_1+=TempSpace;num=TempSpace}else{num=-Comp_1;Comp_1=0}
GetObj('ISL_Cont_1').scrollLeft-=num;setTimeout('CompScr_1()',TempSpeed)}else{if(Comp_1>TempSpace){Comp_1-=TempSpace;num=TempSpace}else{num=Comp_1;Comp_1=0}
GetObj('ISL_Cont_1').scrollLeft+=num;setTimeout('CompScr_1()',TempSpeed)}}
function picrun_ini(){
GetObj("List2_1").innerHTML=GetObj("List1_1").innerHTML;
GetObj('ISL_Cont_1').scrollLeft=fill_1>=0?fill_1:GetObj('List1_1').scrollWidth-Math.abs(fill_1);
GetObj("ISL_Cont_1").onmouseover=function(){clearInterval(AutoPlayObj_1)}
GetObj("ISL_Cont_1").onmouseout=function(){AutoPlay_1()}
AutoPlay_1();
}

function ShowCheckNew(src) {
        $(src).parent().children().removeClass("cur");
        $(src).addClass("cur");
        var Index = $(src).attr("id");
        Index = Index.substring(3, Index.length);
        var ShowIndex = "#shk" + Index
        $(src).parent().parent().parent().parent().children(".abt_rt_ct").hide();
        $(src).parent().parent().parent().parent().find(ShowIndex).show();
    }
    var CheckIndex = "0";
    var SwichID = "#index_NewCut";
    
    $(SwichID).find("#chk" + CheckIndex).addClass("cur");
    $(SwichID).find("#shk" + CheckIndex).show();
	
$(function (){
	$('.lf_nav_ct ul li:last').addClass('nones');
});