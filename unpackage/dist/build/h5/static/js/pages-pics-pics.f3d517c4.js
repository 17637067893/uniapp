(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-pics-pics"],{1013:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-c239a2f8]{height:100%;background-color:#e6eef4}.pics[data-v-c239a2f8]{background-color:#e6eef4;height:100%;padding:%?10?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.pics .left[data-v-c239a2f8]{width:%?200?%;height:%?1200?%}.pics .left uni-view[data-v-c239a2f8]{margin:%?10?% 0;margin-right:%?20?%;height:40px;line-height:40px;color:#333;text-align:center;font-size:%?30?%;border:%?1?% solid #eee;border-radius:%?20?%;box-shadow:inset %?-10?% %?-10?% %?10?% #cfd6dc,inset %?10?% %?10?% %?10?% #fff}.pics .left .active[data-v-c239a2f8]{background-color:#ff7a5e;color:#fff}.pics .right[data-v-c239a2f8]{width:%?550?%;height:%?1200?%}.pics .right .item[data-v-c239a2f8]{padding:%?20?%;border-radius:%?50?%;border-radius:%?20?%;box-shadow:inset %?-20?% %?-20?% %?30?% #cfd6dc,inset %?20?% %?20?% %?30?% #fff}.pics .right .item uni-image[data-v-c239a2f8]{border-radius:%?30?%;width:%?500?%}body.?%PAGE?%[data-v-c239a2f8]{background-color:#e6eef4}',""]),t.exports=e},"1eda":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{tabs:[],selectIndex:1,goodsList:[],scrollTop:0,old:{scrollTop:0}}},onLoad:function(){this.getTabs(),this.getTabGoods()},methods:{select:function(t,e){this.selectIndex=e.id,this.getTabGoods(),console.log(this.$refs.goodsScroll)},getTabs:function(){var t=this;this.$request("getTabs").then((function(e){t.tabs=e}))},getTabGoods:function(){var t=this;this.$request("getTabGoods",{id:this.selectIndex}).then((function(e){t.goodsList=e,console.log(t.goodsList)}))},previewImg:function(t){var e=[];e.push(t.goods_img),uni.previewImage({urls:e,current:t.goods_img})}}};e.default=n},5711:function(t,e,i){"use strict";var n,r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"pics"},[i("v-uni-scroll-view",{staticClass:"left",attrs:{"show-scrollbar":"true","scroll-y":!0}},t._l(t.tabs,(function(e,n){return i("v-uni-view",{key:n,class:{active:t.selectIndex==e.id},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.select(i,e)}}},[t._v(t._s(e.tab_name))])})),1),t.goodsList.length>0?i("v-uni-scroll-view",{staticClass:"right",attrs:{"scroll-top":t.scrollTop,"scroll-y":"true"}},[i("v-uni-text",{attrs:{id:"scrollTp"}}),t._l(t.goodsList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"item"},[i("v-uni-image",{attrs:{src:e.goods_img,mode:"scaleToFill"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.previewImg(e)}}}),i("v-uni-view",{staticStyle:{margin:"20rpx  0 20rpx 20rpx"}},[i("v-uni-text",{staticStyle:{"font-size":"50rpx",color:"#FF7A5E"}},[t._v(t._s(e.goods_newPrice))])],1),i("v-uni-view",[i("v-uni-text",{staticStyle:{"font-size":"40rpx"}},[t._v(t._s(e.goods_name))])],1)],1)}))],2):i("v-uni-view",[i("v-uni-view",{staticStyle:{display:"flex","justify-content":"center"}},[i("v-uni-text",{staticStyle:{"font-size":"50rpx"}},[t._v("数据加载中....")])],1)],1)],1)},s=[];i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}))},"5dff":function(t,e,i){"use strict";i.r(e);var n=i("5711"),r=i("f8f4");for(var s in r)"default"!==s&&function(t){i.d(e,t,(function(){return r[t]}))}(s);i("ce4b");var o,a=i("f0c5"),c=Object(a["a"])(r["default"],n["b"],n["c"],!1,null,"c239a2f8",null,!1,n["a"],o);e["default"]=c.exports},ce4b:function(t,e,i){"use strict";var n=i("ff5b"),r=i.n(n);r.a},f8f4:function(t,e,i){"use strict";i.r(e);var n=i("1eda"),r=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=r.a},ff5b:function(t,e,i){var n=i("1013");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=i("4f06").default;r("78bc207b",n,!0,{sourceMap:!1,shadowMode:!1})}}]);