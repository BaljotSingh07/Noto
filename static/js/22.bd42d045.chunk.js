"use strict";(self.webpackChunkLotteryDBTest=self.webpackChunkLotteryDBTest||[]).push([[22],{5022:function(t,e,n){n.r(e),n.d(e,{createSwipeBackGesture:function(){return a}});var r=n(1811),i=n(9507),u=n(7909),a=function(t,e,n,a,o){var c=t.ownerDocument.defaultView,s=(0,i.i)(t),f=function(t){return s?-t.deltaX:t.deltaX};return(0,u.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(t){return function(t){var e=t.startX;return s?e>=c.innerWidth-50:e<=50}(t)&&e()},onStart:n,onMove:function(t){var e=f(t)/c.innerWidth;a(e)},onEnd:function(t){var e=f(t),n=c.innerWidth,i=e/n,u=function(t){return s?-t.velocityX:t.velocityX}(t),a=u>=0&&(u>.2||e>n/2),h=(a?1-i:i)*n,d=0;if(h>5){var l=h/Math.abs(u);d=Math.min(l,540)}o(a,i<=0?.01:(0,r.e)(0,i,.9999),d)}})}}}]);
//# sourceMappingURL=22.bd42d045.chunk.js.map