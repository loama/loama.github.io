require=(function e(b,g,d){function c(k,i){if(!g[k]){if(!b[k]){var h=typeof require=="function"&&require;
if(!i&&h){return h(k,!0)}if(a){return a(k,!0)}throw new Error("Cannot find module '"+k+"'")
}var j=g[k]={exports:{}};b[k][0].call(j.exports,function(l){var m=b[k][1][l];return c(m?m:l)
},j,j.exports,e,b,g,d)}return g[k].exports}var a=typeof require=="function"&&require;
for(var f=0;f<d.length;f++){c(d[f])}return c})({1:[function(d,g,a){var h="ac-storage-";
var c=d("./ac-storage/Item");var i=d("./ac-storage/Storage");var b=d("./ac-storage/Storage/storageAvailable");
var f=new i(h);f.Item=c;f.storageAvailable=b;g.exports=f},{"./ac-storage/Item":2,"./ac-storage/Storage":9,"./ac-storage/Storage/storageAvailable":11}],2:[function(d,b,j){var a=d("ac-base").adler32;
var i=d("ac-base").Object;var k=d("./Item/apis");var c=d("./Item/createExpirationDate");
var l=d("./Item/encoder");var h=1000*60*60*24;var g=30;function f(m){if(!m||typeof m!=="string"){throw"ac-storage/Item: Key for Item must be a string"
}this._key=m;this._checksum=null;this._expirationDate=null;this._metadata=null;
this._value=null;i.synthesize(this);this.setExpirationDate(f.createExpirationDate(g))
}f.prototype={save:function(){var o;var n;var p;var m={};o=k.best(m);if(o){if(this.value()===null&&typeof o.removeItem==="function"){return o.removeItem(this.key())
}else{if(typeof o.setItem==="function"){n=this.__state();p=l.encode(n);return o.setItem(this.key(),p,this.expirationDate())
}}}return false},load:function(){var m;var n;m=k.best();if(m&&typeof m.getItem==="function"){n=m.getItem(this.key());
this.__updateState(l.decode(n));if(n===null||this.hasExpired()){this.remove();return false
}else{return true}}else{return false}},remove:function(){var m;this.__updateState(null);
m=k.best();return m.removeItem(this.key())},hasExpired:function(m){if(((this.expirationDate()!==false)&&(this.expirationDate()<=Date.now()))||!this.__checksumIsValid(m)){return true
}return false},value:function(m){if(this.hasExpired(m)){this.remove()}return this._value
},setChecksum:function(m){if(m===null){this._checksum=m}else{if(typeof m==="string"&&m!==""){this._checksum=a(m)
}else{throw"ac-storage/Item#setChecksum: Checksum must be null or a string"}}},setExpirationDate:function(m){if(m===null){m=f.createExpirationDate(g)
}if(m!==false){if(typeof m==="string"){m=new Date(m).getTime()}if(m&&typeof m.getTime==="function"){m=m.getTime()
}if(!m||isNaN(m)){throw"ac-storage/Item: Invalid date object provided as expirationDate"
}m-=m%h;if(m<=Date.now()){m=false}}this._expirationDate=m},__state:function(){var m={};
m.checksum=this.checksum();m.expirationDate=this.expirationDate();m.metadata=this.metadata();
m.value=this.value();return m},__updateState:function(m){var o;var n;if(m===null){m={checksum:null,expirationDate:null,metadata:null,value:null}
}for(o in m){n="set"+o.charAt(0).toUpperCase()+o.slice(1);if(typeof this[n]==="function"){this[n](m[o])
}}},__checksumIsValid:function(m){if(m){m=a(m);if(!this.checksum()){throw"ac-storage/Item: No checksum exists to determine if this Item’s value is valid. Try loading context from persistent storage first."
}else{if(m===this.checksum()){return true}}return false}else{if(this.checksum()){throw"ac-storage/Item: No checksum passed, but checksum exists in Item’s state."
}}return true},setKey:function(){throw"ac-storage/Item: Cannot set key after synthesizing"
}};f.createExpirationDate=c;b.exports=f},{"./Item/apis":3,"./Item/createExpirationDate":6,"./Item/encoder":7,"ac-base":false}],3:[function(d,g,b){var h=d("ac-base").log;
var c=d("./apis/localStorage");var a=d("./apis/userData");var f={_list:[c,a],list:function(){return this._list
},all:function(k){h("ac-storage/Item/apis.all: Method is deprecated");var i=Array.prototype.slice.call(arguments,1);
if(typeof k!=="string"){throw"ac-storage/Item/apis.all: Method name must be provided as a string"
}var j=this.list().map(function(l){if(l.available()){if(typeof l[k]==="function"){return l[k].apply(l,i)
}else{throw"ac-storage/Item/apis.all: Method not available on api"}}return false
});return j},best:function(){var i=null;this.list().some(function(j){if(j.available()){i=j;
return true}});return i}};g.exports=f},{"./apis/localStorage":4,"./apis/userData":5,"ac-base":false}],4:[function(d,f,b){var a=d("ac-base").Environment.Feature;
var g=window.localStorage;var i=window.sessionStorage;var h;var c={name:"localStorage",available:function(){if(h===undefined){h=a.localStorageAvailable()
}return h},getItem:function(j){return g.getItem(j)||i.getItem(j)},setItem:function(k,l,j){if(j===false){i.setItem(k,l)
}else{g.setItem(k,l)}return true},removeItem:function(j){g.removeItem(j);i.removeItem(j);
return true}};f.exports=c},{"ac-base":false}],5:[function(d,f,c){var g=d("ac-base").Element;
var i=1000*60*60*24;var a="ac-storage";var h;var b={name:"userData",available:function(){if(h===undefined){h=false;
if(document&&document.body){var j=this.element();if(g.isElement(j)&&j.addBehavior!==undefined){h=true
}if(h===false){this.removeElement()}}else{throw"ac-storage/Item/apis/userData: DOM must be ready before using #userData."
}}return h},getItem:function(j){var k=this.element();k.load(a);return k.getAttribute(j)||null
},setItem:function(k,m,j){var l=this.element();l.setAttribute(k,m);if(j===false){j=new Date(Date.now()+i)
}if(j&&typeof j.toUTCString==="function"){l.expires=j.toUTCString()}l.save(a);return true
},removeItem:function(j){var k=this.element();k.removeAttribute(j);k.save(a);return true
},_element:null,element:function(){if(this._element===null){this._element=document.createElement("meta");
this._element.setAttribute("id","userData");this._element.setAttribute("name","ac-storage");
this._element.style.behavior="url('#default#userData')";document.getElementsByTagName("head")[0].appendChild(this._element)
}return this._element},removeElement:function(){if(this._element!==null){g.remove(this._element)
}return this._element}};f.exports=b},{"ac-base":false}],6:[function(b,c,a){var f=1000*60*60*24;
var d=function(h,g){if(typeof h!=="number"){throw"ac-storage/Item/createExpirationDate: days parameter must be a number."
}if(g===undefined||typeof g==="number"){g=g===undefined?new Date():new Date(g)}if(typeof g.toUTCString!=="function"||g.toUTCString()==="Invalid Date"){throw"ac-storage/Item/createExpirationDate: fromDate must be a date object, timestamp, or undefined."
}g.setTime(g.getTime()+(h*f));return g.getTime()};c.exports=d},{}],7:[function(b,c,a){var f=b("./encoder/compressor");
var d={encode:function(i){var g;var h;h=f.compress(i);try{g=JSON.stringify(h)}catch(j){}if(!this.__isValidStateObjString(g)){throw"ac-storage/Item/encoder/encode: state object is invalid or cannot be saved as string"
}return g},decode:function(g){var h;var i;if(!this.__isValidStateObjString(g)){if(g===undefined||g===null||g===""){return null
}throw"ac-storage/Item/encoder/decode: state string does not contain a valid state object"
}try{h=JSON.parse(g)}catch(j){throw"ac-storage/Item/encoder/decode: Item state object could not be decoded"
}i=f.decompress(h);return i},__isValidStateObjString:function(g){try{if(g!==undefined&&g.substring(0,1)==="{"){return true
}return false}catch(h){return false}}};c.exports=d},{"./encoder/compressor":8}],8:[function(b,c,a){var g=1000*60*60*24;
var d=14975;var f={mapping:{key:"k",checksum:"c",expirationDate:"e",metadata:"m",value:"v"},compress:function(j){var h={};
var i=f.mapping;for(var l in i){if(j.hasOwnProperty(l)&&j[l]){if(l==="expirationDate"){var k=this.millisecondsToOffsetDays(j[l]);
h[i[l]]=k}else{h[i[l]]=j[l]}}}return h},decompress:function(h){var k={};var j=f.mapping;
for(var l in j){if(h.hasOwnProperty(j[l])){if(l==="expirationDate"){var i=this.offsetDaysToMilliseconds(h[j[l]]);
k[l]=i}else{k[l]=h[j[l]]}}}return k},millisecondsToOffsetDays:function(h){return Math.floor(h/g)-d
},offsetDaysToMilliseconds:function(h){return(h+d)*g}};c.exports=f},{}],9:[function(g,h,d){var c=g("ac-base").Object;
var f=g("./Item/apis/localStorage");var b=g("./Storage/registry");var a={};function i(k,j){this._namespace=k||"";
this._options=c.extend(c.clone(a),j||{});c.synthesize(this)}i.prototype={getItem:function(j){var k=this.__item(j);
k.load();return k.value()},setItem:function(j,l){var k=this.__item(j);if(l===undefined){throw"ac-storage/Storage#setItem: Must provide value to set key to. Use #removeItem to remove."
}k.setValue(l);return k.save()},removeItem:function(j){var k=this.__item(j);b.remove(k.key(),true);
return k.save()},removeExpired:function(){var p;var n;if(f.available()){for(n=0;
n<window.localStorage.length;n++){p=this.__item(window.localStorage.key(n));if(p.hasExpired()&&JSON.parse(window.localStorage[window.localStorage.key(n)]).v!=="undefined"){p.remove()
}}}else{var l="ac-storage";var o=document.getElementById("userData");o.load(l);
var k;var q=o.xmlDocument;var m=q.firstChild.attributes;var j=m.length;n=-1;while(++n<j){k=m[n];
p=this.__item(k.nodeName);if(p.hasExpired()&&JSON.parse(k.nodeValue).v!=="undefined"){p.remove()
}}}},__item:function(j){if(typeof j!=="string"||j===""){throw"ac-storage/Storage: Key must be a String."
}var k=b.item(this.namespace()+j);return k}};h.exports=i},{"./Item/apis/localStorage":4,"./Storage/registry":10,"ac-base":false}],10:[function(f,g,c){var d=f("../Item");
var b={};var a={item:function(h){var i=b[h];if(!i){i=this.register(h)}return i},register:function(h){var i=b[h];
if(!i){i=new d(h);b[h]=i}return i},clear:function(i){var h;for(h in b){this.remove(h,i)
}return true},remove:function(h,i){var j=b[h];if(j&&!!i){j.remove()}b[h]=null;return true
}};g.exports=a},{"../Item":2}],11:[function(c,f,a){var d=c("../Item/apis");var g;
f.exports=function b(){if(g!==undefined){return g}g=!!d.best();return g}},{"../Item/apis":3}],"5NBI0F":[function(b,c,a){c.exports=b("./ac-promomanager/PromoManager")
},{"./ac-promomanager/PromoManager":14}],"ac-promomanager":[function(b,c,a){c.exports=b("5NBI0F")
},{}],14:[function(h,f,j){var c=h("ac-base").Array;var l=h("ac-base").Class;var a=h("ac-base").Element;
var i=h("ac-base").Log;var g=h("ac-base").Object;var d=h("ac-storage");var b=h("./PromoManager/History");
var m=h("./PromoManager/Promo");var k=new l({__defaultOptions:{prefixString:"pm-",appendLocale:true,rotate:false,rotateInterval:3000,rotateAnimation:true},initialize:function(p,q,o){if(d===undefined){throw"AC.PromoManager requires that AC.Storage exists on page."
}this._options=g.extend(g.clone(this.__defaultOptions),o||{});this._history=null;
this._storageName=null;this._promos=null;this._currentPromo=-1;this._delegate={};
g.synthesize(this);this.setStorageName(p);var n=this.setPromos(q);if(n.length<2){return null
}this.__weightPromos();this.__selectFirstPromo();if(this._options.rotate){window.setInterval(function(){this.selectNextPromo(this._options.rotateAnimation)
}.bind(this),this._options.rotateInterval)}k.instances.push(this)},selectPromo:function(n,o){var p=this.promos();
o=!!o;if(p[n]){if(p[this.currentPromo()]){p[this.currentPromo()].hide(o)}p[n].show(o);
this.setCurrentPromo(n);this.history().add(n)}},selectNextPromo:function(o){var n=this.currentPromo()+1;
if(n>=this.promos().length){n=0}this.selectPromo(n,o)},currentPromoElement:function(){return this.promos()[this.currentPromo()]._promo
},__selectFirstPromo:function(){var n=-1;var p=this.promos();var o=this.history().data();
p.forEach(function(q,r){if((r!==o[0])&&((n===-1)||(q.weight()>p[n].weight()))){n=r
}});this.selectPromo(n,false)},__lowestWeight:function(){var n=1;this.promos().forEach(function(o){var p=o.weight();
if(p<n){n=p}});return n},__weightPromos:function(){var p=[];var n=0;var o=0;this.promos().forEach(function(q){var r=q.weight();
if(typeof r!=="number"||r<=0){p.push(q)}else{n+=r}if(n>1){new i("Promo weighting total is > 100%.")
}});if(p.length>0){o=((1-n)/p.length);p.forEach(function(q){q.setWeight(o)})}this.__loadHistory(this.storageName());
this.__historicallyWeightPromos()},__loadHistory:function(p){var n;var q;if(!this.promos()){throw"Cannot load history until we know how many promos there are."
}n=Math.floor(1/(this.__lowestWeight()||1))-1;q=new b(p,n);var o=q.load();this.setHistory(q);
return o},__historicallyWeightPromos:function(){var p=this.promos();var o=this.history().data();
var n=(1/o.length)*-1;o.forEach(function(q){if(p[q]!==undefined){p[q].offsetWeight(n)
}})},setStorageName:function(n){if(typeof this._storageName==="string"){throw"Storage name cannot change after it is set."
}this._storageName=this.options().prefixString+n;if(this.options().appendLocale===true){this._storageName+="-"+window.document.documentElement.getAttribute("lang")
}return this._storageName},setHistory:function(n){if(n===undefined){throw"Cannot set PromoManager history to undefined."
}if(this._history!==null){throw"Cannot set PromoManager history more than once for the same Promo Slot."
}this._history=n;return this._history},setPromos:function(o){if(this._promos!==null){throw"Cannot set promos more than once for the same Promo Slot."
}var n=this;n._promos=[];o=(typeof o==="string")?a.selectAll("."+o):c.toArray(o);
if(o.length<2){return n._promos}o.forEach(function(p){n._promos.push(m.promoFromElementOrObject(p))
});return n._promos},setCurrentPromo:function(n){if(typeof n==="number"&&this.promos()[n]!==undefined){this._currentPromo=n
}return this._currentPromo}});k.instances=[];f.exports=k},{"./PromoManager/History":15,"./PromoManager/Promo":16,"ac-base":false,"ac-storage":1}],15:[function(d,f,b){var a=d("ac-base").Object;
var c=d("ac-storage");var g=function(j,h,i){this._data=[];a.synthesize(this);this.__key=j;
this.__maxLength=h||1;this.__expiration=i||30};g.prototype={add:function(h){var i=this.data();
i=[h].concat(i);this.setData(i);this.save();return this.data()},save:function(){var j=this.data();
var i=this.__key;var h=this.__expiration;if(typeof i==="string"){c.setItem(i,j,h)
}},load:function(){if(typeof this.__key==="string"){var h=c.getItem(this.__key);
if(h){return this.setData(h)}}},setData:function(h){if(Array.isArray(h)){if(h.length>this.__maxLength){h=h.slice(0,this.__maxLength)
}this._data=h}return this._data}};f.exports=g},{"ac-base":false,"ac-storage":1}],16:[function(f,c,h){var b=f("ac-base").EasingFunctions;
var a=f("ac-base").Element;var j=f("ac-base").Environment;var k=f("ac-base").Function;
var d=f("ac-base").Object;var g=f("ac-base").String;var i=function(m,n,l){if(!a.isElement(m)){throw"AC.PromoManager.Promo require Element Node as first argument."
}this._options=d.extend(d.clone(this.__defaultOptions),l||{});this._promo=m;this._weight=0;
d.synthesize(this);this.setWeight(n||0);if(this.options().hideOnInit===true){this.hide()
}};i.prototype={__defaultOptions:{hideOnInit:true,animationDuration:0.4,animationTimingFunction:"ease-out",animationZIndex:1000},offsetWeight:function(l){if(!isNaN(l)){this.setWeight(this.weight()+l)
}return this.weight()},show:function(l){if(!l){a.setStyle(this.promo(),{display:"block"})
}else{this.__animate(1)}},hide:function(l){if(!l){a.setStyle(this.promo(),{display:"none"})
}else{this.__animate(0)}},__animate:function(m){var l=this.promo();var p=a.getStyle(l,"z-index")||"auto";
var n=this.options().animationZIndex;var o=function(){a.setStyle(l,{"z-index":p});
if(m===0){a.setStyle(l,{display:"none"})}};if(m>0){a.setStyle(l,{display:"block"})
}a.setStyle(l,{"z-index":n});if(j.Feature.cssPropertyAvailable("transition")){this.__animateWithCSS(m,o)
}else{this.__animateWithJS(m,o)}},__animateWithCSS:function(m,o){var l=this.promo();
var n;a.setVendorPrefixStyle(l,"transition","opacity "+this.options().animationDuration+"s "+this.options().animationTimingFunction);
a.setStyle(l,{opacity:0});n=function(p){if(p.target===l&&p.propertyName==="opacity"){o();
a.removeVendorPrefixEventListener(l,"transitionEnd",n)}};a.addVendorPrefixEventListener(l,"transitionEnd",n)
},__animateWithJS:function(n,q){var m=this.promo();var p=g.toCamelCase(this.options().animationTimingFunction);
var o;if((p==="easeOut")||(p==="easein")||(p==="easeinOut")){p+="Quad"}o=b[p];var l=function(r){if(n===0){r=(1-r)
}if(typeof o==="function"){r=o(r,0,1,1)}a.setStyle(m,{opacity:r})};k.iterateFramesOverAnimationDuration(l,this.options().animationDuration,q)
},setWeight:function(l){if(!isNaN(l)){this._weight=l}return this._weight}};i.promoFromElementOrObject=function(l){if(a.isElement(l)){return i.promoFromElement(l)
}else{return i.promoFromObject(l)}};i.promoFromElement=function(m){if(!a.isElement(m)){throw"Promo is not an element."
}var l=new i(m);return l};i.promoFromObject=function(m){if(m===undefined||!a.isElement(m.promo)){throw"Promo object not formatted as expected."
}var l=new i(m.promo,m.weight);return l};c.exports=i},{"ac-base":false}],17:[function(b,c,a){c.exports={log:b("./ac-console/log")}
},{"./ac-console/log":18}],18:[function(d,f,b){var a="f7c9180f-5c45-47b4-8de4-428015f096c0";
var c=!!(function(){try{return window.localStorage.getItem(a)}catch(h){}}());f.exports=function g(h){if(window.console&&typeof console.log!=="undefined"&&c){console.log(h)
}}},{}],19:[function(b,d,a){var c={};c.addEventListener=function(j,h,i,g){if(j.addEventListener){j.addEventListener(h,i,g)
}else{if(j.attachEvent){j.attachEvent("on"+h,i)}else{j["on"+h]=i}}return j};c.dispatchEvent=function(h,g){if(document.createEvent){h.dispatchEvent(new CustomEvent(g))
}else{h.fireEvent("on"+g,document.createEventObject())}return h};c.removeEventListener=function(j,h,i,g){if(j.removeEventListener){j.removeEventListener(h,i,g)
}else{j.detachEvent("on"+h,i)}return j};var f=/^(webkit|moz|ms|o)/i;c.addVendorPrefixEventListener=function(j,h,i,g){if(f.test(h)){h=h.replace(f,"")
}else{h=h.charAt(0).toUpperCase()+h.slice(1)}if(/WebKit/i.test(window.navigator.userAgent)){return c.addEventListener(j,"webkit"+h,i,g)
}else{if(/Opera/i.test(window.navigator.userAgent)){return c.addEventListener(j,"O"+h,i,g)
}else{if(/Gecko/i.test(window.navigator.userAgent)){return c.addEventListener(j,h.toLowerCase(),i,g)
}else{h=h.charAt(0).toLowerCase()+h.slice(1);return c.addEventListener(j,h,i,g)
}}}};c.removeVendorPrefixEventListener=function(j,h,i,g){if(f.test(h)){h=h.replace(f,"")
}else{h=h.charAt(0).toUpperCase()+h.slice(1)}c.removeEventListener(j,"webkit"+h,i,g);
c.removeEventListener(j,"O"+h,i,g);c.removeEventListener(j,h.toLowerCase(),i,g);
h=h.charAt(0).toLowerCase()+h.slice(1);return c.removeEventListener(j,h,i,g)};c.stop=function(g){if(!g){g=window.event
}if(g.stopPropagation){g.stopPropagation()}else{g.cancelBubble=true}if(g.preventDefault){g.preventDefault()
}g.stopped=true;g.returnValue=false};c.target=function(g){return(typeof g.target!=="undefined")?g.target:g.srcElement
};d.exports=c},{}],20:[function(c,f,b){var d={cssPropertyAvailable:c("./ac-feature/cssPropertyAvailable"),localStorageAvailable:c("./ac-feature/localStorageAvailable")};
var a=Object.prototype.hasOwnProperty;d.threeDTransformsAvailable=function(){if(typeof this._threeDTransformsAvailable!=="undefined"){return this._threeDTransformsAvailable
}var i,g;try{this._threeDTransformsAvailable=false;if(a.call(window,"styleMedia")){this._threeDTransformsAvailable=window.styleMedia.matchMedium("(-webkit-transform-3d)")
}else{if(a.call(window,"media")){this._threeDTransformsAvailable=window.media.matchMedium("(-webkit-transform-3d)")
}}if(!this._threeDTransformsAvailable){if(!(g=document.getElementById("supportsThreeDStyle"))){g=document.createElement("style");
g.id="supportsThreeDStyle";g.textContent="@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }";
document.querySelector("head").appendChild(g)}if(!(i=document.querySelector("#supportsThreeD"))){i=document.createElement("div");
i.id="supportsThreeD";document.body.appendChild(i)}this._threeDTransformsAvailable=(i.offsetHeight===3)||g.style.MozTransform!==undefined||g.style.WebkitTransform!==undefined
}return this._threeDTransformsAvailable}catch(h){return false}};d.canvasAvailable=function(){if(typeof this._canvasAvailable!=="undefined"){return this._canvasAvailable
}var g=document.createElement("canvas");this._canvasAvailable=!!(typeof g.getContext==="function"&&g.getContext("2d"));
return this._canvasAvailable};d.sessionStorageAvailable=function(){if(typeof this._sessionStorageAvailable!=="undefined"){return this._sessionStorageAvailable
}try{if(typeof window.sessionStorage!=="undefined"&&typeof window.sessionStorage.setItem==="function"){window.sessionStorage.setItem("ac_browser_detect","test");
this._sessionStorageAvailable=true;window.sessionStorage.removeItem("ac_browser_detect","test")
}else{this._sessionStorageAvailable=false}}catch(g){this._sessionStorageAvailable=false
}return this._sessionStorageAvailable};d.cookiesAvailable=function(){if(typeof this._cookiesAvailable!=="undefined"){return this._cookiesAvailable
}this._cookiesAvailable=(a.call(document,"cookie")&&!!navigator.cookieEnabled)?true:false;
return this._cookiesAvailable};d.__normalizedScreenWidth=function(){if(typeof window.orientation==="undefined"){return window.screen.width
}return window.screen.width<window.screen.height?window.screen.width:window.screen.height
};d.touchAvailable=function(){return !!(("ontouchstart" in window)||window.DocumentTouch&&document instanceof window.DocumentTouch)
};d.isDesktop=function(){if(!this.touchAvailable()&&!window.orientation){return true
}return false};d.isHandheld=function(){return !this.isDesktop()&&!this.isTablet()
};d.isTablet=function(){return !this.isDesktop()&&this.__normalizedScreenWidth()>480
};d.isRetina=function(){var g=["min-device-pixel-ratio:1.5","-webkit-min-device-pixel-ratio:1.5","min-resolution:1.5dppx","min-resolution:144dpi","min--moz-device-pixel-ratio:1.5"];
var h;if(window.devicePixelRatio!==undefined){if(window.devicePixelRatio>=1.5){return true
}}else{for(h=0;h<g.length;h+=1){if(window.matchMedia("("+g[h]+")").matches===true){return true
}}}return false};d.svgAvailable=function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
};f.exports=d},{"./ac-feature/cssPropertyAvailable":21,"./ac-feature/localStorageAvailable":22}],21:[function(c,f,b){var g=null;
var h=null;var a=null;var d=null;f.exports=function(t){if(g===null){g=document.createElement("browserdetect").style
}if(h===null){h=["-webkit-","-moz-","-o-","-ms-","-khtml-",""]}if(a===null){a=["Webkit","Moz","O","ms","Khtml",""]
}if(d===null){d={}}t=t.replace(/([A-Z]+)([A-Z][a-z])/g,"$1\\-$2").replace(/([a-z\d])([A-Z])/g,"$1\\-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/,"").toLowerCase();
switch(t){case"gradient":if(d.gradient!==undefined){return d.gradient}t="background-image:";
var q="gradient(linear,left top,right bottom,from(#9f9),to(white));";var p="linear-gradient(left top,#9f9, white);";
g.cssText=(t+h.join(q+t)+h.join(p+t)).slice(0,-t.length);d.gradient=(g.backgroundImage.indexOf("gradient")!==-1);
return d.gradient;case"inset-box-shadow":if(d["inset-box-shadow"]!==undefined){return d["inset-box-shadow"]
}t="box-shadow:";var r="#fff 0 1px 1px inset;";g.cssText=h.join(t+r);d["inset-box-shadow"]=(g.cssText.indexOf("inset")!==-1);
return d["inset-box-shadow"];default:var o=t.split("-");var k=o.length;var n;var m;
var l;if(o.length>0){t=o[0];for(m=1;m<k;m+=1){t+=o[m].substr(0,1).toUpperCase()+o[m].substr(1)
}}n=t.substr(0,1).toUpperCase()+t.substr(1);if(d[t]!==undefined){return d[t]}for(l=a.length-1;
l>=0;l-=1){if(g[a[l]+t]!==undefined||g[a[l]+n]!==undefined){d[t]=true;return true
}}return false}}},{}],22:[function(d,f,b){var a=null;f.exports=function c(){if(a===null){a=!!(window.localStorage&&window.localStorage.non_existent!==null)
}return a}},{}],23:[function(i,c,y){var t=Object.prototype.toString;var l=Object.prototype.hasOwnProperty;
var b=typeof Array.prototype.indexOf==="function"?function(A,B){return A.indexOf(B)
}:function(A,C){for(var B=0;B<A.length;B++){if(A[B]===C){return B}}return -1};var k=Array.isArray||function(A){return t.call(A)=="[object Array]"
};var w=Object.keys||function(C){var A=[];for(var B in C){if(C.hasOwnProperty(B)){A.push(B)
}}return A};var v=typeof Array.prototype.forEach==="function"?function(A,B){return A.forEach(B)
}:function(A,C){for(var B=0;B<A.length;B++){C(A[B])}};var m=function(A,E,B){if(typeof A.reduce==="function"){return A.reduce(E,B)
}var D=B;for(var C=0;C<A.length;C++){D=E(D,A[C])}return D};var z=/^[0-9]+$/;function d(D,C){if(D[C].length==0){return D[C]={}
}var B={};for(var A in D[C]){if(l.call(D[C],A)){B[A]=D[C][A]}}D[C]=B;return B}function q(E,C,B,F){var A=E.shift();
if(l.call(Object.prototype,B)){return}if(!A){if(k(C[B])){C[B].push(F)}else{if("object"==typeof C[B]){C[B]=F
}else{if("undefined"==typeof C[B]){C[B]=F}else{C[B]=[C[B],F]}}}}else{var D=C[B]=C[B]||[];
if("]"==A){if(k(D)){if(""!=F){D.push(F)}}else{if("object"==typeof D){D[w(D).length]=F
}else{D=C[B]=[C[B],F]}}}else{if(~b(A,"]")){A=A.substr(0,A.length-1);if(!z.test(A)&&k(D)){D=d(C,B)
}q(E,D,A,F)}else{if(!z.test(A)&&k(D)){D=d(C,B)}q(E,D,A,F)}}}}function f(E,D,H){if(~b(D,"]")){var G=D.split("["),A=G.length,F=A-1;
q(G,E,"base",H)}else{if(!z.test(D)&&k(E.base)){var C={};for(var B in E.base){C[B]=E.base[B]
}E.base=C}n(E.base,D,H)}return E}function o(D){if("object"!=typeof D){return D}if(k(D)){var A=[];
for(var C in D){if(l.call(D,C)){A.push(D[C])}}return A}for(var B in D){D[B]=o(D[B])
}return D}function g(B){var A={base:{}};v(w(B),function(C){f(A,C,B[C])});return o(A.base)
}function h(B){var A=m(String(B).split("&"),function(C,G){var H=b(G,"="),F=u(G),D=G.substr(0,F||H),E=G.substr(F||H,G.length),E=E.substr(b(E,"=")+1,E.length);
if(""==D){D=G,E=""}if(""==D){return C}return f(C,p(D),p(E))},{base:{}}).base;return o(A)
}y.parse=function(A){if(null==A||""==A){return{}}return"object"==typeof A?g(A):h(A)
};var r=y.stringify=function(B,A){if(k(B)){return j(B,A)}else{if("[object Object]"==t.call(B)){return x(B,A)
}else{if("string"==typeof B){return a(B,A)}else{return A+"="+encodeURIComponent(String(B))
}}}};function a(B,A){if(!A){throw new TypeError("stringify expects an object")}return A+"="+encodeURIComponent(B)
}function j(A,D){var B=[];if(!D){throw new TypeError("stringify expects an object")
}for(var C=0;C<A.length;C++){B.push(r(A[C],D+"["+C+"]"))}return B.join("&")}function x(G,F){var B=[],E=w(G),D;
for(var C=0,A=E.length;C<A;++C){D=E[C];if(""==D){continue}if(null==G[D]){B.push(encodeURIComponent(D)+"=")
}else{B.push(r(G[D],F?F+"["+encodeURIComponent(D)+"]":encodeURIComponent(D)))}}return B.join("&")
}function n(C,B,D){var A=C[B];if(l.call(Object.prototype,B)){return}if(undefined===A){C[B]=D
}else{if(k(A)){A.push(D)}else{C[B]=[A,D]}}}function u(D){var A=D.length,C,E;for(var B=0;
B<A;++B){E=D[B];if("]"==E){C=false}if("["==E){C=true}if("="==E&&!C){return B}}}function p(B){try{return decodeURIComponent(B.replace(/\+/g," "))
}catch(A){return B}}},{}],24:[function(b,c,a){c.exports={clone:b("./ac-object/clone"),defaults:b("./ac-object/defaults"),extend:b("./ac-object/extend"),getPrototypeOf:b("./ac-object/getPrototypeOf"),isEmpty:b("./ac-object/isEmpty"),toQueryParameters:b("./ac-object/toQueryParameters")}
},{"./ac-object/clone":25,"./ac-object/defaults":26,"./ac-object/extend":27,"./ac-object/getPrototypeOf":28,"./ac-object/isEmpty":29,"./ac-object/toQueryParameters":30}],25:[function(b,c,a){var f=b("./extend");
c.exports=function d(g){return f({},g)}},{"./extend":27}],26:[function(b,c,a){var f=b("./extend");
c.exports=function d(h,g){if(typeof h!=="object"||typeof g!=="object"){throw new TypeError("defaults: must provide a defaults and options object")
}return f({},h,g)}},{"./extend":27}],27:[function(c,d,b){var a=Object.prototype.hasOwnProperty;
d.exports=function f(){var h;var g;if(arguments.length<2){h=[{},arguments[0]]}else{h=[].slice.call(arguments)
}g=h.shift();h.forEach(function(j){if(j!=null){for(var i in j){if(a.call(j,i)){g[i]=j[i]
}}}});return g}},{}],28:[function(c,d,b){var a=Object.prototype.hasOwnProperty;
d.exports=function f(i){if(Object.getPrototypeOf){return Object.getPrototypeOf(i)
}else{if(typeof i!=="object"){throw new Error("Requested prototype of a value that is not an object.")
}else{if(typeof this.__proto__==="object"){return i.__proto__}else{var g=i.constructor;
var h;if(a.call(i,"constructor")){h=g;if(!(delete i.constructor)){return null}g=i.constructor;
i.constructor=h}return g?g.prototype:null}}}}},{}],29:[function(c,d,b){var a=Object.prototype.hasOwnProperty;
d.exports=function f(g){var h;if(typeof g!=="object"){throw new TypeError("ac-base.Object.isEmpty : Invalid parameter - expected object")
}for(h in g){if(a.call(g,h)){return false}}return true}},{}],30:[function(c,f,b){var a=c("qs");
f.exports=function d(g){if(typeof g!=="object"){throw new TypeError("toQueryParameters error: argument is not an object")
}return a.stringify(g)}},{qs:23}],31:[function(b,c,a){c.exports={observer:{Page:b("./ac-analytics/observer/Page"),Exit:b("./ac-analytics/observer/Exit"),Link:b("./ac-analytics/observer/Link"),Click:b("./ac-analytics/observer/Click"),Section:b("./ac-analytics/observer/Section"),Audio:b("./ac-analytics/observer/Audio"),Overlay:b("./ac-analytics/observer/Overlay"),Gallery:b("./ac-analytics/observer/Gallery"),Video:b("./ac-analytics/observer/Video")},regions:b("./ac-analytics/regions/regions")}
},{"./ac-analytics/observer/Audio":40,"./ac-analytics/observer/Click":41,"./ac-analytics/observer/Exit":42,"./ac-analytics/observer/Gallery":43,"./ac-analytics/observer/Link":44,"./ac-analytics/observer/Overlay":45,"./ac-analytics/observer/Page":46,"./ac-analytics/observer/Section":47,"./ac-analytics/observer/Video":48,"./ac-analytics/regions/regions":70}],32:[function(c,d,b){var g;
var a=c("./error-handler/ErrorHandler");var i=c("./Storage");var h="analytics-queue";
function f(){this._storage=i;this._arr=[];this._length=0}g=f.prototype;g.add=function(j){if(!j){a.log("Queue","add",j+" is not a valid object")
}if(a.exception){return}this._arr.push(j);this._updateQueueSize()};g.remove=function(){if(this.size()>0){this._arr.shift();
this._updateQueueSize()}};g.clear=function(){this._arr=[];this._length=0};g.peek=function(){if(this.size()>0){return this._arr[0]
}};g.isEmpty=function(){return(this.size()===0)};g.size=function(){return this._length
};g.load=function(){var j=this._storage.getItem(h);if(j){this._arr=JSON.parse(j);
this._storage.removeItem(h);this._updateQueueSize()}};g.save=function(){this._storage.setItem(h,JSON.stringify(this._arr));
this.clear()};g.collect=function(){var j=this._arr;var l=this._storage.getItem(h);
if(l){var k=JSON.parse(l);j=k.concat(j)}this._storage.setItem(h,JSON.stringify(j));
this.clear()};g.canSave=function(){return this._storage.isStorageAvailable()};g._updateQueueSize=function(){this._length=this._arr.length
};d.exports=f},{"./Storage":33,"./error-handler/ErrorHandler":36}],33:[function(c,d,b){var g;
var h=c("ac-base").onDOMReady;var i=c("./storage/localStorage");var a=c("./storage/userData");
function f(){if(i.available()){this.api=i}else{h(this.fallback.bind(this))}}g=f.prototype;
g.fallback=function(){if(a.available()){this.api=a}};g.setItem=function(j,k){if(!this.isStorageAvailable()){return
}this.api.setItem(j,k)};g.getItem=function(j){if(!this.isStorageAvailable()){return
}return this.api.getItem(j)};g.hasItem=function(j){if(!this.isStorageAvailable()){return
}return this.api.hasItem(j)};g.removeItem=function(j){if(!this.isStorageAvailable()){return
}this.api.removeItem(j)};g.clear=function(){if(!this.isStorageAvailable()){return
}this.api.clear()};g.isStorageAvailable=function(){if(i.available()===true||a.available()===true){return true
}return false};d.exports=new f();d.exports.Storage=f},{"./storage/localStorage":71,"./storage/userData":72,"ac-base":false}],34:[function(c,b,g){var h;
var l=c("ac-deferred").Deferred;var d=c("./Queue");var f=c("./plugins/plugins");
var k=c("./translator/translator");var j=c("./error-handler/ErrorHandler");var a="Tracker";
function i(m){if(typeof f[m]==="function"){this._plugin=new f[m]()}else{j.log(a,null,'Could not create a Tracker. "'+m+'" is not a valid plugin')
}if(j.exception){return}this.paused=false;this._queue=new d();this.resume()}h=i.prototype;
h.track=function(n){var m;if(!n||typeof n!=="object"||!n.type){j.log(a,"track",n+" is not a valid request object")
}if(j.exception){return}m=k.translate(n);m=this._plugin.translate(m);this._queue.add(m);
if(this.paused===true){this._queue.collect();return}this._run()};h.isPaused=function(){return this.paused
};h.resume=function(){if(this.paused===false){return}this._queue.load();var m=this._queue.size();
if(m===0){return}this.paused=false;this._run()};h._run=function(){var o;if(this._queue.size()===0){return
}var n=this._queue.peek();var m=n.options||{};if(typeof m.async==="undefined"){m.async=true
}if(m.async===false){o=this.sync(this.send.bind(this))}else{o=this.async(this.send.bind(this))
}o.then(function(){if(this.paused===false&&this._queue.size()>0){this._run()}}.bind(this))
};h.send=function(){if(typeof this._plugin.submit!=="function"){j.log(a,"send","provided plugin does not contain a valid submit method")
}if(j.exception){return}var m=this._queue.peek();this._plugin.submit(m);this._queue.remove()
};h.pause=function(){if(this.paused===true){return}if(!this.canPause()){return}if(this._queue.size()>0){this._queue.save()
}this.paused=true};h.canPause=function(){return this._queue.canSave()};h.async=function(n){var m=new l();
if((!n)||(typeof(n)!=="function")){j.log(a,"async",'Provided callback "'+n+'" is not a function')
}if(j.exception){return}setTimeout(function(){n();m.resolve()},0);return m.promise()
};h.sync=function(n){var m=new l();if((!n)||(typeof(n)!=="function")){j.log(a,"sync",'Provided callback "'+n+'" is not a function')
}if(j.exception){return}n();m.resolve();return m.promise()};b.exports=i},{"./Queue":32,"./error-handler/ErrorHandler":36,"./plugins/plugins":49,"./translator/translator":82}],35:[function(b,c,a){(function(){function d(h){var f;
var g={};var i;if(h&&h.length>0){f=h.split(",");if(f&&f.length>0){f.forEach(function(j){i=j.split(":");
g[i[0]]=i[1]})}}return g}c.exports={dataStringToObject:d}}())},{}],36:[function(d,f,c){var g;
var a=d("ac-console");var h="Analytics";function b(){this.exception=false;this.errors=[]
}g=b.prototype;g.log=function(j,i,l){var k=this._formatMessage(j,i,l);this.exception=true;
this.errors.push({instance:j,method:i,message:k});a.log(k)};g.report=function(j){var i="";
if(typeof j==="number"&&this.errors[j]){i=this.errors[j].message;a.log(this.errors[j].message)
}else{this.errors.forEach(function(k){i+=k.message+"\r\n"});a.log(i)}return i};
g._formatMessage=function(m,l,n){var k;var j="";var o=" : ";var i;if(!!m||!!l){i=(m&&l)?".":"";
j=(m||"")+i+(l||"")+o}return h+o+j+n};f.exports=new b()},{"ac-console":17}],37:[function(b,c,a){c.exports=b(36)
},{"ac-console":17}],38:[function(b,c,a){(function(){var k=b("ac-base").Array;var m=b("./error-handler/ErrorHandler");
var j=document.getElementsByTagName("head")[0];var l=k.toArray(j.getElementsByTagName("meta"));
var t="analytics";var n="^"+t+"-";var u=new RegExp(n);var v;var w=Date.now();var r="metadata";
function q(y){var x=o(y.track);if(!Array.isArray(x)||x.length===0){m.log(r,"_getProductname",'"track" meta tag value is malformed. e.g. "product name - page name"')
}if(m.exception){return}return x[0].trim()}function h(y){var x=o(y.track);if(!x||x.length<2){m.log(r,"_getPageName",'"track" meta tag value is malformed. e.g. "product name - page name"')
}if(m.exception){return}return x[0]+"-"+x[1]}function f(){var x=document.documentElement.lang;
if(!x){m.log(r,"_getLocale","html lang attribute can not be empty")}if(m.exception){return
}return x}function d(x){x=g(x);var y={};x.forEach(function(z){var A=p(z.getAttribute("property"));
var B=z.getAttribute("content");y[A]=B});return y}function g(y){var x=y.filter(function(z){var A=z.getAttribute("property");
return u.test(A)});return x}function p(y){var x=y.replace(t+"-","");return x.replace(/-+(.)?/g,function(z,A){return A?A.toUpperCase():""
})}function i(x){x.pageName=x.pageName||h(x);x.productName=x.productName||q(x);
x.locale=x.locale||f();x.initialTimeStamp=w;return x}function o(y,x){x=x||"-";if(typeof y!=="string"){m.log(r,"_strToArray",y+" is not a valid string")
}if(m.exception){return}return y.split(x)}v=d(l);c.exports=i(v)}())},{"./error-handler/ErrorHandler":36,"ac-base":false}],39:[function(b,d,a){var c=b("./Tracker");
d.exports=new c("sCode");d.exports.Tracker=c},{"./Tracker":34}],40:[function(d,c,h){var i;
var g=d("ac-object");var k=d("ac-base").Element;var b=d("ac-dom-events");var m=d("../metricsTracker");
var j=d("../error-handler/ErrorHandler");var f={mediaEvents:["play","pause","ended"]};
var a="AudioAnalyticsObserver";function l(o,n){if(!o){j.log(a,null,o+" is not a valid audio object")
}f.mediaEventCallbacks={ended:this._onEnded.bind(this)};this.options=g.defaults(f,n||{});
if(!Array.isArray(this.options.mediaEvents)){j.log(a,null,this.options.mediaEvents+" is not a valid media events array")
}if(j.exception){return}this.audio=o;this.tracker=m;this.defaultTracking=this.track.bind(this);
this.attachEvents()}i=l.prototype;i.attachEvents=function(){var o=this.options;
var n;var p;o.mediaEvents.forEach(function(q){n=o.mediaEventCallbacks[q];p=(typeof n==="function")?n:this.defaultTracking;
this.addListener(q,p)}.bind(this))};i.detachEvents=function(){var o=this.options;
var n;var p;o.mediaEvents.forEach(function(q){n=o.mediaEventCallbacks[q];p=(typeof n==="function")?n:this.defaultTracking;
this.removeListener(q,p)}.bind(this))};i.addListener=function(n,o){k.addEventListener(this.audio,n,o)
};i.removeListener=function(n,o){k.removeEventListener(this.audio,n,o)};i._onEnded=function(n){this.ended=true;
this.track(n)};i.track=function(o){var n={};n.ended=this.ended;this.tracker.track({type:"audio",event:o,data:n,options:this.options})
};c.exports=l},{"../error-handler/ErrorHandler":36,"../metricsTracker":39,"ac-base":false,"ac-dom-events":19,"ac-object":24}],41:[function(c,a,g){var h;
var k=c("ac-base").onDOMReady;var j=c("ac-base").Element;var f=c("ac-object");var l=c("../metricsTracker");
var i=c("../error-handler/ErrorHandler");var d={dataAttribute:"analytics-click"};
function b(m){if(i.exception){return}this.options=f.defaults(d,m||{});this.tracker=l;
k(this.addListener.bind(this))}h=b.prototype;h.addListener=function(){var m=j.selectAll("*[data-"+this.options.dataAttribute+"]");
m.forEach(function(o,n){j.addEventListener(o,"mouseup",this._track.bind(this))}.bind(this))
};h.removeListener=function(){var m=j.selectAll("*[data-"+this.options.dataAttribute+"]");
m.forEach(function(o,n){j.removeEventListener(o,"mouseup",this._track.bind(this))
}.bind(this))};h._track=function(o){var m={};var p=(o.currentTarget)?o.currentTarget:o.srcElement;
if(!p.getAttribute("data-"+this.options.dataAttribute)){var n=j.ancestor(p,"[data-"+this.options.dataAttribute+"]");
if(j.isElement(n)){p=n}}m.targetEl=p;this.tracker.track({type:"click",event:o,data:m,options:this.options})
};a.exports=b},{"../error-handler/ErrorHandler":36,"../metricsTracker":39,"ac-base":false,"ac-object":24}],42:[function(b,a,f){var g;
var d=b("ac-object");var h=b("ac-base").Element;var k=b("../metricsTracker");var i=b("../error-handler/ErrorHandler");
var c={async:false};function j(l){if(i.exception){return}this.options=d.defaults(c,l||{});
this.tracker=k;this.addExitListener()}g=j.prototype;g.addExitListener=function(){if("onbeforeunload" in window){h.addEventListener(window,"beforeunload",this._onBeforeUnload.bind(this))
}};g._onBeforeUnload=function(m){var l={};l.exitTimeStamp=m.timeStamp;this.tracker.track({type:"exit",event:m,data:l,options:this.options})
};a.exports=j},{"../error-handler/ErrorHandler":36,"../metricsTracker":39,"ac-base":false,"ac-object":24}],43:[function(d,c,h){var i;
var g=d("ac-object");var b=d("ac-dom-events");var k=d("ac-base").Element;var n=d("../metricsTracker");
var l=d("../metadata");var j=d("../error-handler/ErrorHandler");var f={trackAutoRotate:false};
var a="GalleryAnalyticsObserver";function m(o,p){if(!o||typeof o!=="object"){j.log(a,null,o+" is not an object")
}if(j.exception){return}this.options=g.defaults(f,p||{});this.gallery=o;this.tracker=n;
this.previousInteractionType="auto";this.trackedInteractionTypes=[];this.incomingSlideTimestamp=l.initialTimeStamp;
this.addListener()}i=m.prototype;i.addListener=function(){this.gallery.on("didShow",this._track.bind(this))
};i.removeListener=function(){this.gallery.off("didShow",this._track.bind(this))
};i._track=function(p){if(this.options.trackAutoRotate===false){if(!p.interactionEvent||p.interactionEvent.gallery&&p.interactionEvent.gallery===this.gallery){return false
}}var o=g.clone(p);if(!this.options.galleryName){if(this.gallery.options.engagementElement&&this.gallery.options.engagementElement.id){this.options.galleryName=this.gallery.options.engagementElement.id
}}this.outgoingSlideTimestamp=this.incomingSlideTimestamp;this.incomingSlideTimestamp=Date.now();
o.incomingSlideTimestamp=this.incomingSlideTimestamp;o.outgoingSlideTimestamp=this.outgoingSlideTimestamp;
this.tracker.track({type:"gallery",data:o,observer:this,options:this.options})};
c.exports=m},{"../error-handler/ErrorHandler":36,"../metadata":38,"../metricsTracker":39,"ac-base":false,"ac-dom-events":19,"ac-object":24}],44:[function(c,b,h){var l=c("ac-base").onDOMReady;
var k=c("ac-base").Element;var g=c("ac-object");var a=c("ac-dom-events");var m=c("../metricsTracker");
var j=c("../error-handler/ErrorHandler");var i;var f={dataAttribute:"analytics-click",silent:true};
function d(n){if(j.exception){return}this.options=g.defaults(f,n||{});this.tracker=m;
l(this.addListener.bind(this))}i=d.prototype;i.addListener=function(){k.addEventListener(document.body,"mouseup",this._track.bind(this))
};i.removeListener=function(){k.removeEventListener(document.body,"mouseup",this._track.bind(this))
};i._track=function(q){var p={};var r;var n;var o=a.target(q);if(o.nodeName.toLowerCase()==="a"&&!o.getAttribute("data-"+this.options.dataAttribute)){r=o
}if(!r){n=k.ancestor(o,"a");if(n&&!n.getAttribute("data-"+this.options.dataAttribute)){r=n
}}if(r){p.targetEl=r;this.tracker.track({type:"link",event:q,data:p,options:this.options})
}};b.exports=d},{"../error-handler/ErrorHandler":36,"../metricsTracker":39,"ac-base":false,"ac-dom-events":19,"ac-object":24}],45:[function(c,b,g){var h;
var d=c("ac-object");var k=c("../metricsTracker");var i=c("../error-handler/ErrorHandler");
var f={interactionEvents:["open","close","reopen"]};var a="OverlayAnalyticsObserver";
function j(m,l){if(!m||typeof m!=="object"||typeof m.on!=="function"||typeof m.off!=="function"){i.log(a,null,m+" is not an object")
}f.interactionEventCallbacks={open:this._onOpen.bind(this),close:this._onClose.bind(this),reopen:this._onReopen.bind(this)};
this.options=d.defaults(f,l||{});if(!Array.isArray(this.options.interactionEvents)){i.log(a,null,this.options.interactionEvents+" is not a valid interaction events array")
}if(i.exception){return}this.overlay=m;this.tracker=k;this.active=false;this.defaultTracking=this.track.bind(this);
this.attachEvents()}h=j.prototype;h.attachEvents=function(){var m=this.options;
var l;var n;m.interactionEvents.forEach(function(o){l=m.interactionEventCallbacks[o];
n=(typeof l==="function")?l:this.defaultTracking;this.addListener(o,n)}.bind(this))
};h.detachEvents=function(){var m=this.options;var l;var n;m.interactionEvents.forEach(function(o){l=m.interactionEventCallbacks[o];
n=(typeof l==="function")?l:this.defaultTracking;this.removeListener(o,n)}.bind(this))
};h.addListener=function(l,m){this.overlay.on(l,m)};h.removeListener=function(l,m){this.overlay.off(l,m)
};h._onOpen=function(l){this.active=true;this.track(l)};h._onReopen=function(l){this.active=true;
this.track(l)};h._onClose=function(l){this.active=false;this.track(l)};h.track=function(m){var l=this.options.data||{};
l.active=this.active;this.tracker.track({type:"overlay",event:m,data:l,options:this.options})
};b.exports=j},{"../error-handler/ErrorHandler":36,"../metricsTracker":39,"ac-object":24}],46:[function(c,b,g){var h;
var j=c("ac-base").onDOMReady;var f=c("ac-object");var k=c("../metricsTracker");
var i=c("../error-handler/ErrorHandler");var d={};function a(l){if(i.exception){return
}this.options=f.defaults(d,l||{});this.tracker=k;this.data=this.options.data||{};
j(this._track.bind(this))}h=a.prototype;h._track=function(m){var l=this.options.data||{};
this.tracker.track({type:"page",event:m,data:l,options:this.options})};b.exports=a
},{"../error-handler/ErrorHandler":36,"../metricsTracker":39,"ac-base":false,"ac-object":24}],47:[function(c,b,g){var h;
var l=c("ac-base").onDOMReady;var f=c("ac-object");var j=c("ac-base").Element;var a=c("ac-element-engagement").ElementEngagement;
var m=c("../metricsTracker");var i=c("../error-handler/ErrorHandler");var d={dataAttribute:"analytics-section-engagement",autoSelect:false};
function k(n){if(i.exception){return}this.options=f.defaults(d,n||{});this.tracker=m;
l(this._onDOMReady.bind(this))}h=k.prototype;h._onDOMReady=function(){this.sections=j.selectAll("*[data-"+this.options.dataAttribute+"]");
if(this.sections.length>0){this._setPosition();this.options.elements=this.sections;
this._elementEngagement=new a(this.options);this._bindEvents();this._elementEngagement.start()
}};h._setPosition=function(){var n=this.sections.length;for(var o=0;o<n;o++){this.sections[o].position=o+1
}};h._bindEvents=function(){this._elementEngagement.on("thresholdenter",this._onThresholdenter.bind(this));
this._elementEngagement.on("thresholdexit",this._onThresholdexit.bind(this));this._elementEngagement.on("engaged",this._onEngaged.bind(this))
};h._onThresholdenter=function(n){return n};h._onThresholdexit=function(n){return n
};h._onEngaged=function(n){var o={element:n};this._track(o)};h._track=function(n){this.tracker.track({type:"section",data:n,options:this.options})
};b.exports=k},{"../error-handler/ErrorHandler":36,"../metricsTracker":39,"ac-base":false,"ac-element-engagement":119,"ac-object":24}],48:[function(c,b,g){var h;
var d=c("ac-object");var i=c("../error-handler/ErrorHandler");var j=c("../metricsTracker");
var f={mediaEvents:["play","ended"],mediaEventPrefix:"acv-"};var a="VideoAnalyticsObserver";
function k(m,l){if(!m||typeof m!=="object"){i.log(a,null,m+" is not an object")
}f.mediaEventCallbacks={play:this._onPlay.bind(this,"play"),ended:this._onEnded.bind(this,"ended")};
this.options=d.defaults(f,l||{});if(!Array.isArray(this.options.mediaEvents)){i.log(a,null,this.options.mediaEvents+" is not a valid media events array")
}if(i.exception){return}this.tracker=j;this.video=m;this.attachEvents()}h=k.prototype;
h.attachEvents=function(){var m=this.options;var l;var o;var n;m.mediaEvents.forEach(function(p){l=m.mediaEventCallbacks[p];
n="_boundMediaEventCallback_"+p;this[n]=(typeof l==="function")?l:this._defaultTracking.bind(this,p);
this.addListener(m.mediaEventPrefix+p,this[n])}.bind(this))};h.detachEvents=function(){var m=this.options;
var l;var o;var n;m.mediaEvents.forEach(function(p){n="_boundMediaEventCallback_"+p;
this.removeListener(m.mediaEventPrefix+p,this[n])}.bind(this))};h._onPlay=function(l,n){var m=this._bundleTrackingData(l,n);
this.playCount=(typeof this.playCount!=="undefined")?this.playCount+=1:0;m.playCount=this.playCount;
this.track(m)};h._onEnded=function(l,n){var m=this._bundleTrackingData(l,n);this.ended=true;
this.track(m)};h.addListener=function(l,m){this.video.on(l,m)};h.removeListener=function(l,m){this.video.off(l,m)
};h._getCommonVideoData=function(){var l={};l.targetEl=this.video.element;l.videoId=this.video.targetId;
l.ended=this.ended;return l};h._bundleTrackingData=function(m,n){var l=this._getCommonVideoData();
l.eventType=m;return d.extend(d.clone(n),l)};h._defaultTracking=function(l,n){var m=this._bundleTrackingData(l,n);
this.track(m)};h.track=function(l){this.tracker.track({type:"video",data:l,options:this.options})
};b.exports=k},{"../error-handler/ErrorHandler":36,"../metricsTracker":39,"ac-object":24}],49:[function(b,c,a){c.exports={sCode:b("./s-code/sCode")}
},{"./s-code/sCode":54}],50:[function(b,c,a){(function(){var f=b("ac-base").Element;
function d(h){if(f.isElement(h)&&h.href){var g=h.getAttribute("href");if(g.charAt(0)==="#"||g.indexOf("javascript:")>-1){return true
}}return false}c.exports={isIntraPageLink:d}}())},{"ac-base":false}],51:[function(b,c,a){(function(){var l=b("../../../error-handler/ErrorHandler");
var f="sCodePluginFormatter";function r(v){return v.toLowerCase()}function m(y,v){var x="www.";
var w={"fr-ca":"ca.fr"};x+=w[v]?w[v]:k(v);return x+"."+y}function u(x){var v="";
if(typeof x==="string"){var w=x.split("-");if(w&&w[2]){v=n(w[2]," ","")}}return v.toLowerCase()
}function p(x,v){var y="";var w={"fr-ca":"ca-fr"};var z=w[v];x=x||"";if(typeof v==="string"){v=v.toLowerCase();
y=z?w[v]:k(v);y=q(y)}return x.toLowerCase()+y}function o(v,w){v=v||"";w=w||"";return !!v?(v+"@"+w):w
}function t(w){var y;var v={"fr-ca":"ca/fr","en-419":"lae","en-ap":"asia"};var x=["fr-be","nl-be","fr-ch","de-ch"];
if(v[w]){y=v[w]}else{if(x.indexOf(w)>=0){y=w.split("-").reverse().join("-")}else{y=j(w)
}}return y}function k(w){var v;var x={"fr-be":"bf","nl-be":"bl","fr-ch":"cr","de-ch":"ce","en-419":"la","en-gb":"uk"};
if(x[w]){v=x[w]}else{v=j(w)}return v}function d(x){var w={};if(typeof(x)==="object"){for(var v in x){w[v]=i(x[v])
}}return w}function n(y,x,v){var w=y;x=(typeof x==="string")?x:"";v=(typeof v==="string")?v:"";
if(typeof w==="string"){w=w.replace(new RegExp(x,"g"),v)}return w}function j(v){if(!v){l.log(f,"_getCountryCodeFromLocale","locale should be a valid string")
}if(l.exception){return}var w=v.split("-");var x;if(w.length>1){x=w[1].toLowerCase()
}return x}function q(v){if(!v){l.log(f,"_decorateCountryCode","countryCode should be a valid string")
}if(l.exception){return}return" ("+v.toLowerCase()+")"}var h=/[\ì\î\ë\í]/g;function i(v){if(typeof v==="string"){v=v.replace(h,"")
}return v}function g(v){if(typeof v==="string"){v=v.toLowerCase()}return v}c.exports={productName:r,channel:m,pageName:p,eventString:o,countryCodeFilter:t,legacyCountryCode:k,cleanProps:d,stringReplacer:n,friendlyProductName:u,lowerCaseString:g}
}())},{"../../../error-handler/ErrorHandler":36}],52:[function(b,c,a){(function(){var k=b("../../../error-handler/ErrorHandler");
var h=b("./../../../metadata");var m={channel:"sChannel",campaign:"sCampaign",bucket:"sBucket",bucketProduct:"sBucketProduct"};
var d="sCodePluginMetadataHelper";function l(){var n=h[m.channel];if(!n){k.log(d,"channel","analytics-s-channel metadata tag must exist")
}if(k.exception){return}n=n.toLowerCase().split(" ").join(".");return n}function g(o){var n=m.bucket+o;
if(!h[n]){k.log(d,"bucket","analytics-s-bucket-"+o+" metadata tag must exist")}if(k.exception){return
}return h[n]}function j(n){var p=m.bucketProduct+n;var o=h[p];return o}function i(){return h[m.campaign]||""
}function f(){var q="other";var p=navigator.userAgent;var o={"mobile other":"/(kindle|silk-accelerated|android|webos|rim tablet os|windows phone)/i",windows:/windows/i,"iphone/ipod touch":/(iphone|ipod)/i,ipad:/(ipad)/i,Mac:/Mac OS X/i};
for(var n in o){if(p.match(o[n])){q=n;break}}return q}c.exports={channel:l,bucket:g,bucketProduct:j,platform:f,campaign:i}
}())},{"../../../error-handler/ErrorHandler":36,"./../../../metadata":38}],53:[function(b,c,a){(function(){var d=b("./formatter");
function g(h){return[{name:"{PAGE_NAME}",value:h.pageName},{name:"{CHANNEL}",value:h.channel},{name:"{CAMPAIGN}",value:h.campaign},{name:"{COUNTRY_CODE}",value:h.legacyCountryCode},{name:"{COUNTRY_CODE_FILTER}",value:h.countryCodeFilter},{name:"{PRODUCT_NAME}",value:h.productName},{name:"{FRIENDLY_PRODUCT_NAME}",value:h.friendlyProductName},{name:"{PLATFORM}",value:h.platform}]
}function f(i,h){if(typeof i==="string"){h.forEach(function(j){if(i.indexOf(j.name)>-1){i=d.stringReplacer(i,j.name,j.value)
}})}return i}c.exports={set:g,translate:f}}())},{"./formatter":51}],54:[function(f,c,h){var l;
var m=f("../../error-handler/errorHandler");var g=f("ac-object");var d=f("../../metadata");
var p=f("./helpers/formatter");var o=f("./helpers/metadata");var n=f("./translator/translator");
var b=f("./submit-methods/submitMethods");var j=f("./helpers/templateVar");var i=["us","au|ca|cn|de|es|fr|it|jp|uk","ap|at|bf|bl|br|ce|cr|dk|fi|hk|ie|in|kr|la|mx|nl|no|nz|pl|pt|ru|se|sg|th|tw|za"];
var a="SCodePlugin";function k(){if(m.exception){return}this.setPageMetadata(d);
this.setFormattedValues();this.setTemplateVars();this.exportGlobalMethods()}l=k.prototype;
l.exportGlobalMethods=function(){var q=this.getBucket();if(typeof(window.Analytics)!=="object"){window.Analytics={}
}window.Analytics.getsAccount=function(){return q}.bind(this);window.Analytics.getsChannel=function(){return this.formattedValues.channel
}.bind(this);window.Analytics.getsPageName=function(){return this.formattedValues.pageName
}.bind(this);window.Analytics.setLinkInternalFilters=function(){return this.setLinkInternalFilters()
}.bind(this)};l.setPageMetadata=function(q){this.pageMetadata=g.clone(q);this.pageMetadata.platform=o.platform();
this.pageMetadata.channel=o.channel();this.pageMetadata.campaign=o.campaign();this.pageMetadata.pageName=p.lowerCaseString(this.pageMetadata.pageName);
this.pageMetadata.locale=p.lowerCaseString(this.pageMetadata.locale)};l.setFormattedValues=function(){this.formattedValues={pageName:p.pageName(this.pageMetadata.pageName,this.pageMetadata.locale),channel:p.channel(this.pageMetadata.channel,this.pageMetadata.locale),productName:p.productName(this.pageMetadata.productName),friendlyProductName:p.friendlyProductName(this.pageMetadata.track),countryCodeFilter:p.countryCodeFilter(this.pageMetadata.locale),legacyCountryCode:p.legacyCountryCode(this.pageMetadata.locale),campaign:this.pageMetadata.campaign,platform:this.pageMetadata.platform}
};l.setTemplateVars=function(){this.templateVarArr=j.set(this.formattedValues)};
l.clearProps=function(){if(window.s){s.prop4=s.g_prop4=s.prop6=s.g_prop6=s.pageURL=s.g_pageURL=s.g_channel=""
}};l.translate=function(q){if(!q||typeof q!=="object"){m.log(a,"translate","Request param ("+q+") is not an object")
}if(m.exception){return}q=n.translate(q,this.formattedValues,this.pageMetadata);
return q};l.submit=function(r){var q;if(!r||typeof r!=="object"){m.log(a,"submit","Request param ("+r+") is not an object")
}if(m.exception){return}if(!r.type||typeof r.type!=="string"){m.log(a,"submit",'property "type" ('+r.type+'") must be a string')
}if(!window.s||typeof window.s!=="object"){m.log(a,"submit","sCode ("+window.s+") is not an object")
}if(m.exception){return}q=r.options||{};this._setSCodeProps(r);if(q.silent!==true){if(r.submitMethod&&b[r.submitMethod]){b[r.submitMethod](r,this.formattedValues)
}}};l.setLinkInternalFilters=function(){var q;if(this.formattedValues.countryCodeFilter!=="us"){q=this.formattedValues.countryCodeFilter
}return q};l._setSCodeProps=function(t){var r=t.properties||{};t.data.linkTrackVars=t.data.linkTrackVars||[];
for(var q in r){if(q==="events"){s.linkTrackEvents=r[q]}if(q!=="title"){t.data.linkTrackVars.push(q);
s[q]=r[q]}}};l.getBucket=function(){var v=i.length;var q=2;for(var t=0;t<v;t++){if(i[t].indexOf(this.formattedValues.legacyCountryCode)!==-1){q=t;
break}}var r=o.bucket(q);var w=this._replaceTemplateVars(r);var u=this._replaceTemplateVars(o.bucketProduct(q));
return w+(!!u?(","+u):"")};l._replaceTemplateVars=function(q){return j.translate(q,this.templateVarArr)
};c.exports=k},{"../../error-handler/errorHandler":37,"../../metadata":38,"./helpers/formatter":51,"./helpers/metadata":52,"./helpers/templateVar":53,"./submit-methods/submitMethods":56,"./translator/translator":68,"ac-object":24}],55:[function(b,c,a){(function(){function f(k,i){var h=window.location.href;
var m=k.properties.title||"";var l;var j;if(typeof window.s==="object"){l=g(h)+((i.countryCodeFilter!=="us")?i.countryCodeFilter:"")+"/b/ss/"+s.un+"/"+(s.mobile?"5.1":"1")+"/"+s.version+"/s0"+Date.now()+"?ndh=1&t="+d()+"&fid="+s.fid+"&g="+h+"&pageName="+i.pageName+"&cc="+s.currencyCode+"&c3="+m+"&h1="+s.channel+"&pe=lnk_e&pev2="+m+"&s="+s.resolution+"&c="+s.colorDepth+"&j="+s.javascriptVersion+"&v="+s.javaEnabled+"&k="+s.cookiesEnabled+"&bw="+s.browserWidth+"&bh="+s.browserHeight+"&p="+s.plugins+"&r="+s.eVar49;
j=document.createElement("img");j.setAttribute("width","1");j.setAttribute("height","1");
j.setAttribute("border","0");j.src=l;return j}}function g(h){var j;var i;h=h.split("/");
j=h[0];i=h[2];return j+"//"+i+"/"}function d(){var h=new Date();return h.getDate()+"/"+h.getMonth()+"/"+h.getFullYear()+" "+h.getHours()+":"+h.getMinutes()+":"+h.getSeconds()+" "+h.getDay()+" "+h.getTimezoneOffset()
}c.exports=f}())},{}],56:[function(c,g,b){var f=c("./t");var a=c("./tl");var d=c("./manual");
g.exports={t:f,tl:a,manual:d}},{"./manual":55,"./t":57,"./tl":58}],57:[function(b,c,a){(function(){function d(g,f){if(window.s&&typeof window.s.t==="function"){s.pageName=f.pageName;
s.channel=f.channel;s.t()}}c.exports=d}())},{}],58:[function(b,c,a){(function(){var f=b("../../../error-handler/ErrorHandler");
var g="sCodePluginSubmitMethodtl";var d=b("../helpers/DOM");function i(n,m){var l;
var o;if(window.s&&s.tl&&typeof s.tl==="function"){if(typeof n.data!=="object"){f.log(g,"submit","Request param data ("+n.data+") is not an object")
}if(typeof n.properties.title!=="string"){f.log(g,"submit","Request param title ("+n.properties.title+") is not a string")
}if(f.exception){return}s.linkTrackVars="eVar54,eVar49";if(n.data.linkTrackVars&&n.data.linkTrackVars.length>0){s.linkTrackVars+=","+n.data.linkTrackVars.join(",")
}l=n.data.linkType||"o";o=k(n.data.targetEl);s.forcedLinkTrackingTimeout=h(n);s.tl(o,l,n.properties.title)
}}function h(n){var o=0;var m=n.data.targetEl;var l;if(n.type&&n.type==="link"){if(j(m)!==true){o=100
}}return o}function k(l){return j(l)}function j(l){var m;if(!l){return true}m=d.isIntraPageLink(l);
if(m){return true}return l}c.exports=i}())},{"../../../error-handler/ErrorHandler":36,"../helpers/DOM":50}],59:[function(b,c,a){(function(){var d=b("../../helpers/formatter");
function f(l,j,n){var h=l;var m=h.data;var g={play:"s",replay:"r",ended:"e",pause:"p"};
var k=" - ";var i={};i.prop13=d.eventString("a",g[m.interactionType])+k+n.pageName;
i.prop3=i.title=d.eventString("a",g[m.interactionType])+k+n.pageName+k+d.lowerCaseString(m.title);
i.prop4=m.audioSrc;h.properties=i;h.submitMethod="tl";return h}c.exports={translate:f}
}())},{"../../helpers/formatter":51}],60:[function(b,c,a){(function(){var i=b("../../../../Storage");
var d=b("../../../../data-attr/helper");var g=b("../../helpers/formatter");var f=b("../../helpers/DOM");
function h(m,u,l){var k=m;var o=k.data;var n=" - ";var q={};var p=o.targetEl.getAttribute("data-"+m.options.dataAttribute);
var j=d.dataStringToObject(p);var t=l.pageName+n+(k.data.linkImg||o.linkText.toLowerCase());
var v;var r=f.isIntraPageLink(o.targetEl);if(j.prop3){j.prop3=g.lowerCaseString(j.prop3)
}if(j.prefix){t=g.eventString(j.prefix,l.pageName+n+(j.prop3||k.data.linkImg||o.linkText.toLowerCase()))
}k.options.async=(!r)?false:true;q.prop3=q.title=(!j.prefix&&j.prop3)?l.pageName+n+j.prop3:t;
if(o.region){i.setItem("s_nav",o.region)}k.properties=q;k.submitMethod="tl";return k
}c.exports={translate:h}}())},{"../../../../Storage":33,"../../../../data-attr/helper":35,"../../helpers/DOM":50,"../../helpers/formatter":51}],61:[function(b,c,a){(function(){var d=b("../../helpers/formatter");
function f(l,i,n){var g=l;var m=g.data;var k=" - ";var h={};var j=((m.exitTimeStamp-n.initialTimeStamp)*0.001).toFixed(2);
h.prop3=j;h.title=d.eventString(j,n.pageName);g.properties=h;g.submitMethod="manual";
return g}c.exports={translate:f}}())},{"../../helpers/formatter":51}],62:[function(b,c,a){(function(){var d=b("../../../../error-handler/ErrorHandler");
var g=b("../../helpers/formatter");var f="sCodePluginGalleryTranslator";function i(m,t,l){var k=m;
var p=k.data;var n=" - ";var q={click:"mi",keydown:"ki",swipe:"si",dot:"bi",thumb:"gi",paddle:"pi",auto:"ai"};
var j;var o;var r={};var u="";h(r);if(p.incomingInteractionType){if(q[p.incomingInteractionType]){o=q[p.incomingInteractionType]
}}if(p.outgoingInteractionType){if(q[p.outgoingInteractionType]){j=q[p.outgoingInteractionType]
}}if(!o){d.log(f,"translate",o+'" is not a valid interaction type for the incoming slide')
}if(!j){d.log(f,"translate",j+'" is not a valid interaction type for the outgoing slide')
}if(d.exception){return}u=g.eventString(o,"")+l.pageName+n+m.options.galleryName+n;
r.prop2=u+p.outgoing.id;r.prop3=r.title=u+p.incoming.id;r.prop35=(typeof p.slideInViewTime==="number")?Math.floor((p.slideInViewTime/1000)%60):p.slideInViewTime;
if(p.newInteractionType===true){r.prop16="gallery interaction";r.eVar16=(m.options.galleryName?m.options.galleryName+" ":"")+"gallery interaction";
r.events="event1"}k.properties=r;k.submitMethod="tl";return k}function h(j){j.events="";
j.prop16=j.eVar16=""}c.exports={translate:i}}())},{"../../../../error-handler/ErrorHandler":36,"../../helpers/formatter":51}],63:[function(b,c,a){(function(){var h=b("../../../../Storage");
var f=b("../../helpers/formatter");var d=b("../../helpers/DOM");function g(k,r,j){var i=k;
var m=i.data;var l=" - ";var n=m.targetEl.getAttribute("href");var t=(n.indexOf("http://")>-1||n.indexOf("https://")>-1)?n.split("/")[2].split(".")[0]+" link":"";
var q=(m.region)?f.eventString(m.region.charAt(0),m.linkImg||m.linkText.toLowerCase()||m.linkId)+l+j.pageName:j.pageName+l+m.linkText.toLowerCase();
var p=d.isIntraPageLink(m.targetEl);var o={};o.prop3=o.title=q+((t!=="")?l+t:"");
i.options.async=(!p)?false:true;if(m.region){h.setItem("s_nav",m.region)}i.properties=o;
i.submitMethod="tl";return i}c.exports={translate:g}}())},{"../../../../Storage":33,"../../helpers/DOM":50,"../../helpers/formatter":51}],64:[function(b,c,a){(function(){var d=b("../../helpers/formatter");
function f(j,i,k){var g=j;var h={};g.properties=h;g.submitMethod="tl";return g}c.exports={translate:f}
}())},{"../../helpers/formatter":51}],65:[function(b,c,a){(function(){var i=b("../../../../Storage");
var d=b("../../helpers/formatter");var f=b("../../helpers/templateVar");function g(l,q,k){var j=l;
var m=j.data;var o=f.set(q);var p={};var t=h();var n=i.getItem("s_nav");for(var r in m){p[r]=m[r];
if(typeof p[r]==="string"){p[r]=f.translate(p[r],o)}}if(t){p.prop25=t}if(n){i.removeItem("s_nav");
p.prop25=n}if(!p.prop25){p.prop25="other nav or none"}j.properties=p;j.submitMethod="t";
return j}function h(){var j=document.referrer;var k=window.location.host;var l;
if(!j){l="direct entry"}if(j&&j!==""&&j.split("?")[0].indexOf(k)===-1){l="third party"
}return l}c.exports={translate:g}}())},{"../../../../Storage":33,"../../helpers/formatter":51,"../../helpers/templateVar":53}],66:[function(b,c,a){(function(){function d(i,l,h){var f=i;
var m=f.data.element;var j=" - ";var k={};var o=m.name||m.id||"";var g=m.thresholdExitTime-m.thresholdEnterTime;
var n=(m.element&&m.element.position)?" ."+m.element.position:"";k.prop34=k.title=h.pageName+j+o+j+"section engaged"+n;
k.prop35=(g/1000).toFixed(2);f.properties=k;f.submitMethod="tl";return f}c.exports={translate:d}
}())},{}],67:[function(b,c,a){(function(){var d=b("../../helpers/formatter");function g(k,q,j){var i=k;
var m=i.data;var l=" - ";var o={started:"s",replay:"r",ended:"e"};var p=(m.targetEl.href)?m.targetEl.href.split("/").pop():"";
var h=(m.eventType&&o[m.eventType])?o[m.eventType]:m.eventType;var n={};f(n);n.prop13=d.eventString("v",h)+": "+j.pageName+l+p;
if(m.eventType==="started"||m.eventType==="replay"){n.prop16=n.eVar16="video plays";
if(m.eventType==="started"){n.events="event2"}}else{if(m.eventType==="ended"){n.prop16=n.eVar16="video ends"
}}n.title=d.eventString("v",h)+l+j.pageName+l+m.videoId+l+p;if(m.videoType&&m.playerType){n.prop18=m.videoType+" via "+m.playerType
}i.properties=n;i.submitMethod="tl";return i}function f(h){h.events="";h.prop16=h.eVar16=h.prop18=""
}c.exports={translate:g}}())},{"../../helpers/formatter":51}],68:[function(b,c,a){(function(){var d={audio:b("./component/audio"),gallery:b("./component/gallery"),link:b("./component/link"),click:b("./component/click"),overlay:b("./component/overlay"),page:b("./component/page"),section:b("./component/section"),video:b("./component/video"),exit:b("./component/exit")};
function f(i,g,j){var h=i;if(i.type&&d[i.type]){h=d[i.type].translate(i,g,j)}return h
}c.exports={translate:f,components:d}}())},{"./component/audio":59,"./component/click":60,"./component/exit":61,"./component/gallery":62,"./component/link":63,"./component/overlay":64,"./component/page":65,"./component/section":66,"./component/video":67}],69:[function(b,a,c){var d;
var i="analytics-region";var h=/(?:\w+:\w+)(?:,(?=(?:\w+:\w+))|$)/;var f=/[\w\s]+/;
var g=b("../data-attr/helper");function j(k){this.element=k;this.childRegions={};
this.parentRegion="";this.options=this._getDataOptions();this.name=this._setName()
}d=j.prototype;d._setName=function(){var k="";if(this.options.name){k=this.options.name
}if(!this.options.name&&this.element.id){this.options.name=this.element.id}return k
};d._getDataOptions=function(){var l={};var k=this.element.getAttribute("data-"+i);
k=k.charAt(k.length-1)===","?k.substr(0,k.length-1):k;if(this._isJSONable(k)){l=g.dataStringToObject(k)
}else{if(this._isSingleValue(k)){l.name=k}}return l};d._isJSONable=function(k){return h.test(k)
};d._isSingleValue=function(k){return f.test(k)};a.exports={Region:j,dataAttribute:i}
},{"../data-attr/helper":35}],70:[function(b,c,a){(function(){var f=b("ac-base").Element;
var l=b("./Region").Region;var k=b("./Region").dataAttribute;var d=[];var n={};
function j(){if(d.length>0){return d}var r=f.selectAll("[data-"+k+"]");var t;var o=r.length;
var q=0;function p(u){var v;while(f.isElement(r[q+1])&&u.element.contains(r[q+1])){v=new l(r[q+1]);
d.push(v);v.parentRegion=u.name;u.childRegions[v.name]=v;q+=1;p(v)}}for(q;q<o;q+=1){t=new l(r[q]);
n[t.name]=t;d.push(t);p(t)}return d}function m(){j();if(Object.keys(n).length>0){return n
}}function i(o){var q=j();if(f.isElement(o)){var p=h(o);if(p.length>0){return p.pop()
}}}function h(o){var p=j();if(f.isElement(o)){return p.filter(function(q){return q.element.contains(o)
})}}function g(o){var p=j();if(typeof o==="string"){return p.filter(function(q){return q.name===o
})}}c.exports={getTree:m,getAllRegions:j,getRegionByElement:i,getRegionByName:g,getRegionAncestryByElement:h}
}())},{"./Region":69,"ac-base":false}],71:[function(b,c,a){(function(){var d=b("ac-feature");
c.exports={available:function(){return d.localStorageAvailable()},setItem:function(f,g){localStorage.setItem(f,g)
},getItem:function(f){return localStorage[f]},hasItem:function(f){return(localStorage.getItem(f)===null)
},removeItem:function(f){localStorage.removeItem(f)},clear:function(){localStorage.clear()
}}}())},{"ac-feature":20}],72:[function(b,c,a){(function(){var f=b("ac-base").Element;
var d="ac-analytics-storage";c.exports={available:function(){this.storageEl=document.createElement("meta");
this.storageEl.setAttribute("property","ac-analytics-storage");this.storageEl.setAttribute("id","ac-analytics-storage");
f.insert(this.storageEl,document.getElementsByTagName("head")[0]);if(this.storageEl&&this.storageEl.addBehavior){this.storageEl.addBehavior("#default#userdata");
try{this.storageEl.load(d)}catch(g){return false}this.storageEl.expires=new Date((new Date()).getTime()+1).toUTCString();
return true}f.remove(this.storageEl);return false},setItem:function(g,h){this.storageEl.setAttribute(g,h);
this.storageEl.save(d)},getItem:function(g){this.storageEl.load(d);return this.storageEl.getAttribute(g)
},hasItem:function(g){this.storageEl.load(d);return(this.storageEl.getAttribute(g)===undefined)
},removeItem:function(g){this.storageEl.removeAttribute(g);this.storageEl.save(d)
},clear:function(){var h=this.storageEl.attributes.length;for(var g=0;g<h;g++){if(this.storageEl.attributes[g]!=="property"){this.storageEl.removeAttributeNode(this.storageEl.attributes[g])
}}this.storageEl.save(d)}}}())},{"ac-base":false}],73:[function(b,c,a){(function(){var g=b("ac-base").Element;
var d=b("ac-dom-events");var h={play:function(i){if(i.data.ended===true){return"replay"
}return"play"},ended:function(i){return i.event.type},pause:function(i){return i.event.type
}};function f(j){var i=j;var k=d.target(j.event);i.data.targetEl=k;if(k&&k.getAttribute("src")){i.data.audioSrc=k.getAttribute("src")
}if(!i.data.audioSrc){var l=g.select("source",k);if(l&&l.getAttribute("src")){i.data.audioSrc=l.getAttribute("src")
}}i.data.interactionType=(h[j.event.type])?h[j.event.type](j):j.event.type;i.data.title=i.data.targetEl.title||"No title found";
i.data.duration=i.data.targetEl.duration;i.data.currentTime=i.data.targetEl.currentTime;
return i}c.exports={translate:f}}())},{"ac-base":false,"ac-dom-events":19}],74:[function(b,c,a){(function(){var f=b("ac-base").Element;
var g=b("../../regions/regions");function d(l){var j=l;var h=f.select("img",l.data.targetEl);
var k;var i=g.getRegionByElement(l.data.targetEl);if(h){k=h.getAttribute("src");
j.data.linkImg=k.substring(k.lastIndexOf("/")+1,k.length);if(typeof j.data.linkImg==="string"){j.data.linkImg=j.data.linkImg.toLowerCase()
}}j.data.linkText=(typeof l.data.targetEl.innerText==="string")?l.data.targetEl.innerText.trim():l.data.targetEl.textContent.trim();
if(typeof i==="object"){j.data.region=i.name}return j}c.exports={translate:d}}())
},{"../../regions/regions":70,"ac-base":false}],75:[function(b,c,a){(function(){function d(g){var f=g;
return f}c.exports={translate:d}}())},{}],76:[function(b,c,a){(function(){var k=b("ac-base").Element;
var m={click:function(q){var p="click";var o=h(q);return o||p},auto:function(p){var o="auto";
return o},keydown:function(p){var o="keydown";return o},touchend:function(o){return l(o)
},touchstart:function(o){return l(o)},touchmove:function(o){return l(o)}};function f(r){var t=d(r);
var q=t;var o=r.observer;var p=r;if(m[t]){q=m[t](r)}p.data.targetEl=n(r);p.data.slideInViewTime=i(r);
p.data.outgoingInteractionType=r.observer.previousInteractionType;p.data.incomingInteractionType=q;
p.data.newInteractionType=j(p);o.previousInteractionType=q;return p}function h(r){var q=false;
var o=r.data.interactionEvent;var p=n(r);var t;if(p){t=k.ancestor(p,"nav");q=t?g(t.className):q
}return q}function g(p){var o=false;["paddle","dot","thumb"].some(function(q){if(p.indexOf(q)>=0){o=q;
return true}});return o}function n(q){var o=q.data.interactionEvent;var p=false;
if(o){p=o.target||o.srcElement}return p}function i(o){return o.data.incomingSlideTimestamp-o.data.outgoingSlideTimestamp
}function j(r){var q=false;var o=r.data.incomingInteractionType;var p=r.observer;
if(p.trackedInteractionTypes.indexOf(o)===-1){q=true;p.trackedInteractionTypes.push(o)
}return q}function d(q){var o;var p="auto";var r=q.data;if(r.interactionEvent){o=r.interactionEvent.originalEvent||r.interactionEvent;
if(o&&o.type){p=o.type}}return p}function l(p){var o="swipe";return o}c.exports={translate:f}
}())},{"ac-base":false}],77:[function(b,c,a){(function(){var f=b("ac-base").Element;
var g=b("../../regions/regions");function d(l){var j=l;var h=f.select("img",l.data.targetEl);
var k;var i=g.getRegionByElement(l.data.targetEl);j.data.linkText=(typeof l.data.targetEl.innerText==="string")?l.data.targetEl.innerText.trim():l.data.targetEl.textContent.trim();
if(l.data.targetEl.id){j.data.linkId=l.data.targetEl.id}if(h){k=h.getAttribute("src");
j.data.linkImg=k.substring(k.lastIndexOf("/")+1,k.length);if(typeof j.data.linkImg==="string"){j.data.linkImg=j.data.linkImg.toLowerCase()
}}if(typeof i==="object"){j.data.region=i.name}return j}c.exports={translate:d}
}())},{"../../regions/regions":70,"ac-base":false}],78:[function(b,c,a){(function(){function d(g){var f=g;
return f}c.exports={translate:d}}())},{}],79:[function(b,c,a){(function(){function d(g){var f=g;
return f}c.exports={translate:d}}())},{}],80:[function(b,c,a){(function(){function d(f){return f
}c.exports={translate:d}}())},{}],81:[function(b,c,a){(function(){var d={play:function(h){if(h.data.ended===true){return"replay"
}if(h.data.playCount===0){return"started"}return"play"}};var g={click:function(h){return h.data.event.type
}};function f(i){var h=i;h.data.eventType=(d[i.data.eventType])?d[i.data.eventType](i):i.data.eventType;
if(i.data.event&&g[i.data.event.type]){h.data.interactionType=g[i.data.event.type](i)
}return h}c.exports={translate:f}}())},{}],82:[function(b,c,a){(function(){var d=b("../error-handler/ErrorHandler");
var f={audio:b("./component/audio"),gallery:b("./component/gallery"),link:b("./component/link"),click:b("./component/click"),overlay:b("./component/overlay"),page:b("./component/page"),section:b("./component/section"),video:b("./component/video"),exit:b("./component/exit")};
function g(i){var h=i;if(i.type&&f[i.type]){if(typeof i.data!=="object"){d.log("Translator","translate","request.data ("+i.data+") must be an object")
}if(d.exception){return}h=f[i.type].translate(i)}return h}c.exports={translate:g,components:f}
}())},{"../error-handler/ErrorHandler":36,"./component/audio":73,"./component/click":74,"./component/exit":75,"./component/gallery":76,"./component/link":77,"./component/overlay":78,"./component/page":79,"./component/section":80,"./component/video":81}],83:[function(b,c,a){a.Clock=b("./ac-animation-sequencer/Clock");
a.PlayerMonitor=b("./ac-animation-sequencer/PlayerMonitor");a.Timeline=b("./ac-animation-sequencer/Timeline");
a.Tween=b("./ac-animation-sequencer/Tween");a.BasicPlayer=b("./ac-animation-sequencer/player/BasicPlayer");
a.MediaPlayer=b("./ac-animation-sequencer/player/MediaPlayer");a.Pause=b("./ac-animation-sequencer/controllers/Pause");
a.MediaGroup=b("./ac-animation-sequencer/controllers/MediaGroup");a.BaseClip=b("./ac-animation-sequencer/clip/BaseClip");
a.CompositeClip=b("./ac-animation-sequencer/clip/CompositeClip");a.TimedClip=b("./ac-animation-sequencer/clip/TimedClip");
a.TweenClip=b("./ac-animation-sequencer/clip/TweenClip");a.ElementClip=b("./ac-animation-sequencer/clip/ElementClip");
a.VideoClip=b("./ac-animation-sequencer/clip/VideoClip");a.ReversibleVideo=b("./ac-animation-sequencer/adapters/ReversibleVideo")
},{"./ac-animation-sequencer/Clock":84,"./ac-animation-sequencer/PlayerMonitor":85,"./ac-animation-sequencer/Timeline":86,"./ac-animation-sequencer/Tween":87,"./ac-animation-sequencer/adapters/ReversibleVideo":90,"./ac-animation-sequencer/clip/BaseClip":91,"./ac-animation-sequencer/clip/CompositeClip":92,"./ac-animation-sequencer/clip/ElementClip":93,"./ac-animation-sequencer/clip/TimedClip":94,"./ac-animation-sequencer/clip/TweenClip":95,"./ac-animation-sequencer/clip/VideoClip":96,"./ac-animation-sequencer/controllers/MediaGroup":97,"./ac-animation-sequencer/controllers/Pause":98,"./ac-animation-sequencer/player/BasicPlayer":99,"./ac-animation-sequencer/player/MediaPlayer":100}],84:[function(b,c,a){function f(){this._currentTimeMS=0;
this._playbackRate=1;this._paused=true;this._resetStartTime()}var d=f.prototype;
d._updateCurrentTime=function(){var h,g=Date.now();if(this._paused){h=0}else{h=(g-this._startTime)
}this._currentTimeMS+=(h*this._playbackRate);this._startTime=g};d._resetStartTime=function(){this._startTime=Date.now()
};d.play=function(){this._resetStartTime();this._paused=false;return this};d.pause=function(){this._updateCurrentTime();
this._paused=true;return this};d.isPaused=function(){return this._paused};d.getCurrentTime=function(){this._updateCurrentTime();
return this._currentTimeMS/1000};d.setCurrentTime=function(g){if(isNaN(g)){return
}this._resetStartTime();this._currentTimeMS=g*1000};d.getPlaybackRate=function(){return this._playbackRate
};d.setPlaybackRate=function(g){if(isNaN(g)){return}this._playbackRate=g};c.exports=f
},{}],85:[function(c,f,a){var h=c("ac-event-emitter").EventEmitter;var b=c("./vendor/utils");
function d(j,k,i){i=(Array.isArray(k)?i:k)||{};k=(Array.isArray(k)?k:[]);this._player=j;
this._isMonitoring=true;this._times=[0];this._previous=0;this._currentTimeIndex=0;
this._options=b.defaults({active:true,readyEvent:"canplaythrough",autoInit:false},i);
if(this._options.autoInit){this.addPlayerListener(this._options.readyEvent,this._init.bind(this,k))
}}var g=d.prototype=new h();g.addPlayerListener=function(j,i){if(typeof this._player.addEventListener==="function"){this._player.addEventListener(j,i)
}else{if(typeof this._player.on==="function"){this._player.on(j,i)}}};g._init=function(i){if(this._initialized){return
}this.addTime(this._player.duration);if(i&&i.length){i.forEach(this.addTime.bind(this))
}this._resetNextTimes();this._attachEvents();if(this._options.active){this._listen()
}this.trigger("ready");this._initialized=true};g._attachEvents=function(){this.addPlayerListener("play",this._handlePlay.bind(this));
if(!this._options.active){this.addPlayerListener("timeupdate",this._listen.bind(this))
}this.addPlayerListener("seeking",this._handleSeek.bind(this));this.addPlayerListener("ratechange",this._handleRateChange.bind(this))
};g.addTime=function(i,j){i=parseFloat(i);if(isNaN(i)){throw new TypeError('Invalid time "'+i+'", expected Number"')
}if(this._times.indexOf(i)===-1){this._times.push(i);this._times.sort(function(l,k){return l-k
})}if(typeof j==="function"){this.on("time:"+i,j)}this._resetNextTimes()};g._handleSeek=function(){var j=this._player.currentTime;
var i=this._times.indexOf(j);this._currentTimeIndex=(i!==-1)?i:this._calcCurrentTimeIndex(j);
this._resetNextTimes()};g._handlePlay=function(){this._resetNextTimes();this._listen()
};g._handleRateChange=function(){var j=this._player.currentTime;var k=j===this._player.duration;
var i=this._times.indexOf(j)!==-1;this._currentTimeIndex=(k||i)?this._currentTimeIndex:this._calcCurrentTimeIndex(j);
this._resetNextTimes()};g._resetNextTimes=function(){var i=this._calcNextTimeIndex(this._currentTimeIndex);
if(b.isNum(i)){this._nextTimeIndex=i;this._nextTimePoint=this._times[i]}};g._calcCurrentTimeIndex=function(m){var j,l,k,i;
k=this._calcTimeIndices(m);l=k[0];j=k[1];i=(this._forwards())?l:j;return(this._validTimeIndex(i))?i:null
};g._validTimeIndex=function(i){return(0<=i&&i<=this._times.length-1)};g._calcNextTimeIndex=function(i){var j=i+((this._forwards())?1:-1);
return(this._validTimeIndex(j))?j:null};g._calcTimeIndices=function(j){var i=this._times.reduce(function(l,m,k){return(j>=this._times[l+1])?k:l
}.bind(this),0);return[i,i+1]};g._reachedNextTime=function(m){var l=this._forwards();
var j=this._nextTimePoint;var k=!this._player.paused||m===0||m===this._player.duration;
var n=l&&m>=j;var i=!l&&m<=j;return k&&(n||i)};g._forwards=function(){return this._player.playbackRate>0
};g._listen=function(){var j=this._player.currentTime;var i=this._previous;var k=this._reachedNextTime(j);
if(k){this._enterTimePoint(i)}this._previous=j;if(this._options.active&&!this._player.paused){window.requestAnimationFrame(this._listen.bind(this))
}};g._enterTimePoint=function(j){var i=this._calcNextTimeIndex(this._currentTimeIndex);
if(!b.isNum(i)){return}var k=this._times[i];this.trigger("time:"+k,{previous:j,next:this._player.currentTime,requested:k});
this._currentTimeIndex=i;this._resetNextTimes()};f.exports=d},{"./vendor/utils":103}],86:[function(b,c,a){var i=b("./clip/CompositeClip");
var h=b("./clip/TimedClip");var g="Invalid duration for the following clip; must be number greater than or equal to zero (0)";
var f='Invalid clip type: "';var d={clipTypes:{Tween:b("./clip/TweenClip"),Element:b("./clip/ElementClip")},create:function(j){if(this.validTimeline(j)){return this._buildTimeline(j)
}if(this.debug&&console&&typeof console.warn==="function"){console.warn("Timeline: invalid timeline data:",j)
}return null},validTimeline:function(j){return Array.isArray(j)&&j.every(this._validClip.bind(this))
},_getClipType:function(j){if(typeof j==="string"&&this.clipTypes[j]){j=this.clipTypes[j]
}if(this._isValidClipType(j)){return j}return false},_isValidClipType:function(j){return(j&&j.create)
},_validate:function(){return true},_buildTimeline:function(k){var j=k.map(this._createTimedClip.bind(this));
return new i(j)},_createTimedClip:function(k){var j=this._getClipType(k.clip);return new h(j.create(k),k)
},_validClip:function(m){var l;var j=this._getClipType(m.clip);var k=this._validDuration(m);
if(!j){throw new TypeError(f+m.clip+'"\n\n'+JSON.stringify(m))}l=j.validate||this._validate;
return k&&l(m)},_validDuration:function(k){var l=k.duration;var j=typeof l==="number"&&l>0;
if(!j){throw new TypeError(g+"\n\n"+JSON.stringify(k))}return j}};c.exports=d},{"./clip/CompositeClip":92,"./clip/ElementClip":93,"./clip/TimedClip":94,"./clip/TweenClip":95}],87:[function(b,a,d){var i=b("./vendor/KeySpline");
var g=b("./vendor/EasingFunctions");var k="Easing option must be one of: String, Array[Number:4], or Function. Given: ";
var c="KeySpline easing expected an array of exactly four (4) numbers, given: ";
var j=b("./vendor/utils");function h(l){l=l||{};j.defaultProps(this,h.defaults,l);
this._easingFunction=this._createEasing(this.easing)}h.defaults={from:0,to:1,duration:1,easing:"linear"};
var f=h.prototype;f._createEasing=function(l){var m;if(typeof l==="string"){m=this._createPredefinedEasing(l)
}else{if(Array.isArray(l)){m=this._createBezierEasing(l)}else{if(typeof l==="function"){m=l
}else{throw new TypeError(k+l)}}}return m};f._createBezierEasing=function(l){var n;
var o=l;var m=l.every(function(p){return(typeof p==="number")});if(l.length!==4||!m){throw new TypeError(c+l)
}n=new i(o[0],o[1],o[2],o[3]);return function(p,t,r,q){return t+n.get(p/q)*r}};
f._createPredefinedEasing=function(n){var m=g[n];var l="";if(!m){l+='Easing function "'+m;
l+='" not recognized among the following: ';l+=Object.keys(g).join(", ");throw new Error(l)
}return m};f._getInterpolatedValue=function(l,o,n,m){return this._easingFunction(l,o,n,m)
};f.valueAtLocation=function(m){if(m<0||m>1){return null}var l=this.duration*m;
return this.valueAtTime(l)};f.valueAtPercent=function(l){if(l<0||l>100){return null
}return this.valueAtLocation(l/100)};f.valueAtTime=function(l){if(l<0||l>this.duration){return null
}return this._getInterpolatedValue(l,this.from,this.to-this.from,this.duration)
};a.exports=h},{"./vendor/EasingFunctions":101,"./vendor/KeySpline":102,"./vendor/utils":103}],88:[function(c,d,b){function a(g){this._media=g
}var f=a.prototype;f.on=function(){this._media.addEventListener.apply(this._media,arguments)
};f.off=function(){this._media.removeEventListener.apply(this._media,arguments)
};f.getCurrentTime=function(){return this._media.currentTime};f.setCurrentTime=function(g){this._media.currentTime=g
};f.getDuration=function(){return this._media.duration};f.getPlaybackRate=function(){return this._media.playbackRate
};f.setPlaybackRate=function(g){this._media.playbackRate=g};d.exports=a},{}],89:[function(c,d,a){if(typeof Object.defineProperties!=="function"){return
}var g=c("ac-event-emitter").EventEmitter;function b(h){this._player=h}var f=b.prototype=new g();
f.addEventListener=function(){this._player.on.apply(this._player,arguments)};f.removeEventListener=function(){this._player.on.apply(this._player,arguments)
};f.play=function(){this._player.play.apply(this._player,arguments)};f.pause=function(){this._player.pause.apply(this._player,arguments)
};Object.defineProperties(b.prototype,{paused:{get:function(){return this._player.isPaused()
},set:function(h){this._player.setPaused(h)}},currentTime:{get:function(){return this._player.getCurrentTime()
},set:function(h){this._player.setCurrentTime(h)}},duration:{get:function(){return this._player.getDuration()
}},playbackRate:{get:function(){return this._player.getPlaybackRate()},set:function(h){this.trigger("ratechange",{rate:h});
this._player.setPlaybackRate(h)}}});d.exports=b},{}],90:[function(b,c,a){if(typeof Object.defineProperties!=="function"){return
}var f=b("ac-event-emitter").EventEmitter;function g(h){this._media=h;this._lastTime=null;
g.passThroughEvents.forEach(this.passThroughEvent.bind(this));g.interceptedEvents.forEach(this.interceptEvent.bind(this))
}g.interceptedEvents=["seeking","play"];g.passThroughEvents=["abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","mozaudioavailable","pause","playing","progress","ratechange","seeked","suspend","timeupdate","volumechange","waiting"];
var d=g.prototype=new f();d.addEventListener=function(h){var i=g.passThroughEvents;
if(i.indexOf(h)>-1){this._media.addEventListener.apply(this._media,arguments)}else{this.on.apply(this,arguments)
}};d.removeEventListener=function(h){var i=g.passThroughEvents;if(i.indexOf(h)>-1){this._media.removeEventListener.apply(this._media,arguments)
}else{this.off.apply(this,arguments)}};d.passThroughEvent=function(h){this._media.addEventListener(h,this._passThrough.bind(this))
};d.interceptEvent=function(h){var i=this["_on"+h];if(typeof i!=="undefined"){this._media.addEventListener(h,i.bind(this))
}};d._passThrough=function(h){this.trigger(h.type,h)};d._onseeking=function(){if(!this._playing){this.trigger("seeking")
}};d._onplay=function(){this.trigger("play")};d.play=function(){if(this.playbackRate<0){this._playing=true;
this._lastTime=null;window.requestAnimationFrame(this._update.bind(this));this.trigger("play")
}else{this._media.play()}};d.load=function(){this._media.load()};d._stop=function(h){h.preventDefault();
h.stopPropagation()};d._update=function(i){var j=i-(this._lastTime||i);var h=this._media.currentTime+((j*this.playbackRate)/1000);
if(h<=0){this._media.currentTime=0;this._playing=false;this.trigger("returned",{type:"returned"})
}else{this._media.currentTime=h;this.trigger("timeupdate",{type:"timeupdate"})}this._lastTime=i;
if(this._playing){window.requestAnimationFrame(this._update.bind(this))}};d.pause=function(){this._playing=false;
this._media.pause()};Object.defineProperties(g.prototype,{currentTime:{get:function(){return this._media.currentTime
},set:function(h){this._media.currentTime=h}},duration:{get:function(){return this._media.duration
}},buffered:{get:function(){return this._media.buffered}},playbackRate:{get:function(){return this._media.playbackRate
},set:function(h){this._media.playbackRate=h}},paused:{get:function(){return !this._playing&&this._media.paused
},set:function(h){this._media.paused=h}}});c.exports=g},{}],91:[function(b,a,d){var h=b("../vendor/KeySpline");
var i=b("ac-style-renderer").LogRenderer;var g=b("../vendor/EasingFunctions");var l="Easing option must be one of: String, Array[Number:4], or Function. Given: ";
var c="KeySpline easing expected an array of exactly four (4) numbers, given: ";
var k=b("ac-event-emitter").EventEmitter;function j(n,m){this.options=m||{};this._renderer=this.options.renderer||i;
this._duration=n;this._currentTime=0;this._easingFunction=this._createEasing(this.options.easing||j.DEFAULT_EASING)
}j.DEFAULT_EASING="linear";var f=j.prototype=new k();f._createEasing=function(m){var n;
if(typeof m==="string"){n=this._createPredefinedEasing(m)}else{if(Array.isArray(m)){n=this._createBezierEasing(m)
}else{if(typeof m==="function"){n=m}else{throw new TypeError(l+m)}}}return n};f._createBezierEasing=function(m){var o;
var p=m;var n=m.every(function(q){return(typeof q==="number")});if(m.length!==4||!n){throw new TypeError(c+m)
}o=new h(p[0],p[1],p[2],p[3]);return function(q,u,t,r){return o.get(q/r)*t}};f._createPredefinedEasing=function(o){var n=g[o];
var m="";if(!n){m+='Easing function "'+n;m+='" not recognized among the following: ';
m+=Object.keys(g).join(", ");throw new Error(m)}return n};f._getInterpolatedValue=function(m,p,o,n){return this._easingFunction(m,p,o,n)
};f.getDuration=function(){return this._duration};f.getCurrentTime=function(){return this._currentTime
};f.setCurrentTime=function(m){this._currentTime=m;this.update()};f.getPlaybackRate=function(){return this._playbackRate
};f.setPlaybackRate=function(m){this._playbackRate=m};f.update=function(){};a.exports=j
},{"../vendor/EasingFunctions":101,"../vendor/KeySpline":102,"ac-style-renderer":178}],92:[function(b,c,a){var g=b("./TimedClip");
function f(h){if(h&&h.length){this._clips=h.map(this._ensureTimedClip);this._duration=this._calcDuration()
}}var d=f.prototype;d._calcDuration=function(h){h=h||this._clips;var i=h.reduce(function(k,l){var j=l.getStartDelay()+l.getDuration();
return(j>k)?j:k},0);return i};d._ensureTimedClip=function(h){if(!(h instanceof g)){h=new g(h)
}return h};d._getLocalTime=function(h,i){return i-h.getStartDelay()};d._getEligibleClips=function(){return this._clips
};d.addClip=function(h){h=this._ensureTimedClip(h);this._clips.push(h);this._duration=this._calcDuration()
};d.on=function(){var h=arguments;this._clips.forEach(function(i){i.on.apply(i,h)
})};d.off=function(){var h=arguments;this._clips.forEach(function(i){i.off.apply(i,h)
})};d.trigger=function(){var h=arguments;this._clips.forEach(function(i){i.trigger.apply(i,h)
})};d.setEasingDirection=function(h){this._clips.forEach(function(i){i.setEasingDirection(h)
})};d.getDuration=function(){return this._duration};d.getCurrentTime=function(){return this._currentTime
};d.setCurrentTime=function(j,i){var h=this._getEligibleClips();if(!h||!h.length){return
}h.forEach(function(k){var l=this._getLocalTime(k,j);k.setCurrentTime(l,i)}.bind(this))
};d.getPlaybackRate=function(){return this._playbackRate};d.setPlaybackRate=function(h){if(isNaN(h)){return
}this._playbackRate=h};c.exports=f},{"./TimedClip":94}],93:[function(c,a,d){var j=c("../vendor/utils");
var h=c("../Tween");var k=c("./BaseClip");var i=c("ac-style-renderer").InlineStyleRenderer;
var b="Invalid element or selector: ";function g(l){l=j.defaults(g.DEFAULTS,l);
this.props=l.props||[];if(l.selector||typeof l.element==="string"){this.el=document.querySelector(l.selector||l.element)
}else{this.el=l.element}if(!this.el||!this.el.nodeType||this.el.nodeType!==1){throw new TypeError(b+l.element)
}if(!l.renderer){this.renderer=i}k.call(this,l.duration,l);this._initProps()}g.DEFAULTS={props:[],selector:null,element:".default_selector",renderer:i,duration:1};
g.create=function(l){return new g(l)};g.validate=function(m){var l="selector" in m||"element" in m;
return l};var f=g.prototype=new k();f._initProps=function(){this.props.forEach(function(l){l.tween=this._createTween({easing:l.easing||k.DEFAULT_EASING,from:l.from,to:l.to,duration:this.getDuration()})
}.bind(this))};f._createTween=function(l){return new h(l)};f.update=function(m){if(this.props.length<1){return
}var l=this.props.map(function(q){var o=q.tween;var n=q.units;var p=o.valueAtTime(m);
p=(n?(p+n):p);return{prop:q.property,value:p}});this._renderer.render(this.el,l);
this.trigger("tween_update",{el:this.el,context:l})};f.getCurrentTime=function(){return this._currentTime
};f.setCurrentTime=function(l){if(l<0||l>this.getDuration()){return}this._currentTime=l;
this.update(this._currentTime)};a.exports=g},{"../Tween":87,"../vendor/utils":103,"./BaseClip":91,"ac-style-renderer":178}],94:[function(c,d,a){var b=c("../vendor/utils");
function g(i,h){h=b.defaults(g.DEFAULTS,(h||{}));this._clip=i;this._startDelay=h.startDelay||0;
this._loop=h.loop||false;this._fill=h.fill||"none"}g.DEFAULTS={fill:"none",loop:false,startDelay:0};
g.FILL_MODES=["none","forwards","backwards","both"];var f=g.prototype;f._show=function(){if(this._isHidden){this._isHidden=false;
this._clip.show()}};f._applyFill=function(n){if(this.getFill()==="none"){return
}var m=this.getDuration();var k=n>m;var j=this.getFill();var i=k&&j==="forwards";
var h=!k&&j==="backwards";var l=j==="both"||i||h;if(l){this._clip.setCurrentTime((k)?m:0)
}};f._hide=function(){if(!this._isHidden){this._isHidden=true;this._clip.hide()
}};f.setEasingDirection=function(h){return this._clip.setEasingDirection(h)};f.on=function(){this._clip.on.apply(this._clip,arguments)
};f.off=function(){this._clip.off.apply(this._clip,arguments)};f.trigger=function(){this._clip.trigger.apply(this._clip,arguments)
};f.getCurrentTime=function(){return this._currentTime};f.setCurrentTime=function(i,h){if(i<0||i>this.getDuration()){this._clip.inEffect=false;
this._applyFill(i)}else{this._clip.inEffect=true;this._clip.setCurrentTime(i,h)
}};f.getDuration=function(){return this._clip.getDuration()};f.getStartDelay=function(){return this._startDelay
};f.setStartDelay=function(h){if(b.isNum(h)){this._startDelay=h}};f.getLoop=function(){return this._loop
};f.setLoop=function(h){this._loop=!!h};f.getFill=function(){return this._fill};
f.setFill=function(i){var h=g.FILL_MODES;if(h.indexOf(i.toLowerCase())!==-1){this._fill=i
}};d.exports=g},{"../vendor/utils":103}],95:[function(c,d,b){var g=c("./BaseClip");
function a(j,i,h){if(typeof j==="object"){h=j;j=h.duration;i=h.props}g.call(this,j,h);
this.props=i||[];this._initializePropEasing();this._lastComputedTime=0;this._easingDirection=1
}a.create=function(h){return new a(h.duration,h.props)};a.validate=function(h){return(Array.isArray(h.props)&&h.props.length>0)
};a.DEFAULT_EASING="linear";var f=a.prototype=new g();f._initializePropEasing=function(){this.props.forEach(function(h){h.easing=this._createEasing(h.easing||g.DEFAULT_EASING)
}.bind(this))};f.setEasingDirection=function(h){this._easingDirection=h};f.update=function(k){var i=(this._easingDirection===-1);
if(this.options.reverseEase!==true){i=false}var j=this.getDuration(),h={};if(this.props.length<1){return
}this.props.forEach(function(n){var m;var l=n.property;if(i){m=n.easing(this.getDuration()-k,n.to,-(n.to-n.from),j)
}else{m=n.easing(k,n.from,(n.to-n.from),j)}h[l]=m}.bind(this));this.trigger("tween_update",h)
};f.getCurrentTime=function(){return this._currentTime};f.setCurrentTime=function(h){if(h<0){h=0
}if(h>this.getDuration()){h=this.getDuration()}if(h<0||h>this.getDuration()){return
}this._currentTime=h;this.update(this._currentTime)};d.exports=a},{"./BaseClip":91}],96:[function(c,d,b){var a=c("../adapters/MediaAsClip");
function f(h,g){if(console){console.warn("VideoClip deprecated, please use adapters/MediaAsClip.")
}return new a(h,g)}d.exports=f},{"../adapters/MediaAsClip":88}],97:[function(c,d,a){if(typeof Object.defineProperties!=="function"){return
}var h=c("ac-event-emitter").EventEmitter;var i=c("../Clock");var b=c("../vendor/utils");
function g(){var j=[].slice.call(arguments);this._mediaElements=j.filter(this._validateMediaElements);
this._clock=new i()}var f=g.prototype=new h();f.addEventListener=f.on;f.removeEventListener=f.off;
f._validateMediaElements=function(j){return(typeof j.play==="function")&&(typeof j.pause==="function")
};f._updateCurrentTime=function(j){this._lastTime=this._clock.currentTime;this._mediaElements.forEach(function(k){k.currentTime=j
})};f._isValidTime=function(j){return(0<=j)&&(j<=this.duration)};f.play=function(){this.paused=false;
this._clock.play();b.invoke(this._mediaElements,"play");this.trigger("play")};f.pause=function(){this.paused=true;
this._clock.pause();b.invoke(this._mediaElements,"pause");this.trigger("pause")
};Object.defineProperties(g.prototype,{paused:{get:function(){return this._paused
},set:function(j){this._paused=!!j}},currentTime:{get:function(){return this._clock.getCurrentTime()
},set:function(j){if(this._isValidTime(j)){this.trigger("seeking",{time:j});this._updateCurrentTime(j);
this.trigger("seeked",{time:j})}}},playbackRate:{get:function(){return this._clock.getPlaybackRate()
},set:function(j){if(!b.isNum(j)){return}this._clock.setPlaybackRate(j);this._mediaElements.forEach(function(k){k.playbackRate=j
});this.trigger("ratechange",{rate:j})}},duration:{get:function(){return this._duration
},set:function(j){this._duration=j}}});d.exports=g},{"../Clock":84,"../vendor/utils":103}],98:[function(b,d,a){var h=b("ac-event-emitter").EventEmitter;
var c=b("../PlayerMonitor");function f(k,i,j){j=j||{};this._player=k;this._monitor=new c(this._player,j);
this._monitor.on("ready",this._initPauses.bind(this,i));this._previousPauseIndex=0;
this._player.addEventListener("play",this._exitPause.bind(this),false)}var g=f.prototype=new h();
g._initPauses=function(i){this._pauses=this._processPauses(i);this._attachPauses(this._pauses)
};g._processPauses=function(i){i=i.filter(function(j){return(0<j)&&(j<this._player.duration)
}.bind(this));i=i.sort(function(k,j){return k-j});if(i[0]!==0){i.unshift(0)}if(i[i.length-1]!==this._player.duration){i.push(this._player.duration)
}return i};g._attachPauses=function(i){i.forEach(function(j){this._monitor.addTime(j,this._enterPause.bind(this))
}.bind(this))};g._enterPause=function(l){var j=l.requested;var i=this._previousPauseIndex;
var k=this._pauses.indexOf(j);if(i===k){return}this._atPausePoint=true;this._player.pause();
this._player.currentTime=j;this.trigger("pauseenter",{from:i,to:k});this._previousPauseIndex=k
};g._exitPause=function(){var k=this._player.currentTime;var j=this._forwards();
var l=j&&k===this._player.duration;var i=!j&&k===0;if(this._atPausePoint&&!(l||i)){this._atPausePoint=false;
this.trigger("pauseexit",{from:this._previousPauseIndex,to:this._calcNextPauseIndex()})
}};g._forwards=function(){return this._player.playbackRate>0};g._calcNextPauseIndex=function(){var i=this._previousPauseIndex;
var j=this._forwards();return i+((j)?1:-1)};d.exports=f},{"../PlayerMonitor":85}],99:[function(d,f,b){var h=d("ac-event-emitter").EventEmitter;
var i=d("../Clock");var c=d("../adapters/PlayerAsMedia");function a(k,j){j=j||{};
if(!k){throw new TypeError("BasicPlayer: Invalid clip provided",k)}this._clip=k;
this._paused=true;this.setClock(j.clock||new i());window.setTimeout(this._triggerStart.bind(this),0)
}var g=a.prototype=new h();g.addEventListener=g.on;g.removeEventListener=g.off;
g.play=function(){this._paused=false;this._clock.play();this._update();this.trigger("play")
};g.pause=function(){this.setPaused(true);this._clock.pause();this.trigger("pause")
};g._triggerStart=function(){this.trigger("canplay");this.trigger("canplaythrough")
};g._updateCurrentTime=function(j){this._clock.setCurrentTime(j);this._lastTime=this._clip.setCurrentTime(j)
};g._update=function(){var m=this._clock.getCurrentTime();var n=this.getDuration();
var l=this._clock.getPlaybackRate();var k=l>0;var o=k&&m>=n;var j=!k&&m<=0;if(o||j){m=(o)?n:0;
this.pause();this._updateCurrentTime(m)}this.trigger("timeupdate",{previous:this._lastTime,time:m});
if(o){this.trigger("ended")}if(j){this.trigger("returned")}if(!this.isPaused()){this._updateCurrentTime(m);
window.requestAnimationFrame(this._update.bind(this))}};g._isValidTime=function(j){return(0<=j)&&(j<=this.getDuration())
};g.asMedia=function(){return new c(this)};g.isPaused=function(){return this._paused
};g.setPaused=function(j){this._paused=!!j};g.getCurrentTime=function(){return this._clock.getCurrentTime()
};g.setCurrentTime=function(j){if(this._isValidTime(j)){this.trigger("seeking",{time:j});
this._updateCurrentTime(j);this.trigger("seeked",{time:j})}};g.getPlaybackRate=function(){return this._clock.getPlaybackRate()
};g.setPlaybackRate=function(j){this._clock.setPlaybackRate(j);this.trigger("ratechange",{rate:j})
};g.getDuration=function(){return this._clip.getDuration()};g.setClock=function(j){this._clock=j
};g.getClock=function(){return this._clock};f.exports=a},{"../Clock":84,"../adapters/PlayerAsMedia":89}],100:[function(d,f,c){var b=d("./BasicPlayer");
function a(h,g){var i=new b(h,g);if(console){console.warn("MediaPlayer module deprecated, please use adapters/PlayerAsMedia or #toMedia method on instances of BasicPlayer")
}return i.asMedia()}f.exports=a},{"./BasicPlayer":99}],101:[function(q,d,K){var x={linear:function F(O,M,N,L){return N*O/L+M
},easeInQuad:function n(O,M,N,L){return N*(O/=L)*O+M},easeOutQuad:function b(O,M,N,L){return -N*(O/=L)*(O-2)+M
},easeInOutQuad:function y(O,M,N,L){if((O/=L/2)<1){return N/2*O*O+M}return -N/2*((--O)*(O-2)-1)+M
},easeInCubic:function u(O,M,N,L){return N*(O/=L)*O*O+M},easeOutCubic:function i(O,M,N,L){return N*((O=O/L-1)*O*O+1)+M
},easeInOutCubic:function h(O,M,N,L){if((O/=L/2)<1){return N/2*O*O*O+M}return N/2*((O-=2)*O*O+2)+M
},easeInQuart:function j(O,M,N,L){return N*(O/=L)*O*O*O+M},easeOutQuart:function J(O,M,N,L){return -N*((O=O/L-1)*O*O*O-1)+M
},easeInOutQuart:function H(O,M,N,L){if((O/=L/2)<1){return N/2*O*O*O*O+M}return -N/2*((O-=2)*O*O*O-2)+M
},easeInQuint:function m(O,M,N,L){return N*(O/=L)*O*O*O*O+M},easeOutQuint:function a(O,M,N,L){return N*((O=O/L-1)*O*O*O*O+1)+M
},easeInOutQuint:function I(O,M,N,L){if((O/=L/2)<1){return N/2*O*O*O*O*O+M}return N/2*((O-=2)*O*O*O*O+2)+M
},easeInSine:function r(O,M,N,L){return -N*Math.cos(O/L*(Math.PI/2))+N+M},easeOutSine:function f(O,M,N,L){return N*Math.sin(O/L*(Math.PI/2))+M
},easeInOutSine:function B(O,M,N,L){return -N/2*(Math.cos(Math.PI*O/L)-1)+M},easeInExpo:function c(O,M,N,L){return(O===0)?M:N*Math.pow(2,10*(O/L-1))+M
},easeOutExpo:function E(O,M,N,L){return(O===L)?M+N:N*(-Math.pow(2,-10*O/L)+1)+M
},easeInOutExpo:function p(O,M,N,L){if(O===0){return M}if(O===L){return M+N}if((O/=L/2)<1){return N/2*Math.pow(2,10*(O-1))+M
}return N/2*(-Math.pow(2,-10*--O)+2)+M},easeInCirc:function t(O,M,N,L){return -N*(Math.sqrt(1-(O/=L)*O)-1)+M
},easeOutCirc:function g(O,M,N,L){return N*Math.sqrt(1-(O=O/L-1)*O)+M},easeInOutCirc:function C(O,M,N,L){if((O/=L/2)<1){return -N/2*(Math.sqrt(1-O*O)-1)+M
}return N/2*(Math.sqrt(1-(O-=2)*O)+1)+M},easeInElastic:function A(P,R,N,Q){var M=1.70158;
var O=0;var L=N;if(P===0){return R}if((P/=Q)===1){return R+N}if(!O){O=Q*0.3}if(L<Math.abs(N)){L=N;
M=O/4}else{M=O/(2*Math.PI)*Math.asin(N/L)}return -(L*Math.pow(2,10*(P-=1))*Math.sin((P*Q-M)*(2*Math.PI)/O))+R
},easeOutElastic:function z(P,R,N,Q){var M=1.70158;var O=0;var L=N;if(P===0){return R
}if((P/=Q)===1){return R+N}if(!O){O=Q*0.3}if(L<Math.abs(N)){L=N;M=O/4}else{M=O/(2*Math.PI)*Math.asin(N/L)
}return L*Math.pow(2,-10*P)*Math.sin((P*Q-M)*(2*Math.PI)/O)+N+R},easeInOutElastic:function D(P,R,N,Q){var M=1.70158;
var O=0;var L=N;if(P===0){return R}if((P/=Q/2)===2){return R+N}if(!O){O=Q*(0.3*1.5)
}if(L<Math.abs(N)){L=N;M=O/4}else{M=O/(2*Math.PI)*Math.asin(N/L)}if(P<1){return -0.5*(L*Math.pow(2,10*(P-=1))*Math.sin((P*Q-M)*(2*Math.PI)/O))+R
}return L*Math.pow(2,-10*(P-=1))*Math.sin((P*Q-M)*(2*Math.PI)/O)*0.5+N+R},easeInBack:function w(O,L,N,P,M){if(M===undefined){M=1.70158
}return N*(O/=P)*O*((M+1)*O-M)+L},easeOutBack:function l(O,L,N,P,M){if(M===undefined){M=1.70158
}return N*((O=O/P-1)*O*((M+1)*O+M)+1)+L},easeInOutBack:function G(O,L,N,P,M){if(M===undefined){M=1.70158
}if((O/=P/2)<1){return N/2*(O*O*(((M*=(1.525))+1)*O-M))+L}return N/2*((O-=2)*O*(((M*=(1.525))+1)*O+M)+2)+L
},easeInBounce:function v(O,M,N,L){return N-x.easeOutBounce(L-O,0,N,L)+M},easeOutBounce:function k(O,M,N,L){if((O/=L)<(1/2.75)){return N*(7.5625*O*O)+M
}else{if(O<(2/2.75)){return N*(7.5625*(O-=(1.5/2.75))*O+0.75)+M}else{if(O<(2.5/2.75)){return N*(7.5625*(O-=(2.25/2.75))*O+0.9375)+M
}else{return N*(7.5625*(O-=(2.625/2.75))*O+0.984375)+M}}}},easeInOutBounce:function o(O,M,N,L){if(O<L/2){return x.easeInBounce(O*2,0,N,L)*0.5+M
}return x.easeOutBounce(O*2-L,0,N,L)*0.5+N*0.5+M}};d.exports=x},{}],102:[function(b,c,a){
/*! MIT License
 *
 * KeySpline - use bezier curve for transition easing function
 * Copyright (c) 2012 Gaetan Renaudeau <renaudeau.gaetan@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
;
function d(o,l,n,j){this.get=function(p){if(o===l&&n===j){return p}return g(k(p),l,j)
};function i(p,q){return 1-3*q+3*p}function h(p,q){return 3*q-6*p}function f(p){return 3*p
}function g(r,p,q){return((i(p,q)*r+h(p,q))*r+f(p))*r}function m(r,p,q){return 3*i(p,q)*r*r+2*h(p,q)*r+f(p)
}function k(t){var q=t;for(var r=0;r<4;++r){var u=m(q,o,n);if(u===0){return q}var p=g(q,o,n)-t;
q-=p/u}return q}}c.exports=d},{}],103:[function(b,c,a){c.exports={isNum:function(d){return typeof d==="number"
},isArray:function(f){var d=Object.prototype.toString;return d.call(f)==="[object Array]"
},addClass:function(d,f){d.classList.add(f)},removeClass:function(d,f){d.classList.remove(f)
},hasClass:function(d,f){return d.contains(f)},defaults:function(g,f){var d={};
f=f||{};for(var h in g){if(g.hasOwnProperty(h)){d[h]=(f[h]!=null)?f[h]:g[h]}}return d
},defaultProps:function(h,g,d){var f=this.defaults(g,d);for(var i in f){if(f.hasOwnProperty(i)){h[i]=f[i]
}}},invoke:function(g,d){var f=[].slice.call(arguments,2);if(!Array.isArray(g)){throw new Error("List is not an array")
}g.forEach(function(h){var i=h[d];if(i&&typeof i==="function"){i.apply(h,f)}})}}
},{}],104:[function(b,c,a){c.exports={flatten:b("./ac-array/flatten"),intersection:b("./ac-array/intersection"),toArray:b("./ac-array/toArray"),union:b("./ac-array/union"),unique:b("./ac-array/unique"),without:b("./ac-array/without")}
},{"./ac-array/flatten":105,"./ac-array/intersection":106,"./ac-array/toArray":107,"./ac-array/union":108,"./ac-array/unique":109,"./ac-array/without":110}],105:[function(b,c,a){c.exports=function d(h){var f=[];
var g=function(i){if(Array.isArray(i)){i.forEach(g)}else{f.push(i)}};h.forEach(g);
return f}},{}],106:[function(b,c,a){c.exports=function d(n){if(!n){return[]}var m=arguments.length;
var k=0;var g=n.length;var f=[];var l;for(k;k<g;k++){l=n[k];if(f.indexOf(l)>-1){continue
}for(var h=1;h<m;h++){if(arguments[h].indexOf(l)<0){break}}if(h===m){f.push(l)}}return f
}},{}],107:[function(b,d,a){d.exports=function c(f){return Array.prototype.slice.call(f)
}},{}],108:[function(b,c,a){var g=b("./flatten");var f=b("./unique");c.exports=function d(h){return f(g(Array.prototype.slice.call(arguments)))
}},{"./flatten":105,"./unique":109}],109:[function(b,c,a){c.exports=function d(g){var f=function(h,i){if(h.indexOf(i)<0){h.push(i)
}return h};return g.reduce(f,[])}},{}],110:[function(b,d,a){d.exports=function c(f,n,m){var k;
var h=f.indexOf(n);var l=f.length;if(h>=0){if(m){k=f.slice(0,l);var j,g=0;for(j=h;
j<l;j++){if(f[j]===n){k.splice(j-g,1);g++}}}else{if(h===(l-1)){k=f.slice(0,(l-1))
}else{if(h===0){k=f.slice(1)}else{k=f.slice(0,h);k=k.concat(f.slice(h+1))}}}}else{return f
}return k}},{}],111:[function(b,c,a){c.exports=b(23)},{}],112:[function(b,c,a){c.exports=b(24)
},{"./ac-object/clone":113,"./ac-object/defaults":114,"./ac-object/extend":115,"./ac-object/getPrototypeOf":116,"./ac-object/isEmpty":117,"./ac-object/toQueryParameters":118}],113:[function(b,c,a){c.exports=b(25)
},{"./extend":115}],114:[function(b,c,a){c.exports=b(26)},{"./extend":115}],115:[function(b,c,a){c.exports=b(27)
},{}],116:[function(b,c,a){c.exports=b(28)},{}],117:[function(b,c,a){c.exports=b(29)
},{}],118:[function(b,c,a){c.exports=b(30)},{qs:111}],119:[function(b,c,a){c.exports.ElementEngagement=b("./ac-element-engagement/ElementEngagement")
},{"./ac-element-engagement/ElementEngagement":120}],120:[function(f,c,i){var j;
var h=f("ac-object");var k=f("ac-base").Element;var l=f("ac-array");var m=f("ac-base").onDOMReady;
var b=f("ac-element-tracker").ElementTracker;var n=f("ac-event-emitter").EventEmitter;
var g={dataAttribute:"element-engagement",autoStart:false,autoSelect:true};var d={thresholdEnterTime:0,thresholdExitTime:0,engaged:false,timeToEngage:1000,tracking:true,trackOnce:true};
var a=function(o){var p;o=o||{};p=(o.elements&&o.elements.length)?o.elements:[];
delete o.elements;this.options=h.defaults(g,o);this.tracking=false;this.elements=[];
this.elementTracker=new b();this._collectElementsToTrack(p);if(this.options.autoStart===true&&this.elements.length>0){this.start()
}};j=a.prototype=new n();j._collectElementsToTrack=function(q){var p;var o=[];if(this.options.autoSelect){o=k.selectAll("[data-"+this.options.dataAttribute+"]")
}p=l.union(q,o);if(p.length>0){this.elementTracker.addElements(p);this.elements=this.elementTracker.elements;
this._decorateTrackedElements()}};j._decorateTrackedElements=function(){var o;this.elements.forEach(function(p){var q=this._dataAttributeToObject(p);
q=this._castDataAttributeOptions(q);o=h.defaults(d,q);h.extend(p,o)},this)};j._castDataAttributeOptions=function(p){var o;
var r;var q;p=h.clone(p);if(p.inViewThreshold&&typeof p.inViewThreshold!=="number"){o=parseFloat(p.inViewThreshold,10);
if(!isNaN(o)){p.inViewThreshold=o}else{delete p.inViewThreshold}}if(p.timeToEngage&&typeof p.timeToEngage!=="number"){r=parseInt(p.timeToEngage,10);
if(!isNaN(r)){p.timeToEngage=r}else{delete p.timeToEngage}}if(p.trackOnce&&typeof p.trackOnce!=="boolean"){if(p.trackOnce==="false"){p.trackOnce=false
}else{delete p.trackOnce}}return p};j._attachElementListeners=function(o){o.on("thresholdenter",this._thresholdEnter,this);
o.on("thresholdexit",this._thresholdExit,this)};j._removeElementListeners=function(o){o.off("thresholdenter",this._thresholdEnter);
o.off("thresholdexit",this._thresholdExit)};j._attachAllElementListeners=function(){this.elements.forEach(function(o){if(!o.trackOnce){this._attachElementListeners(o)
}else{if(!o.engaged){this._attachElementListeners(o)}}},this)};j._removeAllElementListeners=function(){this.elements.forEach(function(o){this._removeElementListeners(o)
},this)};j._thresholdEnter=function(o){o.thresholdEnterTime=Date.now();o.thresholdExitTime=0;
this.trigger("thresholdenter",o)};j._thresholdExit=function(o){o.thresholdExitTime=Date.now();
o.engaged=this._wasElementEngaged(o);this.trigger("thresholdexit",o)};j._wasElementEngaged=function(p){var q;
var t=false;var r=p.thresholdEnterTime;var o=p.thresholdExitTime;if(r>0&&o>0){q=o-r;
t=q>=p.timeToEngage}if(t){this._elementEngaged(p);this.trigger("engaged",p)}return t
};j._elementEngaged=function(o){o.engaged=true;if(o.trackOnce){this.stop(o)}};j._dataAttributeToObject=function(r){var q=r.element;
var t=q.getAttribute("data-"+this.options.dataAttribute);var o;var p={};var u;if(t&&t.length>0){o=t.split(",");
if(o&&o.length>0){o.forEach(function(v){u=v.split(":");p[u[0]]=u[1]})}}return p
};j.stop=function(o){if(this.tracking&&!o){this.tracking=false;this.elementTracker.stop();
this._removeAllElementListeners()}if(o&&o.tracking){o.tracking=false;this._removeElementListeners(o)
}};j.start=function(o){if(!this.tracking&&!o){this.tracking=true;this._attachAllElementListeners();
this.elementTracker.start()}if(o&&!o.tracking){if(!o.trackOnce){o.tracking=true;
this._attachElementListeners(o)}else{if(!o.engaged){o.tracking=true;this._attachElementListeners(o)
}}}};c.exports=a},{"ac-array":104,"ac-base":false,"ac-element-tracker":134,"ac-object":112}],121:[function(b,c,a){c.exports.DOMEmitter=b("./ac-dom-emitter/DOMEmitter")
},{"./ac-dom-emitter/DOMEmitter":122}],122:[function(b,c,a){var g;var f=b("ac-event-emitter").EventEmitter;
var d="dom-emitter";function h(i){if(i===null){return}this.el=i;this._bindings={};
this._eventEmitter=new f()}g=h.prototype;g._parseEventNames=function(i){if(!i){return[i]
}return i.split(" ")};g._onListenerEvent=function(j,i){this.trigger(j,i,false)};
g._setListener=function(i){this._bindings[i]=this._onListenerEvent.bind(this,i);
this._addEventListener(i,this._bindings[i])};g._removeListener=function(i){this._removeEventListener(i,this._bindings[i]);
delete this._bindings[i]};g._addEventListener=function(j,k,i){if(this.el.addEventListener){this.el.addEventListener(j,k,i)
}else{if(this.el.attachEvent){this.el.attachEvent("on"+j,k)}else{target["on"+j]=k
}}return this};g._removeEventListener=function(j,k,i){if(this.el.removeEventListener){this.el.removeEventListener(j,k,i)
}else{this.el.detachEvent("on"+j,k)}return this};g._triggerInternalEvent=function(i,j){this.trigger(d+":"+i,j)
};g.on=function(i,k,j){i=this._parseEventNames(i);i.forEach(function(n,m,l){if(!this.has(l)){this._setListener(l)
}this._triggerInternalEvent("willon",{evt:l,callback:n,context:m});this._eventEmitter.on(l,n,m);
this._triggerInternalEvent("didon",{evt:l,callback:n,context:m})}.bind(this,k,j));
return this};g.off=function(i,l,k){var j=Array.prototype.slice.call(arguments,0);
i=this._parseEventNames(i);i.forEach(function(q,p,n,m){if(n.length===0){this._eventEmitter.off();
var o;for(o in this._bindings){if(this._bindings.hasOwnProperty(o)){this._removeListener(o)
}}return}this._triggerInternalEvent("willoff",{evt:m,callback:q,context:p});this._eventEmitter.off(m,q,p);
this._triggerInternalEvent("didoff",{evt:m,callback:q,context:p});if(!this.has(m)){this._removeListener(m)
}}.bind(this,l,k,j));return this};g.once=function(i,k,j){i=this._parseEventNames(i);
i.forEach(function(n,m,l){if(!this.has(l)){this._setListener(l)}this._triggerInternalEvent("willonce",{evt:l,callback:n,context:m});
this._eventEmitter.once.call(this,l,n,m);this._triggerInternalEvent("didonce",{evt:l,callback:n,context:m})
}.bind(this,k,j));return this};g.has=function(i,k,j){if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};g.trigger=function(i,j,k){i=this._parseEventNames(i);i.forEach(function(m,n,l){this._eventEmitter.trigger(l,m,n)
}.bind(this,j,k));return this};g.destroy=function(){this._triggerInternalEvent("willdestroy");
this.off();this.el=this._eventEmitter=this._bindings=null};c.exports=h},{}],123:[function(b,c,a){c.exports=b(23)
},{}],124:[function(b,c,a){c.exports=b(24)},{"./ac-object/clone":125,"./ac-object/defaults":126,"./ac-object/extend":127,"./ac-object/getPrototypeOf":128,"./ac-object/isEmpty":129,"./ac-object/toQueryParameters":130}],125:[function(b,c,a){c.exports=b(25)
},{"./extend":127}],126:[function(b,c,a){c.exports=b(26)},{"./extend":127}],127:[function(b,c,a){c.exports=b(27)
},{}],128:[function(b,c,a){c.exports=b(28)},{}],129:[function(b,c,a){c.exports=b(29)
},{}],130:[function(b,c,a){c.exports=b(30)},{qs:123}],131:[function(b,c,a){c.exports.WindowDelegate=b("./window-delegate/WindowDelegate");
c.exports.windowEmitter=b("./window-delegate/windowEmitter")},{"./window-delegate/WindowDelegate":132,"./window-delegate/windowEmitter":133}],132:[function(c,f,a){var g;
var b=c("./windowEmitter");function d(){this._emitter=b;this._setWindowDimensionValues();
this._setScrollValues();this.on("resize",this._setWindowDimensionValues.bind(this));
this.on("scroll",this._setScrollValues.bind(this));this.on("touchstart",this._touchScrollStart.bind(this));
this.on("touchend",this._setZoomValues.bind(this))}g=d.prototype;g.on=function(){this._emitter.on.apply(this._emitter,arguments);
return this};g.once=function(){this._emitter.once.apply(this._emitter,arguments);
return this};g.off=function(){this._emitter.off.apply(this._emitter,arguments);
return this};g.has=function(){return this._emitter.has.apply(this._emitter,arguments)
};g.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};g.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};g.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};g.isZoomed=function(){return this.clientWidth>this.innerWidth};g._setWindowDimensionValues=function(){this.clientWidth=document.documentElement.clientWidth;
this.clientHeight=document.documentElement.clientHeight;this.innerWidth=window.innerWidth||this.clientWidth;
this.innerHeight=window.innerHeight||this.clientHeight};g._setZoomValues=function(){var h=this.innerWidth;
this.innerWidth=window.innerWidth;if(h!==this.innerWidth){this.innerHeight=window.innerHeight;
this.trigger("zoom");if(h<this.innerWidth){this.trigger("zoomIn")}else{this.trigger("zoomOut")
}}else{setTimeout(this._setZoomValues.bind(this),500)}};g._updateScrollX=function(){this.scrollX=(window.pageXOffset!==undefined)?window.pageXOffset:(document.documentElement||document.body.parentNode||document.body).scrollLeft;
this.maxScrollX=document.body.scrollWidth-this.innerWidth;return this.scrollX};
g._updateScrollY=function(){this.scrollY=(window.pageYOffset!==undefined)?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop;
this.maxScrollY=document.body.scrollHeight-this.innerHeight;return this.scrollY
};g._setScrollValues=function(){var i=this.scrollX,h=this.scrollY;this._updateScrollX();
this._updateScrollY();if(this.scrollX!==i){this.trigger("scrollX")}if(this.scrollY!==h){this.trigger("scrollY")
}this._scrollStop()};g._scrollStop=function(){if(typeof window.ontouchstart==="undefined"){if(this._scrollStopTimer){clearTimeout(this._scrollStopTimer)
}this._scrollStopTimer=setTimeout(function(){clearTimeout(this._scrollStopTimer);
this.trigger("scrollStop")}.bind(this),300)}};g._touchScrollStart=function(){this._updateScrollX();
this._updateScrollY();this.once("touchend",this._touchScrollStop.bind(this,this.scrollX,this.scrollY))
};g._touchScrollStop=function(i,h,j){this._updateScrollX();this._updateScrollY();
if(i!==this.scrollX||h!==this.scrollY){setTimeout(this._touchScrollStop.bind(this,this.scrollX,this.scrollY,true),300)
}else{if(j){this.trigger("scrollStop")}}};f.exports=new d()},{"./windowEmitter":133}],133:[function(b,c,a){var d=b("ac-dom-emitter").DOMEmitter;
c.exports=new d(window)},{"ac-dom-emitter":121}],134:[function(b,c,a){var d=b("./ac-element-tracker/ElementTracker");
c.exports=new d();c.exports.ElementTracker=d},{"./ac-element-tracker/ElementTracker":135}],135:[function(c,b,g){var h;
var f=c("ac-object");var i=c("ac-base").Element;var k=c("ac-base").Array;var m=c("window-delegate").WindowDelegate;
var j=c("./TrackedElement");var d={autoStart:false};function a(o,n){this.options=f.clone(d);
this.options=typeof n==="object"?f.extend(this.options,n):this.options;this.windowDelegate=m;
this.tracking=false;this.elements=[];if(o&&(Array.isArray(o)||this._isNodeList(o)||i.isElement(o))){this.addElements(o)
}if(this.options.autoStart===true){this.start()}}h=a.prototype;var l=/^\[object (HTMLCollection|NodeList|Object)\]$/;
h._isNodeList=function(n){if(!n){return false}if(typeof n.length!=="number"){return false
}if(typeof n[0]==="object"&&(!n[0]||!n[0].nodeType)){return false}return l.test(Object.prototype.toString.call(n))
};h._registerElements=function(n){n=[].concat(n);n.forEach(function(p){if(this._elementInDOM(p)){var o=new j(p);
o.offsetTop=o.element.offsetTop;this.elements.push(o)}},this)};h._registerTrackedElementObjects=function(o){var n=[].concat(o);
n.forEach(function(p){if(this._elementInDOM(p.element)){p.offsetTop=p.element.offsetTop;
this.elements.push(p)}},this)};h._elementInDOM=function(p){var o=false;var n=document.getElementsByTagName("body")[0];
if(i.isElement(p)&&n.contains(p)){o=true}return o};h._onScroll=function(){this.elements.forEach(function(n){this.refreshElementState(n)
},this)};h._onResize=function(){this.elements.forEach(function(n){this.refreshElementState(n)
},this)};h._elementPercentInView=function(n){return n.pixelsInView/n.height};h._elementPixelsInView=function(o){var r=0;
var q=o.top;var p=o.bottom;var n=this.windowDelegate.innerHeight;if(q<=0&&p>=n){r=n
}else{if(q>=0&&q<n&&p>n){r=n-q}else{if(q<0&&(p<n&&p>=0)){r=o.bottom}else{if(q>=0&&p<=n){r=o.height
}}}}return r};h._isElementOrObject=function(n){return n&&(i.isElement(n)||(typeof n==="object"&&!Array.isArray(n)&&!this._isNodeList(n)))
};h._ifInView=function(n,p,o){if(!p){n.trigger("enterview",n)}if(!o&&n.percentInView>n.inViewThreshold){n.inThreshold=true;
n.trigger("thresholdenter",n)}};h._ifAlreadyInView=function(n,o){if(!n.inView){n.trigger("exitview",n)
}if(o&&n.percentInView<n.inViewThreshold){n.inThreshold=false;n.trigger("thresholdexit",n)
}};h.addElements=function(n){n=this._isNodeList(n)?k.toArray(n):[].concat(n);n.forEach(function(o){this.addElement(o)
},this)};h.addElement=function(o){var n;if(this._isElementOrObject(o)){n=new j(o);
this._registerTrackedElementObjects(n)}else{throw new TypeError("ElementTracker.addElement: "+o+"must be a valid Element or Object")
}return n};h.removeElement=function(p){var o=[];var n;this.elements.forEach(function(q,r){if(q===p||q.element===p){o.push(r)
}});n=this.elements.filter(function(r,q){return o.indexOf(q)<0?true:false});this.elements=n
};h.stop=function(){if(this.tracking===true){this.tracking=false;this.windowDelegate.off("scroll",this._onScroll);
this.windowDelegate.off("resize",this._onResize)}};h.start=function(){if(this.tracking===false){this.tracking=true;
this.windowDelegate.on("scroll",this._onScroll,this);this.windowDelegate.on("resize",this._onResize,this);
this.refreshAllElementStates()}};h.refreshAllElementStates=function(){this.elements.forEach(function(n){this.refreshElementState(n)
},this)};h.refreshElementState=function(n){var p=i.getBoundingBox(n.element);var q=n.inView;
var o=n.inThreshold;n=f.extend(n,p);n.pixelsInView=this._elementPixelsInView(n);
n.percentInView=this._elementPercentInView(n);n.inView=n.pixelsInView>0;if(n.inView){this._ifInView(n,q,o)
}if(q){this._ifAlreadyInView(n,o)}return n};b.exports=a},{"./TrackedElement":136,"ac-base":false,"ac-object":124,"window-delegate":131}],136:[function(b,c,a){var d;
var h=b("ac-dom-emitter").DOMEmitter;var g={inViewThreshold:0.75};function f(j){var i={};
var k;if(j.nodeType&&j.nodeType>0){i.element=j}else{i=j}for(k in g){this[k]=g[k]
}for(k in i){this[k]=i[k]}this.inView=false;this.inThreshold=false;this.percentInView=0;
this.pixelsInView=0;this.offsetTop=0;this.top=0;this.right=0;this.bottom=0;this.left=0;
this.width=0;this.height=0;h.call(this,i.element)}d=f.prototype=new h(null);c.exports=f
},{"ac-dom-emitter":121}],137:[function(c,d,b){var a=c("./ac-keyboard/Keyboard");
d.exports=new a();d.exports.Keyboard=a;d.exports.keys=c("./ac-keyboard/keymap")
},{"./ac-keyboard/Keyboard":139,"./ac-keyboard/keymap":140}],138:[function(d,f,b){var c=d("ac-base").Object;
var a=["keyLocation"];function g(h){this.originalEvent=h;for(var i in h){if(typeof h[i]!=="function"&&a.indexOf(i)===-1){this[i]=h[i]
}}this.location=(this.originalEvent.keyLocation===undefined)?this.originalEvent.location:this.originalEvent.keyLocation
}g.prototype={preventDefault:function(){if(typeof this.originalEvent.preventDefault!=="function"){this.originalEvent.returnValue=false;
return}return this.originalEvent.preventDefault()},stopPropagation:function(){return this.originalEvent.stopPropagation()
}};f.exports=g},{"ac-base":false}],139:[function(f,c,h){var j=f("ac-base").Element;
var g=f("./KeyEvent");var n=f("ac-event-emitter").EventEmitter;var k=f("./keymap");
var l=0;var d=1;var a=2;var m=3;var i;function b(){this._keysDown=[];this._keyDownEmitter=new n();
this._keyUpEmitter=new n();j.addEventListener(document,"keydown",this._DOMKeyDown.bind(this),true);
j.addEventListener(document,"keyup",this._DOMKeyUp.bind(this),true);this._listening=[]
}i=b.prototype;i._castEventNameNumberToString=function(o){if(typeof o==="number"){return o.toString()
}return o};i._DOMKeyDown=function(p){var o=this._normalizeKeyboardEvent(p);var q=o.keyCode;
this._trackKeyDown(q);this._keyDownEmitter.trigger(q.toString(),o)};i._DOMKeyUp=function(p){var o=this._normalizeKeyboardEvent(p);
var q=o.keyCode;this._trackKeyUp(q);this._keyUpEmitter.trigger(q.toString(),o)};
i.addKeyDown=function(){var o=Array.prototype.slice.call(arguments);var p=o.shift();
if(p===undefined){throw new TypeError('Could not listen for keyup event on "'+p+'"')
}p=this._castEventNameNumberToString(p);return this._keyDownEmitter.on.apply(this._keyDownEmitter,[p].concat(o))
};i.addKeyUp=function(){var o=Array.prototype.slice.call(arguments);var p=o.shift();
if(p===undefined){throw new TypeError('Could not listen for keyup event on "'+p+'"')
}p=this._castEventNameNumberToString(p);return this._keyUpEmitter.on.apply(this._keyUpEmitter,[p].concat(o))
};i.removeKeyDown=function(){var o=Array.prototype.slice.call(arguments);var p=o.shift();
p=this._castEventNameNumberToString(p);return this._keyDownEmitter.off.apply(this._keyDownEmitter,[p].concat(o))
};i.removeKeyUp=function(){var o=Array.prototype.slice.call(arguments);var p=o.shift();
p=this._castEventNameNumberToString(p);return this._keyUpEmitter.off.apply(this._keyUpEmitter,[p].concat(o))
};i.isDown=function(o){return(this._keysDown.indexOf(o)!==-1)};i.isUp=function(o){return !this.isDown(o)
};i._trackKeyUp=function(p){var o=this._keysDown.indexOf(p);if(o!==-1){this._keysDown.splice(o,1)
}};i._trackKeyDown=function(o){if(this._keysDown.indexOf(o)===-1){this._keysDown.push(o)
}};i._normalizeKeyboardEvent=function(o){return new g(o)};c.exports=b},{"./KeyEvent":138,"./keymap":140,"ac-base":false}],140:[function(b,c,a){c.exports={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CONTROL:17,ALT:18,COMMAND:91,CAPSLOCK:20,ESCAPE:27,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,NUMPAD_ZERO:96,NUMPAD_ONE:97,NUMPAD_TWO:98,NUMPAD_THREE:99,NUMPAD_FOUR:100,NUMPAD_FIVE:101,NUMPAD_SIX:102,NUMPAD_SEVEN:103,NUMPAD_EIGHT:104,NUMPAD_NINE:105,NUMPAD_ASTERISK:106,NUMPAD_PLUS:107,NUMPAD_DASH:109,NUMPAD_DOT:110,NUMPAD_SLASH:111,NUMPAD_EQUALS:187,TICK:192,LEFT_BRACKET:219,RIGHT_BRACKET:221,BACKSLASH:220,SEMICOLON:186,APOSTRAPHE:222,SPACEBAR:32,CLEAR:12,COMMA:188,DOT:190,SLASH:191}
},{}],141:[function(c,d,b){var g=c("./utils/addEventListener");var a=c("./shared/getEventType");
d.exports=function f(k,i,j,h){i=a(k,i);return g(k,i,j,h)}},{"./shared/getEventType":151,"./utils/addEventListener":155}],142:[function(d,f,c){var a=d("./utils/dispatchEvent");
var b=d("./shared/getEventType");f.exports=function g(j,i,h){i=b(j,i);return a(j,i,h)
}},{"./shared/getEventType":151,"./utils/dispatchEvent":156}],143:[function(b,c,a){c.exports={addEventListener:b("./addEventListener"),dispatchEvent:b("./dispatchEvent"),preventDefault:b("./preventDefault"),removeEventListener:b("./removeEventListener"),stop:b("./stop"),stopPropagation:b("./stopPropagation"),target:b("./target")}
},{"./addEventListener":141,"./dispatchEvent":142,"./preventDefault":149,"./removeEventListener":150,"./stop":152,"./stopPropagation":153,"./target":154}],144:[function(b,c,a){if(document.createEvent){try{new window.CustomEvent("click")
}catch(d){window.CustomEvent=(function(){function f(h,i){i=i||{bubbles:false,cancelable:false,detail:undefined};
var g=document.createEvent("CustomEvent");g.initCustomEvent(h,i.bubbles,i.cancelable,i.detail);
return g}f.prototype=window.Event.prototype;return f}())}}},{}],145:[function(g,i,d){var h=g("./utils/eventTypeAvailable");
var b=g("./shared/camelCasedEventTypes");var f=g("./shared/prefixHelper");var c={};
i.exports=function a(l,k){var m;var n;var j;k=k||"div";l=l.toLowerCase();if(!(k in c)){c[k]={}
}n=c[k];if(l in n){return n[l]}if(h(l,k)){return n[l]=l}if(l in b){for(j=0;j<b[l].length;
j++){m=b[l][j];if(h(m.toLowerCase(),k)){return n[l]=m}}}for(j=0;j<f.evt.length;
j++){m=f.evt[j]+l;if(h(m,k)){f.reduce(j);return n[l]=m}}return n[l]=false}},{"./shared/camelCasedEventTypes":146,"./shared/prefixHelper":147,"./utils/eventTypeAvailable":148}],146:[function(b,c,a){c.exports={transitionend:["webkitTransitionEnd","MSTransitionEnd"],animationstart:["webkitAnimationStart","MSAnimationStart"],animationend:["webkitAnimationEnd","MSAnimationEnd"],animationiteration:["webkitAnimationIteration","MSAnimationIteration"],fullscreenchange:["MSFullscreenChange"],fullscreenerror:["MSFullscreenError"]}
},{}],147:[function(b,d,a){var i=["-webkit-","-moz-","-ms-"];var f=["Webkit","Moz","ms"];
var h=["webkit","moz","ms"];var c=function(){this.initialize()};var g=c.prototype;
g.initialize=function(){this.reduced=false;this.css=i;this.dom=f;this.evt=h};g.reduce=function(j){if(!this.reduced){this.reduced=true;
this.css=[this.css[j]];this.dom=[this.dom[j]];this.evt=[this.evt[j]]}};d.exports=new c()
},{}],148:[function(c,f,b){var a={window:window,document:document};f.exports=function d(i,g){var h;
i="on"+i;if(!(g in a)){a[g]=document.createElement(g)}h=a[g];if(i in h){return true
}if("setAttribute" in h){h.setAttribute(i,"return;");return(typeof h[i]==="function")
}return false}},{}],149:[function(c,d,a){d.exports=function b(f){f=f||window.event;
if(f.preventDefault){f.preventDefault()}else{f.returnValue=false}}},{}],150:[function(d,f,c){var b=d("./utils/removeEventListener");
var a=d("./shared/getEventType");f.exports=function g(k,i,j,h){i=a(k,i);return b(k,i,j,h)
}},{"./shared/getEventType":151,"./utils/removeEventListener":157}],151:[function(c,f,b){var d=c("ac-prefixer/getEventType");
f.exports=function a(j,i){var h;var g;if("tagName" in j){h=j.tagName}else{if(j===window){h="window"
}else{h="document"}}g=d(i,h);if(g){return g}return i}},{"ac-prefixer/getEventType":145}],152:[function(d,g,b){var a=d("./stopPropagation");
var c=d("./preventDefault");g.exports=function f(h){h=h||window.event;a(h);c(h);
h.stopped=true;h.returnValue=false}},{"./preventDefault":149,"./stopPropagation":153}],153:[function(c,d,b){d.exports=function a(f){f=f||window.event;
if(f.stopPropagation){f.stopPropagation()}else{f.cancelBubble=true}}},{}],154:[function(b,c,a){c.exports=function d(f){f=f||window.event;
return(typeof f.target!=="undefined")?f.target:f.srcElement}},{}],155:[function(b,c,a){c.exports=function d(i,g,h,f){if(i.addEventListener){i.addEventListener(g,h,!!f)
}else{i.attachEvent("on"+g,h)}return i}},{}],156:[function(b,c,a){b("ac-polyfills/CustomEvent");
c.exports=function d(i,h,g){var f;if(i.dispatchEvent){if(g){f=new CustomEvent(h,g)
}else{f=new CustomEvent(h)}i.dispatchEvent(f)}else{f=document.createEventObject();
if(g&&"detail" in g){f.detail=g.detail}i.fireEvent("on"+h,f)}return i}},{"ac-polyfills/CustomEvent":144}],157:[function(b,c,a){c.exports=function d(i,g,h,f){if(i.removeEventListener){i.removeEventListener(g,h,!!f)
}else{i.detachEvent("on"+g,h)}return i}},{}],158:[function(c,d,b){var h=c("./extend");
var a=Object.prototype.hasOwnProperty;var f=function(i,j){var k;for(k in j){if(a.call(j,k)){if(j[k]===null){i[k]=null
}else{if(typeof j[k]==="object"){i[k]=Array.isArray(j[k])?[]:{};f(i[k],j[k])}else{i[k]=j[k]
}}}}return i};d.exports=function g(j,i){if(i){return f({},j)}return h({},j)}},{"./extend":161}],159:[function(b,d,a){var f=function(){};
d.exports=function c(g){if(arguments.length>1){throw new Error("Second argument not supported")
}if(g===null||typeof g!=="object"){throw new TypeError("Object prototype may only be an Object.")
}if(typeof Object.create==="function"){return Object.create(g)}else{f.prototype=g;
return new f()}}},{}],160:[function(b,c,a){var f=b("./extend");c.exports=function d(h,g){if(typeof h!=="object"){throw new TypeError("defaults: must provide a defaults object")
}g=g||{};if(typeof g!=="object"){throw new TypeError("defaults: options must be a typeof object")
}return f({},h,g)}},{"./extend":161}],161:[function(b,c,a){c.exports=b(27)},{}],162:[function(b,c,a){c.exports=b(28)
},{}],163:[function(b,c,a){c.exports={clone:b("./clone"),create:b("./create"),defaults:b("./defaults"),extend:b("./extend"),getPrototypeOf:b("./getPrototypeOf"),isDate:b("./isDate"),isEmpty:b("./isEmpty"),isRegExp:b("./isRegExp"),toQueryParameters:b("./toQueryParameters")}
},{"./clone":158,"./create":159,"./defaults":160,"./extend":161,"./getPrototypeOf":162,"./isDate":164,"./isEmpty":165,"./isRegExp":166,"./toQueryParameters":168}],164:[function(b,d,a){d.exports=function c(f){return Object.prototype.toString.call(f)==="[object Date]"
}},{}],165:[function(b,c,a){c.exports=b(29)},{}],166:[function(c,d,b){d.exports=function a(f){return window.RegExp?f instanceof RegExp:false
}},{}],167:[function(b,c,a){c.exports=b(23)},{}],168:[function(b,c,a){c.exports=b(30)
},{qs:167}],169:[function(b,c,a){a.ScrollView=b("./ac-scrollview/ScrollView");a.MouseWheel=b("./ac-scrollview/input/MouseWheel");
a.ScrollBounds=b("./ac-scrollview/ScrollBounds");a.Y_AXIS="y";a.X_AXIS="x"},{"./ac-scrollview/ScrollBounds":171,"./ac-scrollview/ScrollView":172,"./ac-scrollview/input/MouseWheel":175}],170:[function(c,d,a){var b=c("ac-object");
function f(g,h){this._parent=g;this._axis=h;this._inputs=[];this._startTouchMove=null;
this._shouldTouchEnd=false;this._checkToPreventDefault=false}f.prototype={_calculateTouchAngles:function(){var n={x:0,y:0};
var i=this._inputs[this._inputs.length-1];var k=this._inputs[0];var g=i.x-k.x;var m=i.y-k.y;
var l=Math.sqrt(g*g+m*m);if(l===0){return false}var j=Math.asin(m/l);var h=Math.acos(g/l);
n.x=j*(180/Math.PI);n.y=h*(180/Math.PI);n.y-=90;return n},inputStart:function(g,j,h,i){this._inputs=[{x:g,y:j}];
this._startTouchMove={x:g,y:j,timeStamp:h,e:i};this._shouldTouchEnd=false;this._checkToPreventDefault=true
},inputMove:function(g,n,j,k){this._inputs[1]={x:g,y:n};var h=45;var i=-h;var m=this._calculateTouchAngles();
var l=m[this._axis];if(l<=h&&l>=i||this._checkToPreventDefault===false){this._shouldTouchEnd=true;
this._checkToPreventDefault=false;if(this._startTouchMove!==null){this._parent.inputStart(this._startTouchMove.x,this._startTouchMove.y,this._startTouchMove.timeStamp,this._startTouchMove.e);
this._startTouchMove=null}k.preventDefault();this._parent.inputMove.apply(this._parent,arguments)
}},inputEnd:function(g,h){if(this._shouldTouchEnd===true){this._checkToPreventDefault=true;
this._parent.inputEnd.apply(this._parent,arguments)}},on:function(){return this._parent.on.apply(this._parent,arguments)
},off:function(){return this._parent.off.apply(this._parent,arguments)},trigger:function(){return this._parent.trigger.apply(this._parent,arguments)
},once:function(){return this._parent.once.apply(this._parent,arguments)}};d.exports=f
},{"ac-object":163}],171:[function(d,f,b){var c=d("ac-object");function a(k,j,h,g){var i={maxPerSwipe:1,axis:"x"};
this.options=c.extend(i,g||{});this._grid=h;this._scrollInertia=k;this._scrollView=this._scrollInertia.getScrollView();
this._runningIndex=j;this._axisString=(this.options.axis==="x")?"left":"top"}a.prototype={calculateTargetIndex:function(){var g=(this._axisString==="left")?this._scrollView.getTouchContainerWidth():this._scrollView.getTouchContainerHeight();
var i=Math.round(this._scrollInertia.calculateFinalInertiaPosition()[this._axisString]/g);
var h=this._runningIndex;var j=(i-h);if(j>0&&i>h+this.options.maxPerSwipe){i=h+this.options.maxPerSwipe
}else{if(j<0&&i<h-this.options.maxPerSwipe){i=h-this.options.maxPerSwipe}}if(j>0&&i>this._grid[this._axisString].length-1){i=this._grid[this._axisString].length-1
}else{if(j<0&&i<0){i=0}}return i},calculateFuturePositions:function(){var g=this.calculateTargetIndex();
return{left:g*this._scrollView.getTouchContainerWidth(),top:g*this._scrollView.getTouchContainerHeight()}
}};f.exports=a},{"ac-object":163}],172:[function(c,b,h){var d=c("ac-object");var n=c("ac-event-emitter").EventEmitter;
var m=c("./TouchInertia");var l=c("./input/MouseWheel");var k=c("./input/Touch");
var j=c("./input/Input");var i=c("./InputPreventDefault");var a=c("./model/Scroll");
var f={startBounceDistance:0,endBounceDistance:0,axis:"y",touch:true,mouseWheel:false,mouse:false,preventDefault:true};
function g(p,o){this.options=d.extend(d.clone(f),o||{});this._element=p;this._touchContainerWidth=(typeof this.options.containerWidth==="number")?this.options.containerWidth:p.offsetWidth;
this._touchContainerHeight=(this.options.containerHeight||p.offsetHeight);this._innerScrollWidth=(this.options.innerWidth||p.offsetWidth)+this.options.startBounceDistance+this.options.endBounceDistance;
this._innerScrollHeight=(this.options.innerHeight||p.offsetHeight)+this.options.startBounceDistance+this.options.endBounceDistance;
this._scroll=new a();this._scrollPositions=[];this._inputNormalize=new j(this._scroll);
this._inputNormalize=new i(this._inputNormalize,this.options.axis);this._inputNormalize.on("input_start",this.inputStart,this);
this._inputNormalize.on("input_move",this.inputMove,this);this._inputNormalize.on("input_end",this.inputEnd,this);
if(this.options.touch===true){this._touch=new k(this._inputNormalize,p);this._touch.bindDOMEvents()
}if(this.options.mouseWheel===true){this._mouseWheel=new l(this._inputNormalize,p);
this._mouseWheel.bindDOMEvents()}}g.prototype={};g.prototype.__playInertia=function(p){var o=p.calculateInertiaPositions();
var q=function(t){var r=o[t];if(r===undefined||this._down===true){return}this._scroll.scrollTo(r.left,r.top);
window.requestAnimationFrame(function(){q(t+1)})}.bind(this);q(0)};g.prototype.getTouchContainerHeight=function(){return this._touchContainerHeight
};g.prototype.getTouchContainerWidth=function(){return this._touchContainerWidth
};g.prototype.setInnerWidth=function(o){this._innerScrollWidth=o;return this};g.prototype.setInnerHeight=function(o){this._innerScrollHeight=o;
return this};g.prototype.getInnerScrollWidth=function(){return this._innerScrollWidth
};g.prototype.getInnerScrollHeight=function(){return this._innerScrollHeight};g.prototype.getScrollYDistance=function(){var o=this.getInnerScrollHeight()-this.getTouchContainerHeight()-(this.options.startBounceDistance+this.options.endBounceDistance);
if(o<0){o=0}return o};g.prototype.getScrollXDistance=function(){var o=this.getInnerScrollWidth()-this.getTouchContainerWidth()-(this.options.startBounceDistance+this.options.endBounceDistance);
if(o<0){o=0}return o};g.prototype.inputStart=function(o,r,q,p){this._down=true;
this.trigger("scrollStart",{originalEvent:p,timeStamp:q})};g.prototype.inputMove=function(p){var o=p.scrollLeft;
var q=p.scrollTop;if(p.originalEvent.type==="mousewheel"){if(q>this.getScrollYDistance()){q=this.getScrollYDistance()
}else{if(q<0){q=0}}if(o>this.getScrollXDistance()){o=this.getScrollXDistance()}else{if(o<0){o=0
}}}this._scrollPositions.push({left:o,top:q,timeStamp:p.timeStamp});this._scroll.scrollTo(o,q)
};g.prototype.inputEnd=function(q){var v=true;var p=this._scrollPositions;var w=[];
var t=this._scrollPositions[this._scrollPositions.length-1];var r=q.timeStamp;if(!t){return
}for(var u=0;u<p.length;u+=1){w[w.length]=p[u].left;w[w.length]=p[u].top;w[w.length]=p[u].timeStamp
}var o=new m(this,{left:this._scroll.scrollLeft,top:this._scroll.scrollTop},w,t.timeStamp,r);
this._down=false;this.trigger("inertiaStart",{originalEvent:q,originalEventName:"touchend",inertia:o,position:{left:this._scroll.scrollLeft,top:this._scroll.scrollTop},velocity:o.calculateVelocity(),preventDefault:function(){v=false
}});if(v===true){this.__playInertia(o)}this._scrollPositions=[]};g.prototype.once=function(){return this._scroll.once.apply(this._scroll,arguments)
};g.prototype.on=function(){return this._scroll.on.apply(this._scroll,arguments)
};g.prototype.off=function(){return this._scroll.off.apply(this._scroll,arguments)
};g.prototype.trigger=function(){return this._scroll.trigger.apply(this._scroll,arguments)
};g.prototype.scrollTo=function(p,o){return this._scroll.scrollTo(p,o)};b.exports=g
},{"./InputPreventDefault":170,"./TouchInertia":173,"./input/Input":174,"./input/MouseWheel":175,"./input/Touch":176,"./model/Scroll":177,"ac-object":163}],173:[function(d,f,b){var c=d("ac-object");
function a(i,l,g,k,h,j){var m={frictionCoefficient:0.95,minFrictionVelocity:0.1};
this.options=c.extend(m,j||{});this._scrollView=i;this._currentPosition=l;this.__scrollLeft=this._currentPosition.left;
this.__scrollTop=this._currentPosition.top;this._positions=g;this._lastTouchMove=k;
this._timeStamp=h;this._frameRate=(1000/60)}a.prototype={__stepThroughFriction:function(m,l){var n=m+this._frictionVelocityX;
var k=l+this._frictionVelocityY;if(Math.abs(this._frictionVelocityX)<=this.options.minFrictionVelocity){n=m
}if(Math.abs(this._frictionVelocityY)<=this.options.minFrictionVelocity){k=l}this._frictionVelocityX*=this.options.frictionCoefficient;
this._frictionVelocityY*=this.options.frictionCoefficient;var h=0;var g=0;var j=0.03;
var i=0.08;if(n<this._minScrollLeft){h=this._minScrollLeft-n}else{if(n>this._maxScrollLeft){h=this._maxScrollLeft-n
}}if(k<this._minScrollTop){g=this._minScrollTop-k}else{if(k>this._maxScrollTop){g=this._maxScrollTop-k
}}if(h!==0){if(h*this._frictionVelocityX<=0){this._frictionVelocityX+=h*j}else{this._frictionVelocityX=h*i
}}if(g!==0){if(g*this._frictionVelocityY<=0){this._frictionVelocityY+=g*j}else{this._frictionVelocityY=g*i
}}return{left:n,top:k}},getScrollView:function(){return this._scrollView},calculateInertiaDuration:function(){var g=this.calculateInertiaPositions();
return g.length*this._frameRate},calculateVelocity:function(){var m=this._positions;
var h=m.length-1;var n=h;for(var l=h;l>0&&m[l]>(this._lastTouchMove-100);l-=3){n=l
}var p=m[h]-m[n];var g=this.__scrollLeft-(m[n-2]);var o=this.__scrollTop-(m[n-1]);
var j=g/p*this._frameRate;var k=o/p*this._frameRate;if((this._timeStamp-this._lastTouchMove)>=100){j=0;
k=0}if(isNaN(j)){j=0}if(isNaN(k)){k=0}return{left:j,top:k}},calculateInertiaPositions:function(){this._minScrollLeft=0;
this._minScrollTop=0;this._maxScrollLeft=this._scrollView.getScrollXDistance();
this._maxScrollTop=this._scrollView.getScrollYDistance();var g=this._positions;
var m=[];var j=this.calculateVelocity();this._frictionVelocityX=j.left;this._frictionVelocityY=j.top;
var l=this.__scrollLeft;var k=this.__scrollTop;var h;var i=0;if(Math.abs(this._frictionVelocityX)<this.options.minFrictionVelocity&&Math.abs(this._frictionVelocityY)<this.options.minFrictionVelocity){h=this.__stepThroughFriction(l,k)
}while((Math.abs(this._frictionVelocityX)>=this.options.minFrictionVelocity||Math.abs(this._frictionVelocityY)>=this.options.minFrictionVelocity)){h=this.__stepThroughFriction(l,k);
l=h.left;k=h.top;m.push(h)}if(l<this._minScrollLeft){l=this._minScrollLeft}else{if(l>this._maxScrollLeft){l=this._maxScrollLeft
}}if(k<this._minScrollTop){k=this._minScrollTop}else{if(k>this._maxScrollTop){k=this._maxScrollTop
}}m[m.length-1]={left:l,top:k};return m},calculateFinalInertiaPosition:function(){var g=this.calculateInertiaPositions();
if(g.length===0){return{left:this.__scrollLeft,top:this.__scrollTop}}return g[g.length-1]
}};f.exports=a},{"ac-object":163}],174:[function(b,c,a){var f=b("ac-event-emitter").EventEmitter;
function g(h){this._startingInputPosition=null;this._lastInputPosition=null;this._inputPositions=[];
this._scroll=h}var d=g.prototype=new f();d.inputStart=function(h,l,j,i){var k={x:h,y:l,timeStamp:j};
this._inputPositions.push(k);this._startingInputPosition=k;this.trigger("input_start",{timeStamp:j,originalEvent:i})
};d.inputMove=function(h,m,k,i){var l={x:h,y:m,timeStamp:k};this._inputPositions.push(l);
this._lastInputPosition=l;var j=this.getScrollValues();this.trigger("input_move",{scrollLeft:j.x,scrollTop:j.y,timeStamp:k,originalEvent:i})
};d.inputEnd=function(i,h){this.trigger("input_end",{lastInputPosition:this._lastInputPosition,inputPositions:this._inputPositions.slice(),timeStamp:i,originalEvent:h});
this._inputPositions=[];this._lastInputPosition=null};d.getScrollValues=function(){var j=this._inputPositions[this._inputPositions.length-2];
var i=(j.x-this._lastInputPosition.x)+this._scroll.scrollLeft;var h=(j.y-this._lastInputPosition.y)+this._scroll.scrollTop;
return{x:i,y:h}};c.exports=g},{}],175:[function(d,f,b){var g=d("ac-dom-events");
var c=d("ac-object");function a(h,i){this._inputController=h;this._element=i;this._scrollTop=0;
this._scrollLeft=0;this._timeout=null;this._hasStarted=false;this._boundMouseWheelComplete=this.mouseWheelComplete.bind(this);
this._lastEvent=null;this._velocities=[]}a.prototype={mouseWheelComplete:function(){this._scrollTop=0;
this._scrollLeft=0;this._hasStarted=false;this._inputController.inputEnd(new Date().getTime(),this._lastEvent);
this._lastEvent=null},onMouseWheel:function(k){var i;var h;var j;if(this._hasStarted===false){this._inputController.inputStart(this._scrollLeft,this._scrollTop,k.timeStamp,k);
this._hasStarted=true}i=this._scrollTop+k.wheelDeltaY;h=this._scrollLeft+k.wheelDeltaX;
this._lastEvent=c.clone(k);this._scrollTop=i;this._scrollLeft=h;this._inputController.inputMove(this._scrollLeft,this._scrollTop,k.timeStamp,k);
window.clearTimeout(this._timeout);this._timeout=window.setTimeout(this._boundMouseWheelComplete,100)
},bindDOMEvents:function(){g.addEventListener(this._element,"mousewheel",this.onMouseWheel.bind(this))
}};f.exports=a},{"ac-dom-events":143,"ac-object":163}],176:[function(c,d,a){var f=c("ac-dom-events");
function b(g,h){this._input=g;this._element=h}b.prototype={bindDOMEvents:function(){var g=this._input;
var h=this._element;f.addEventListener(h,"touchstart",function(i){if(i.touches&&i.touches[0]&&i.touches[0].target&&i.touches[0].target.tagName.match(/input|textarea|select/i)){return
}g.inputStart(i.touches[0].pageX,i.touches[0].pageY,i.timeStamp,i)},false);f.addEventListener(h,"touchmove",function(i){g.inputMove(i.touches[0].pageX,i.touches[0].pageY,i.timeStamp,i)
},false);f.addEventListener(h,"touchend",function(i){g.inputEnd(i.timeStamp,i)},false);
f.addEventListener(h,"touchcancel",function(i){g.inputEnd(i.timeStamp,i)},false)
}};d.exports=b},{"ac-dom-events":143}],177:[function(b,c,a){var f=b("ac-event-emitter").EventEmitter;
function g(){this.scrollLeft=0;this.scrollTop=0}var d=g.prototype=new f();d.scrollTo=function(i,h){if(i===this.scrollLeft&&h===this.scrollTop){return
}this.scrollLeft=i;this.scrollTop=h;this.trigger("scroll",{scrollTop:h,scrollLeft:i})
};c.exports=g},{}],178:[function(b,c,a){c.exports.InlineStyleRenderer=b("./ac-style-renderer/InlineStyleRenderer");
c.exports.LogRenderer=b("./ac-style-renderer/LogRenderer")},{"./ac-style-renderer/InlineStyleRenderer":179,"./ac-style-renderer/LogRenderer":180}],179:[function(d,f,c){var a=(function(){var h,g;
if(a){return}g=document.createElement("div");h=["transform","webkitTransform","MozTransform","msTransform","oTransform"];
h.some(function(i){if(i in g.style){a=i;return true}});return a})();var b={transformFunctions:["none","matrix","translate","translateX","translateY","scale","scaleX","scaleY","rotate","skewX","skewY","matrix3d","translate3d","translateZ","scale3d","scaleZ","rotate3d","rotateX","rotateY","rotateZ","perspective"],render:function(i,g){var h=this._parseProps(g);
h.forEach(function(j){i.style[j.prop]=j.value})},_mergeTransformProps:function(g){var h=g.reduce(this._partialPropValue.bind(this),"");
return{prop:a,value:h}},_partialPropValue:function(h,i){var j=this._parseTransformFunction(i.prop);
var g=[h," ",j,"(",i.value,")"].join("");return g},_parseTransformFunction:function(g){return g.replace("transform-","")
},_isTransformFunction:function(g){return this.transformFunctions.indexOf(g)!==-1
},_parseProps:function(l){var k=[];var j=[];var n;var m;var o;for(var h=0,g=l.length;
h<g;h++){o=l[h];n=this._isTransformFunction(o.prop);[].push.call(n?j:k,o)}if(j.length){m=this._mergeTransformProps(j);
k.push(m)}return k}};f.exports=b},{}],180:[function(b,c,a){c.exports={render:function(g,f){var d=(arguments.length<2)?g:f;
console.log(d)}}},{}],181:[function(b,c,a){a.Gallery=b("./ac-gallery/Gallery");
a.builder=b("./ac-gallery/builder");a.MediaSegue=b("./ac-gallery/segue/MediaSegue");
a.MediaRenderer=b("./ac-gallery/segue/media/MediaRenderer");a.AnimationSequenceSegue=b("./ac-gallery/segue/AnimationSequence");
a.CSSTransitionSegue=b("./ac-gallery/segue/CSSTransition");a.FadeInCSSTransition=b("./ac-gallery/segue/FadeInCSSTransition");
a.fadeInKeyframesGenerator=b("./ac-gallery/keyframe/fadeInKeyframesGenerator");
a.crossFadeKeyframesGenerator=b("./ac-gallery/keyframe/crossFadeKeyframesGenerator");
a.showHideKeyframesGenerator=b("./ac-gallery/keyframe/showHideKeyframesGenerator");
a.horizontalSliderKeyframesGenerator=b("./ac-gallery/keyframe/horizontalSliderKeyframesGenerator")
},{"./ac-gallery/Gallery":182,"./ac-gallery/builder":183,"./ac-gallery/keyframe/crossFadeKeyframesGenerator":193,"./ac-gallery/keyframe/fadeInKeyframesGenerator":194,"./ac-gallery/keyframe/horizontalSliderKeyframesGenerator":195,"./ac-gallery/keyframe/showHideKeyframesGenerator":196,"./ac-gallery/segue/AnimationSequence":200,"./ac-gallery/segue/CSSTransition":201,"./ac-gallery/segue/FadeInCSSTransition":202,"./ac-gallery/segue/MediaSegue":203,"./ac-gallery/segue/media/MediaRenderer":206}],182:[function(b,a,g){var j=b("ac-deferred").Deferred;
var l=b("ac-event-emitter").EventEmitter;var c=b("ac-base").Object;var f=b("./generator/Timeline");
var k=b("./segue/Segue");var d={transitionDuration:0.4,transitionEasing:"linear",locks:true,endless:false};
function i(q,m){var p;m=m||{};if(!q){throw new TypeError("Could not create gallery, no keyframes were specified")
}this._keyboard=null;p=c.clone(d);this.setOptions(c.extend(p,m),{replace:true});
if(this.options.keyboard){this.setKeyboard(this.options.keyboard)}this._keyframes=q;
this._selected=0;this._locked=false;var o=this.getTransitionDuration();var n=k.create({duration:0});
this._keyframes[0].draw()}var h=i.prototype=new l();h.setOptions=function(n,m){m=m||{};
if(m.replace===true){this.options=n}else{this.options=c.extend(this.options,n)}return this
};h.getSelectedKeyframe=function(){return this._keyframes[this._selected]};h.getSelected=function(){return this.getSelectedKeyframe.apply(this,arguments)
};h.getKeyframes=function(){return this._keyframes};h.getKeyframeIndex=function(m){return this._keyframes.indexOf(m)
};h.addKeyframe=function(n,m){m=m||{};if(typeof m.index!=="number"){this._keyframes.push(n)
}else{this._keyframes.splice(m.index,0,n)}this._trigger("keyframeAdd",{keyframe:n,index:this.getKeyframeIndex(n)},m);
return this};h.removeKeyframe=function(n,m){var o;m=m||{};if(this.getSelected()===n){throw new Error("Could not remove keyframe, it is the current selected Keyframe instance.")
}o=this.getKeyframeIndex(n);this._keyframes.splice(o,1);this._trigger("keyframeRemove",{keyframe:n,index:o},m);
return this};h.containsKeyframe=function(m){return(this._keyframes.indexOf(m)!==-1)
};h.numKeyframes=function(){return this._keyframes.length};h.eachKeyframe=function(n,m){this._keyframes.forEach(function(){n.apply(m,arguments)
});return this};h.getNext=function(){var m=this.getSelectedIndex()+1;var n;if(this.isEndless()===true&&m===this.numKeyframes()){m=0
}n=this._keyframes[m];if(n===undefined){n=null}return n};h.getPrevious=function(){var m=this.getSelectedIndex()-1;
var n;if(this.isEndless()===true&&m<0){m=this.numKeyframes()-1}n=this._keyframes[m];
if(n===undefined){n=null}return n};h.getSelectedIndex=function(){return this._selected
};h.showNext=function(m){var p=new j();var o=this.getNext();var n=p.promise();if(o!==null){n=this.show(o,m)
}else{p.reject()}return n};h.showPrevious=function(m){var p=new j();var n=this.getPrevious();
var o=p.promise();if(n!==null){o=this.show(n,m)}else{p.reject()}return o};h.showFirst=function(m){var n=this.getFirst();
return this.show(n,m)};h.showLast=function(m){return this.show(this.getLast(),m)
};h.getLastIndex=function(){return this._keyframes.length-1};h.getLast=function(){return this._keyframes[this.getLastIndex()]
};h._trigger=function(m,o,n){if(n.silent===true){return}o.target=this;this.trigger(m,o)
};h.getTransitionDuration=function(){return this.options.transitionDuration};h.setTransitionDuration=function(o,n){var m=this.options.transitionDuration;
this.options.transitionDuration=o;this._trigger("transition-duration-change",{previous:m,duration:o},n||{})
};h.setTransitionEasing=function(o,m){var n=this.options.transitionEasing;this.options.transitionEasing=o;
this._trigger("transition-easing-change",{previous:n,easing:o},m||{})};h.toTimeline=function(o,n){var m=new f(this,o,n);
return m.getTimeline()};h.getFirst=function(){return this._keyframes[0]};h.getLocked=function(){return this._locked
};h.isLocked=function(){return this.getLocked()};h.setLocked=function(m){this._locked=m;
return this._locked};h.getEngaged=function(){return this._engaged};h.setEngaged=function(m){this._engaged=m;
return this._engaged};h.isEndless=function(){return this.options.endless};h.show=function(q,o){var u=new j();
var n;var m;var p;var r=k.create({duration:this.options.transitionDuration,easing:this.options.transitionEasing});
var t=u.promise();o=o||{};if(this.options.locks===true&&this.isLocked()===true){u.reject();
return t}this._locked=true;n=this._keyframes[this._selected];if(typeof q==="number"){m=this._keyframes[q]
}else{if(typeof q==="string"){m=this._keyframes.filter(function(v){return(v.id===q)
})[0]}else{m=q}}if(m===null){throw new TypeError('Could not show Keyframe with supplied query. Query "'+q+'" returned no items.')
}else{if(m===n){u.resolve();this._locked=false;return t}}p=c.extend({outgoing:n,incoming:m},o);
this._trigger("willShow",p,o);if(o.useTransition===false){t=t.then(this._afterShow.bind(this,n,m,p,o));
u.resolve();return t}return r.play(n,m).then(this._afterShow.bind(this,n,m,p,o))
};h.hasKeyboard=function(){return this._keyboard!==null};h.getKeyboard=function(){return this._keyboard
};h.setKeyboard=function(m){if(this._keyboard!==null){this._keyboard.removeKeyDown();
this._keyboard.removeKeyUp()}this._keyboard=m;return this};h.keyboardAddKeyDown=function(){this._keyboard.addKeyDown.apply(this._keyboard,arguments);
return this};h.keyboardAddKeyUp=function(){this._keyboard.addKeyUp.apply(this._keyboard,arguments);
return this};h.keyboardRemoveKeyDown=function(){this._keyboard.removeKeyDown.apply(this._keyboard,arguments);
return this};h.keyboardRemoveKeyUp=function(){this._keyboard.removeKeyUp.apply(this._keyboard,arguments);
return this};h.showPrevious=function(m){var p=new j();var n=this.getPrevious();
var o=p.promise();if(n!==null){o=this.show(n,m)}else{p.reject()}return o};h._afterShow=function(o,m,p,n){this._selected=this._keyframes.indexOf(m);
this._locked=false;return this._trigger("didShow",p,n)};a.exports=i},{"./generator/Timeline":186,"./segue/Segue":204,"ac-base":false}],183:[function(j,b,z){var A=j("ac-base").Object;
var y=j("ac-base").Element;var l=j("ac-base").Environment;var t=j("ac-keyboard");
var g=j("ac-keyframe").Keyframe;var k;try{k=j("ac-analytics").observer.Gallery}catch(u){}var p=j("./Gallery");
var d=j("./controller/Trigger");var h=j("./observer/TriggerPainter");var i=j("./observer/PreviousNextTriggerPainter");
var a=j("./observer/ElementTracker");var x=j("./keyboard/defaultMap");var r=j("./keyframe/crossFadeKeyframesGenerator");
var m=j("./keyframe/showHideKeyframesGenerator");var f=j("./touch/builder");var c="Could not create gallery: there are both custom keyframes and keyframe elements specified";
var q="Could not create gallery: there are no keyframes or elements to generate keyframes from";
var o="Could not create gallery: there is no touch element, but requested touches to be turned on";
var w="Could not create gallery: triggerSelector should be a string";var v={locks:true,shouldUseKeyboard:true,keyboardMap:x};
b.exports=function n(K){K=K||{};K=A.extend(A.clone(v),K);var E=K.keyframes||[];
var H=K.keyframeElements||[];var M=K.shouldUseKeyboard||true;var F,L,D,B,I,C,J,G;
if(K.keyframes&&K.keyframeElements){throw new Error(c)}if(!E||E.length===0){if(H.length===0){throw new Error(q)
}else{H=Array.prototype.slice.call(H);if(l.Feature.cssPropertyAvailable("opacity")&&l.Feature.cssPropertyAvailable("transition")){E=r(H)
}else{E=m(H)}}}K.keyboard=K.keyboard||new t.Keyboard();if(K.shouldUseKeyboard!==true){K.keyboard=undefined
}L=new p(E,K);if(L.hasKeyboard()){L.keyboardAddKeyDown(K.keyboardMap,L)}if(y.isElement(K.engagementElement)){C=new a(L,K.engagementElement)
}if(K.triggerSelector){if(typeof K.triggerSelector!=="string"){throw new Error(w)
}else{D=new d({gallery:L,el:K.triggerSelector});B=(K.activeTriggerClassname)?new h(L,K.triggerSelector,K.activeTriggerClassname):new h(L,K.triggerSelector);
L.on("willShow",B._paint,B);if(!L.isEndless()){I=new i(B);L.on("willShow",I._paint,I)
}}}if(K.touch){if(l.Feature.touchAvailable()&&K.touch!==false){if(!y.isElement(K.touchElement)){throw new Error(o)
}else{J=f(K.touchElement,L,K)}}}if(typeof k==="function"){G=new k(L,((typeof K.analytics==="object")?K.analytics:{}))
}F={gallery:L,elementTracker:C,trigger:D,triggerPainter:B,touchController:J,analytics:G};
return F}},{"./Gallery":182,"./controller/Trigger":185,"./keyboard/defaultMap":192,"./keyframe/crossFadeKeyframesGenerator":193,"./keyframe/showHideKeyframesGenerator":196,"./observer/ElementTracker":197,"./observer/PreviousNextTriggerPainter":198,"./observer/TriggerPainter":199,"./touch/builder":209,"ac-analytics":31,"ac-base":false,"ac-keyboard":137,"ac-keyframe":245}],184:[function(f,c,i){var g=f("ac-base").Object;
var h=f("ac-scrollview").ScrollView;var l=f("./../touch/TimelineRenderer");var a=f("ac-animation-sequencer").BasicPlayer;
var m=f("ac-animation-sequencer").TweenClip;var j=f("ac-base").EasingFunctions;
var k=f("ac-scrollview").ScrollBounds;var b=f("./../touch/GalleryGrid");function d(p,n,o){var q={axis:"x",scrollVelocity:1};
this._element=p;this.options=g.extend(q,o||{});this._gallery=n;this._axisString=(this.options.axis==="x")?"left":"top";
if(!this._gallery){throw new TypeError('Could not instantiate Touch Controller. "'+this._gallery+'" is not a valid gallery')
}this._player=this.options.player||new a(n.toTimeline(this.options.bounceOutKeyframe,this.options.bounceInKeyframe));
this._player.setCurrentTime(this._gallery.getTransitionDuration());this._inertiaPlayer=null;
this._enRoute=false;this._runningIndex=this._gallery.getSelectedIndex();this._scrollView=this.options.scrollView||this.__buildScrollView();
this._scrollRenderer=this.options.scrollRenderer||this.__buildScrollRenderer();
this._scrollRenderer.render(this._scrollView.scrollLeft);this._gallery.on("didShow",this.onDidShow,this);
this._scrollView.on("scrollStart",this.onScrollStart,this);this._scrollView.on("inertiaStart",this.onInertiaStart,this);
this._scrollView.on("scroll",this.onScroll,this)}d.prototype={__generateEasingFunction:function(n){return function(q,o,p,r){return j.easeOutBack(q,o,p,r,n)
}},__buildScrollView:function(){var p=this._element.offsetWidth/this.options.scrollVelocity;
var n=this._element.offsetHeight/this.options.scrollVelocity;var o=g.extend(g.clone(this.options),{innerWidth:p*this._gallery.numKeyframes(),innerHeight:n*this._gallery.numKeyframes(),startBounceDistance:p,endBounceDistance:p,touchContainerWidth:p,touchContainerHeight:n});
return new h(this._element,o)},__buildScrollRenderer:function(){var n=g.extend(g.clone(this.options),{bounceDuration:this._gallery.getTransitionDuration()});
return new l(this._player,this._scrollView,n)},getAxis:function(){return this.options.axis||"x"
},getScrollView:function(){return this._scrollView},onDidShow:function(){var n=this._gallery.getSelectedIndex();
this._runningIndex=n;this._scrollView.scrollTo(n*this._scrollView.getTouchContainerWidth(),n*this._scrollView.getTouchContainerHeight())
},onScrollStart:function(){if(this._inertiaPlayer&&typeof this._inertiaPlayer.pause==="function"){this._inertiaPlayer.pause()
}this._scrollStartTimeout=window.setTimeout(function(){this._gallery.trigger("touchStart")
}.bind(this),100)},onScroll:function(p){var o=p.scrollLeft;var n=p.scrollTop;this._scrollRenderer.render(o,n);
this._gallery.trigger("scroll",{scrollLeft:o,scrollTop:n})},onInertiaStart:function(w){w.preventDefault();
this._gallery.trigger("touchEnd");var v=w.inertia;var o=new b(this._gallery,this._scrollView);
var p=new k(v,this._runningIndex,o.getGrid(),this.options);var u=v.calculateFinalInertiaPosition();
var r=p.calculateTargetIndex();var y=0.4;var t=p.calculateFuturePositions().left;
var B=3;var n=Math.abs(p.calculateFuturePositions().left-w.position.left);if(n!==0){y*=(Math.abs(n)/this._scrollView.getTouchContainerWidth())
}if((r-this._runningIndex)!==0){y=y/Math.abs(r-this._runningIndex)}var A=(Math.abs(n)/this._scrollView.getTouchContainerWidth());
var q=0;if(y<0.32&&y>0.15){y+=0.2;q=1.4}else{if(y<=0.15){y+=0.3;q=1.7}}if(q<0){q=0
}else{if(q>B){q=B}}var x=Math.abs(w.velocity.top)-3;if(x<0){x=0}else{if(x>B){x=B
}}var z=new m(y,[{property:"scrollLeft",from:w.position.left,to:p.calculateFuturePositions().left,easing:this.__generateEasingFunction(q)},{property:"scrollTop",from:w.position.top,to:p.calculateFuturePositions().top,easing:this.__generateEasingFunction(x)}]);
if(this._inertiaPlayer){this._inertiaPlayer.off("ended")}this._inertiaPlayer=new a(z);
z.on("tween_update",function(C){this._scrollView.scrollTo(C.scrollLeft,C.scrollTop)
},this);this._inertiaPlayer.play();this._inertiaPlayer.on("ended",function(){this._enRoute=false;
this._gallery.show(r,{useTransition:false,interactionEvent:w.originalEvent})},this);
this._runningIndex=r;this._enRoute=true}};c.exports=d},{"./../touch/GalleryGrid":207,"./../touch/TimelineRenderer":208,"ac-animation-sequencer":83,"ac-base":false,"ac-scrollview":169}],185:[function(c,d,b){var f=c("ac-base").Element;
var h=c("ac-base").Event;function a(i){i=i||{};this._el=i.el||"";this._id=i.id||"href";
this._method=i.method||"data-method";this.setGallery(i.gallery)}var g=a.prototype;
g.setGallery=function(i){this._gallery=i;if(this._gallery!==undefined){this._addListener()
}};g.getGallery=function(){return this._gallery};g.setEl=function(i){this._el=i;
this._removeListener();if(this._gallery!==undefined){this._addListener()}};g.getEl=function(){return this._el
};g.destroy=function(){this._removeListener();this.func=function(){}};g._addListener=function(){if(this._el!==""){this.func=this._onClickTrigger.bind(this);
f.addEventDelegate(document,"click",this._el,this.func)}};g._removeListener=function(){if(this.func){f.removeEventDelegate(document,"click",this._el,this.func);
this.func=null}};g._onClickTrigger=function(i){h.stop(i.originalEvent);this._click(i.currentTarget,i.originalEvent)
};g._click=function(j,i){var l={interactionEvent:i};if(j.getAttribute(this._method)){var m=j.getAttribute(this._method);
if(typeof this._gallery[m]==="function"){this._gallery[m].call(this._gallery,l)
}else{throw new Error(m+" is not a valid method to call")}}else{if(j.getAttribute(this._id)){var k=j.getAttribute(this._id).split("#")[1];
if(k!==""){this._gallery.show(k,l)}else{throw new Error("Trigger has no ID or method")
}}else{throw new Error("Trigger has no ID or method")}}};d.exports=a},{"ac-base":false}],186:[function(c,b,g){var i=c("ac-animation-sequencer").Timeline;
var h=c("ac-keyframe").Interpolation;var j=c("./../segue/media/MediaClip");var f=c("ac-animation-sequencer").TimedClip;
var a=c("ac-animation-sequencer").CompositeClip;i.clipTypes.Media=j;function d(k,m,l){this._gallery=k;
this._bounceOutKeyframe=m;this._bounceInKeyframe=l}d.prototype={getGallery:function(){return this._gallery
},getTimeline:function(){var m;var k=[];var o=this._gallery.getKeyframes().slice(0);
if(this._bounceInKeyframe){o.unshift(this._bounceInKeyframe)}if(this._bounceOutKeyframe){o.push(this._bounceOutKeyframe)
}var n=new h();n.setDuration(this._gallery.getTransitionDuration());for(var l=1;
l<o.length;l+=1){n.setStartKeyframe(o[l-1]).setEndKeyframe(o[l]);m=n.getClip();
m=new f(m,{startDelay:(l-1)*this._gallery.getTransitionDuration(),fill:"none"});
k.push(m)}return new a(k)}};b.exports=d},{"./../segue/media/MediaClip":205,"ac-animation-sequencer":83,"ac-keyframe":245}],187:[function(f,g,c){var h=f("./../helper/isTransformProperty");
var b=f("./../helper/camelCaseToHyphen");var a=f("./../helper/canTransitionStyle");
var d={zIndex:true,display:true,visibility:true,position:true};g.exports=function(q,l,n,m){var p=[];
var i=false;var k=n;var o=l;m=(typeof m==="number")?" "+m+"s":"";var j=m;q.forEach(function(r){var t=r.property;
if(d[t]===true){return}var v=(typeof r.easing==="string")?r.easing:n;var w=(typeof r.duration==="number")?r.duration:l;
var u=(typeof r.delay==="number")?" "+r.delay+"s":m;if(!a(t)){return}if(!h(t)){p.push(b(t)+" "+w+"s "+v+u)
}else{o=w;k=v;j=u;i=true}});if(i===true){p.push("-webkit-transform "+l+"s "+k+j)
}return p.join(",")}},{"./../helper/camelCaseToHyphen":188,"./../helper/canTransitionStyle":189,"./../helper/isTransformProperty":190}],188:[function(b,c,a){c.exports=function(d){return d.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()
}},{}],189:[function(b,c,a){var d=["display"];c.exports=function(f){return(d.indexOf(f)===-1)
}},{}],190:[function(b,d,a){var c=["matrix","translate","translateX","translateY","scale","scaleX","scaleY","rotate","skewX","skewY","matrix3d","translate3d","translateZ","scale3d","scaleZ","rotate3d","rotateX","rotateY","rotateZ","perspective"];
d.exports=function(f){return(c.indexOf(f)!==-1)}},{}],191:[function(f,g,a){var d=f("ac-deferred").Deferred;
var c=f("./buildTransitionString");var i=f("ac-style-renderer").InlineStyleRenderer;
var h=f("ac-base").Element;var b=f("ac-base").Object;g.exports=function(n,t,m,p,o){var j=new d();
var k=c(t,m,p,o);var q=[];var l;var r=function(u){if(u.target===n){h.removeVendorPrefixEventListener(n,"transitionEnd",r);
h.setVendorPrefixStyle(n,"transition","none");window.requestAnimationFrame(j.resolve.bind(j))
}};if(k!==""&&m!==0){h.addVendorPrefixEventListener(n,"transitionEnd",r);l=h.getVendorPrefixStyle(n,"transition")+",";
if(!/none/.test(l)&&l!==","){k=l+k}h.setVendorPrefixStyle(n,"transition",k)}else{window.requestAnimationFrame(j.resolve.bind(j))
}t.forEach(function(u){var v=b.clone(u);v.prop=v.property;if(v.units){v.value+=v.units
}q.push(v)});i.render(n,q);return j.promise()}},{"./buildTransitionString":187,"ac-base":false,"ac-style-renderer":178}],192:[function(b,c,a){var d=b("ac-keyboard").keys;
var f={};f[d.ARROW_LEFT]=function(g){g.preventDefault();if(this.getEngaged()){this.showPrevious({interactionEvent:g})
}};f[d.ARROW_RIGHT]=function(g){g.preventDefault();if(this.getEngaged()){this.showNext({interactionEvent:g})
}};c.exports=f},{"ac-keyboard":137}],193:[function(c,d,a){var f=c("ac-keyframe").Keyframe;
var b=c("ac-base").Object;var g={zIndex:1};d.exports=function(j,h){var i=[];h=b.extend(b.clone(g),h||{});
j.forEach(function(k,m){var l=[];j.forEach(function(n,o){l.push({element:n,props:[{property:"opacity",value:(o===m)?1:0},{property:"z-index",value:(o===m)?(h.zIndex+1):h.zIndex}]})
});i.push(new f(k.id,l))});return i}},{"ac-base":false,"ac-keyframe":245}],194:[function(c,d,a){var g=c("ac-keyframe").Keyframe;
var f=c("./../segue/FadeInCSSTransition");var h=c("./../segue/CSSTransition");var b=c("ac-base").Object;
var i={zIndex:1};d.exports=function(l,j){var k=[];j=b.extend(b.clone(i),j||{});
l.forEach(function(m,o){var n=[];l.forEach(function(p,q){n.push({SegueType:f,element:p,props:[{property:"opacity",value:(q===o)?"1":"0"},{property:"zIndex",value:(q===o)?(j.zIndex+1):j.zIndex}]})
});k.push(new g(m.id,n))});return k}},{"./../segue/CSSTransition":201,"./../segue/FadeInCSSTransition":202,"ac-base":false,"ac-keyframe":245}],195:[function(c,d,b){var h=c("ac-base").Environment.Feature;
var f=c("ac-keyframe").Keyframe;var g=c("./../segue/CSSTransition");var a=c("./../segue/AnimationSequence");
d.exports=function(o){var l=(h.cssPropertyAvailable("transform"))?"translateX":"left";
var m=(h.cssPropertyAvailable("transition"))?g:a;var j={keyframes:[],bounceInKeyframe:null,bounceOutKeyframe:null};
var n=o[0].offsetWidth;o.forEach(function(p,r){var q=[];o.forEach(function(t,u){q.push({element:t,SegueType:m,props:[{property:l,value:-(n*r),units:"px"}]})
});j.keyframes.push(new f(p.id,q))});var i=[];o.forEach(function(p,q){i.push({element:p,props:[{property:l,value:n,units:"px"}]})
});j.bounceInKeyframe=new f("bounceIn",i);var k=[];o.forEach(function(p,q){k.push({element:p,props:[{property:l,value:-(n*(o.length)),units:"px"}]})
});j.bounceOutKeyframe=new f("bounceOut",k);return j}},{"./../segue/AnimationSequence":200,"./../segue/CSSTransition":201,"ac-base":false,"ac-keyframe":245}],196:[function(b,a,d){var h=b("ac-keyframe").Keyframe;
var f=b("ac-animation-sequencer").ElementClip;var j=b("ac-animation-sequencer").BaseClip;
var g=b("ac-animation-sequencer").Timeline;var c=b("ac-base").Object;var i=function(){f.apply(this,arguments)
};i.prototype=new j();c.extend(i.prototype,f.prototype);i.prototype.update=function(l){if(this.props.length<1){return
}var k=this.props.map(function(o){var m=o.units;var n=o.to;n=(m?(n+m):n);return{prop:o.property,value:n}
});this._renderer.render(this.el,k)};i.create=function(k){return new i(k)};g.clipTypes.Gallery_ShowHide=i;
a.exports=function(l){var k=[];l.forEach(function(m,o){var n=[];l.forEach(function(p,q){n.push({element:p,clipType:"Gallery_ShowHide",props:[{property:"display",value:(q===o)?"block":"none"}]})
});k.push(new h(m.id,n))});return k}},{"ac-animation-sequencer":83,"ac-base":false,"ac-keyframe":245}],197:[function(b,c,a){var d=b("ac-base").Element;
var f=b("ac-element-tracker");function g(h,i){if(!d.isElement(i)){return}this._gallery=h;
this._elementTracker=f;var j=this._elementTracker.addElement({element:i,inViewThreshold:0.33});
this._gallery.setEngaged(false);j.on("thresholdenter",this._onEnterWithinThreshold,this);
j.on("thresholdexit",this._onExitWithinThreshold,this);this._elementTracker.start();
return this}g.prototype._onEnterWithinThreshold=function(h){this._gallery.setEngaged(true)
};g.prototype._onExitWithinThreshold=function(h){this._gallery.setEngaged(false)
};c.exports=g},{"ac-base":false,"ac-element-tracker":134}],198:[function(c,d,b){var f=c("ac-base").Element;
function a(h){if(h.getGallery()&&h.getGallery().isEndless()){return}this.triggerPainter=h;
var i={incoming:h.getGallery().getSelected()};this._paint(i)}var g=a.prototype;
g._paint=function(j){var m=j.incoming.id;var n=this.triggerPainter;var i=n.getGallery();
var o=n.getTriggerSelector();var l=f.selectAll(o+"[data-method]");var k=f.selectAll(o+'[data-method="showPrevious"]');
var h=f.selectAll(o+'[data-method="showNext"]');if(l){n._unpaintTriggers(l,"disabled");
if(m===i.getFirst().id){n._paintTriggers(k,"disabled")}else{if(m===i.getLast().id){n._paintTriggers(h,"disabled")
}}}};d.exports=a},{"ac-base":false}],199:[function(c,d,b){var f=c("ac-base").Element;
function a(i,j,k){this.setGallery(i);this.setTriggerSelector(j);k=k||"current";
this.setActiveTriggerClassname(k);var h={incoming:this._gallery.getSelected()};
this._paint(h)}var g=a.prototype;g.setGallery=function(h){this._gallery=h};g.getGallery=function(){return this._gallery
};g.setTriggerSelector=function(h){this._triggerSelector=h};g.getTriggerSelector=function(){return this._triggerSelector
};g.setActiveTriggerClassname=function(h){this._activeTriggerClassname=h};g.getActiveTriggerClassname=function(){return this._activeTriggerClassname
};g._paint=function(i){var k=i.incoming.id;var m=this.getTriggerSelector();var h=this.getActiveTriggerClassname();
var j=f.selectAll(m+"."+h);var l=f.selectAll(m+'[href="#'+k+'"]');this._unpaintTriggers(j,h);
this._paintTriggers(l,h)};g._paintTriggers=function(m,l){var k,h,j;for(k=0,h=m.length;
k<h;k+=1){j=m[k];f.addClassName(j,l)}};g._unpaintTriggers=function(m,l){var k,h,j;
for(k=0,h=m.length;k<h;k+=1){j=m[k];f.removeClassName(j,l)}};d.exports=a},{"ac-base":false}],200:[function(d,f,b){var h=d("ac-animation-sequencer").Timeline;
var a=d("ac-animation-sequencer").BasicPlayer;var c=d("ac-deferred").Deferred;var g=d("ac-keyframe").Interpolation;
function i(k,j,l,m){this._from=k;this._to=j;this._duration=l;this._easing=m}i.prototype={animate:function(){var m=new c();
var n=this._easing;var j=new g();j.setDuration(this._duration).setStartKeyframe(this._from).setEndKeyframe(this._to);
var l=j.getClip();var k=new a(l);k.once("ended",m.resolve,m);k.play();return m.promise()
}};i.create=function(j){return new i(j.from,j.to,j.duration,j.easing)};f.exports=i
},{"ac-animation-sequencer":83,"ac-keyframe":245}],201:[function(c,d,b){var g=c("./../helper/playCSSTransition");
var a=c("ac-deferred");function f(h,i,j,k){this._toKeyframe=h;this._fromKeyframe=i;
this._duration=j;this._easing=k}f.prototype={animate:function(){var i=this._duration;
var j=this._easing;var h=this._toKeyframe.getStyles().map(function(k){return g(k.element,k.props,i,j)
});return a.all(h)}};f.create=function(h){return new f(h.to,h.from,h.duration,h.easing)
};d.exports=f},{"./../helper/playCSSTransition":191}],202:[function(c,b,d){var h=c("./../helper/playCSSTransition");
var f=c("ac-deferred");var g=c("ac-keyframe").Keyframe;var a=c("ac-style-renderer").InlineStyleRenderer;
function i(l){var k={prop:l.property,value:l.value,units:l.units};return k}function j(k,l,m,n){this._toKeyframe=k;
this._fromKeyframe=l;this._duration=m;this._easing=n;this._beforeStyles=[];this._afterStyles=[]
}j.prototype={_renderBeforeStyles:function(){this._beforeStyles.forEach(function(k){a.render(k.element,k.props.map(i))
})},_renderAfterStyles:function(){this._afterStyles.forEach(function(k){a.render(k.element,k.props.map(i))
})},_processIncomingStyle:function(o){var m;var q=this._toKeyframe.findStyle(o.element,"zIndex");
var p=this._fromKeyframe;var n=this._beforeStyles;var k=this._afterStyles;var l={element:o.element,props:[]};
o.props.forEach(function(r){if(r.property==="opacity"){m=p.findStyle(o.element,r.property).value;
if(parseFloat(m)<parseFloat(r.value)){l.props.push(r);if(q){n.push({element:o.element,props:[q]})
}}else{k.push({element:o.element,props:[r]});if(q){k[k.length-1].props.push(q)}}}else{l.props.push(r)
}});return l},animate:function(){var m=this._duration;var p=this._easing;var o=this._fromKeyframe;
var n=this._toKeyframe;var l=this._toKeyframe.getStyles().map(this._processIncomingStyle.bind(this));
this._renderBeforeStyles();var k=l.map(function(q){return h(q.element,q.props,m,p)
});return f.all(k).then(this._renderAfterStyles.bind(this))}};j.create=function(k){return new j(k.to,k.from,k.duration,k.easing)
};b.exports=j},{"./../helper/playCSSTransition":191,"ac-keyframe":245,"ac-style-renderer":178}],203:[function(c,d,b){var a=c("ac-deferred");
var f=c("ac-animation-sequencer").Pause;var h=c("ac-animation-sequencer").ReversibleVideo;
function g(k,j,i){this._from=k;this._to=j;this._duration=i}g.prototype={animate:function(){var i=[];
var j=this._duration;var k=this._from;this._to.getStyles().forEach(function(l){l.props.forEach(function(t){var n;
var r;var m;var p;var o;var q;if(t.property==="time"){r=new a.Deferred();p=k.findStyle(l.element,t.property);
o=(p.value<t.value)?1:-1;n=new h(l.element);if(t.value!==0){m=new f(n,[0,t.value]);
m._monitor._init();m.once("pauseenter",function(){m=undefined;r.resolve()})}else{if(t.value===0){q=function(){if(l.element.currentTime===0){r.resolve()
}l.element.removeEventListener("timeupdate",q)};l.element.addEventListener("timeupdate",q)
}else{if(t.value===this.element.duration){q=function(){if(l.element.currentTime===this.element.duration){r.resolve()
}l.element.removeEventListener("timeupdate",q)};l.element.addEventListener("timeupdate",q)
}}}n.playbackRate=(Math.abs(p.value-t.value)/j)*o;n.play();i.push(r.promise())}})
});return a.all(i)}};g.create=function(i){return new g(i.from,i.to,i.duration,i.easing)
};d.exports=g},{"ac-animation-sequencer":83}],204:[function(c,b,d){var a=c("./CSSTransition");
var k=c("./AnimationSequence");var j=c("./../helper/playCSSTransition");var f=c("ac-deferred");
var h=f.Deferred;var g=c("ac-keyframe").Keyframe;function i(l,m){this._duration=l;
this._easing=m||"linear"}i.prototype={_determineSegueType:function(m){var l;if(m.SegueType!==undefined){l=m.SegueType
}else{if(typeof m.clipType!=="undefined"&&m.clipType!=="Element"){l=k}else{l=a}}return l
},_sortPropertiesBySegueType:function(m){var n=[];function l(o){for(var p=0;p<n.length;
p+=1){if(n[p].Type===o){return n[p]}}}m.getStyles().forEach(function(p){var q=this._determineSegueType(p);
var o=l(p.SegueType);if(!o){o={Type:q,properties:[]};n.push(o)}o.properties.push({clipType:p.clipType,element:p.element,props:p.props})
}.bind(this));return n},_transition:function(t,n){var p=[];var l;var m=this._duration;
var o=this._easing;if(this._duration===0){return n.draw()}var q=(m===0)?n.clone():t.diff(n);
var r=this._sortPropertiesBySegueType(q);var u=this._sortPropertiesBySegueType(n.diff(t));
r.forEach(function(x,v){var z=new g("to",x.properties);var y=new g("from",u[v].properties);
var w=x.Type.create({duration:m,easing:o,to:z,from:y});p.push(w.animate())});return f.all(p)
},getDuration:function(){return this._duration},setDuration:function(l){this._duration=l;
return this},getEasing:function(){return this._easing},setEasing:function(l){this._easing=l;
return this},play:function(m,l){return this._transition(m,l)}};i.create=function(l){return new i(l.duration,l.easing,l)
};b.exports=i},{"./../helper/playCSSTransition":191,"./AnimationSequence":200,"./CSSTransition":201,"ac-keyframe":245}],205:[function(f,g,c){var a=f("ac-animation-sequencer").TweenClip;
var i=f("./MediaRenderer");var d=f("ac-base").Object;function b(){a.apply(this,arguments)
}var h=b.prototype=new a();b.create=function(j){j=j||{};if(!j.element){throw new TypeError("MediaClip could not be created: "+j.element+" is not a valid element")
}j.renderer=new i(j.element);return new b(j)};g.exports=b},{"./MediaRenderer":206,"ac-animation-sequencer":83,"ac-base":false}],206:[function(b,c,a){function f(g){this._element=g
}var d=f.prototype;d.render=function(h,g){g.forEach(function(i){if(i.prop==="time"){if(h.currentTime!==i.value){h.currentTime=i.value
}}})};c.exports=f},{}],207:[function(c,d,b){function a(f,g){this._gallery=f;this._scrollView=g
}a.prototype={getGrid:function(){var g={left:[],top:[]};for(var f=0;f<this._gallery.numKeyframes();
f+=1){g.left.push(this._scrollView.getTouchContainerWidth()*f);g.top.push(this._scrollView.getTouchContainerHeight()*f)
}return g}};d.exports=a},{}],208:[function(c,f,a){var b=c("ac-base").Object;var g={axis:"x",bounceDuration:0};
function d(i,j,h){this.options=b.extend(g,h||{});this._player=i;this._touchScrollBounds=j
}d.prototype={_calculateScrollPercentage:function(i,h){return{left:i/this._touchScrollBounds.getScrollXDistance(),top:h/this._touchScrollBounds.getScrollYDistance()}
},calculateCurrentTime:function(k,j){var h=this._calculateScrollPercentage(k,j);
var l=(this.options.axis==="x")?"left":"top";var i=(this._player.getDuration()-(this.options.bounceDuration*2))*h[l];
return this.options.bounceDuration+i},render:function(i,h){this._player.setCurrentTime(this.calculateCurrentTime(i,h));
return this}};f.exports=d},{"ac-base":false}],209:[function(b,c,a){var d=b("ac-base").Element;
var f=b("./../controller/Touch");c.exports=function g(k,i,j){j=j||{};var h=new f(k,i,j);
return h}},{"./../controller/Touch":184,"ac-base":false}],210:[function(b,c,a){c.exports=b(83)
},{"./ac-animation-sequencer/Clock":211,"./ac-animation-sequencer/PlayerMonitor":212,"./ac-animation-sequencer/Timeline":213,"./ac-animation-sequencer/Tween":214,"./ac-animation-sequencer/adapters/ReversibleVideo":217,"./ac-animation-sequencer/clip/BaseClip":218,"./ac-animation-sequencer/clip/CompositeClip":219,"./ac-animation-sequencer/clip/ElementClip":220,"./ac-animation-sequencer/clip/TimedClip":221,"./ac-animation-sequencer/clip/TweenClip":222,"./ac-animation-sequencer/clip/VideoClip":223,"./ac-animation-sequencer/controllers/MediaGroup":224,"./ac-animation-sequencer/controllers/Pause":225,"./ac-animation-sequencer/player/BasicPlayer":226,"./ac-animation-sequencer/player/MediaPlayer":227}],211:[function(b,c,a){c.exports=b(84)
},{}],212:[function(b,c,a){c.exports=b(85)},{"./vendor/utils":230}],213:[function(b,c,a){c.exports=b(86)
},{"./clip/CompositeClip":219,"./clip/ElementClip":220,"./clip/TimedClip":221,"./clip/TweenClip":222}],214:[function(b,c,a){c.exports=b(87)
},{"./vendor/EasingFunctions":228,"./vendor/KeySpline":229,"./vendor/utils":230}],215:[function(b,c,a){c.exports=b(88)
},{}],216:[function(b,c,a){c.exports=b(89)},{}],217:[function(b,c,a){c.exports=b(90)
},{}],218:[function(b,c,a){c.exports=b(91)},{"../vendor/EasingFunctions":228,"../vendor/KeySpline":229,"ac-style-renderer":242}],219:[function(b,c,a){c.exports=b(92)
},{"./TimedClip":221}],220:[function(b,c,a){c.exports=b(93)},{"../Tween":214,"../vendor/utils":230,"./BaseClip":218,"ac-style-renderer":242}],221:[function(b,c,a){c.exports=b(94)
},{"../vendor/utils":230}],222:[function(b,c,a){c.exports=b(95)},{"./BaseClip":218}],223:[function(b,c,a){c.exports=b(96)
},{"../adapters/MediaAsClip":215}],224:[function(b,c,a){c.exports=b(97)},{"../Clock":211,"../vendor/utils":230}],225:[function(b,c,a){c.exports=b(98)
},{"../PlayerMonitor":212}],226:[function(b,c,a){c.exports=b(99)},{"../Clock":211,"../adapters/PlayerAsMedia":216}],227:[function(b,c,a){c.exports=b(100)
},{"./BasicPlayer":226}],228:[function(b,c,a){c.exports=b(101)},{}],229:[function(b,c,a){c.exports=b(102)
},{}],230:[function(b,c,a){c.exports=b(103)},{}],231:[function(b,c,a){c.exports=b(23)
},{}],232:[function(b,c,a){c.exports={clone:b("./ac-object/clone"),create:b("./ac-object/create"),defaults:b("./ac-object/defaults"),extend:b("./ac-object/extend"),getPrototypeOf:b("./ac-object/getPrototypeOf"),isDate:b("./ac-object/isDate"),isEmpty:b("./ac-object/isEmpty"),isRegExp:b("./ac-object/isRegExp"),toQueryParameters:b("./ac-object/toQueryParameters")}
},{"./ac-object/clone":233,"./ac-object/create":234,"./ac-object/defaults":235,"./ac-object/extend":236,"./ac-object/getPrototypeOf":237,"./ac-object/isDate":238,"./ac-object/isEmpty":239,"./ac-object/isRegExp":240,"./ac-object/toQueryParameters":241}],233:[function(b,c,a){c.exports=b(25)
},{"./extend":236}],234:[function(b,c,a){c.exports=b(159)},{}],235:[function(b,c,a){c.exports=b(160)
},{"./extend":236}],236:[function(b,c,a){c.exports=b(27)},{}],237:[function(b,c,a){c.exports=b(28)
},{}],238:[function(b,c,a){c.exports=b(164)},{}],239:[function(b,c,a){c.exports=b(29)
},{}],240:[function(b,c,a){c.exports=b(166)},{}],241:[function(b,c,a){c.exports=b(30)
},{qs:231}],242:[function(b,c,a){c.exports=b(178)},{"./ac-style-renderer/InlineStyleRenderer":243,"./ac-style-renderer/LogRenderer":244}],243:[function(b,c,a){c.exports=b(179)
},{}],244:[function(b,c,a){c.exports=b(180)},{}],245:[function(b,c,a){c.exports={Keyframe:b("./ac-keyframe/Keyframe"),Interpolation:b("./ac-keyframe/Interpolation")}
},{"./ac-keyframe/Interpolation":246,"./ac-keyframe/Keyframe":247}],246:[function(b,c,a){var f=b("ac-animation-sequencer").Timeline;
function d(){this._start=null;this._end=null;this._duration=null}d.prototype={_mergeToClip:function(){var i=this._start;
var j=this._end;var g=this._duration;var h=function(l){var k={element:l.element,clip:l.clipType||"Element",duration:g,props:[]};
l.props.forEach(function(o){var n={property:o.property,from:o.value,to:o.value,easing:o.easing||"linear"};
if(o.units){n.units=o.units}var m=i.findStyle(l.element,o.property);if(m){n.from=m.value
}k.props.push(n)});return k};return j.getStyles().map(h)},setStartKeyframe:function(g){this._start=g;
return this},setEndKeyframe:function(g){this._end=g;return this},setDuration:function(g){this._duration=g;
return this},getClip:function(){return f.create(this._mergeToClip())}};c.exports=d
},{"ac-animation-sequencer":210}],247:[function(c,d,a){var h=c("./helper/isTransformProperty");
var i=c("ac-deferred");var b=c("ac-object");var g=c("ac-animation-sequencer").Timeline;
function f(l,k,j){this.id=l;this._styles=k;this.options=j||{}}f.prototype={clone:function(){return new f(this.id,this._styles,this.options)
},findStyle:function(k,l){var j=null;this._styles.forEach(function(m){if(m.element===k){m.props.forEach(function(n){if(n.property===l){j=n
}})}});return j},getStyles:function(){return this._styles},__rafDraw:function(j,k){window.requestAnimationFrame(function(){j.update(j.getDuration());
k.resolve()})},draw:function(){var j=[];this.getStyles().forEach(function(m){var l=m.clipType||"Element";
var k=g.clipTypes[l];var o=[];var p=new i.Deferred();m.props.forEach(function(r){var q=b.clone(r);
q.from=q.to=q.value;q.easing="linear";o.push(q)});var n=k.create({element:m.element,props:o});
this.__rafDraw(n,p);j.push(p.promise())}.bind(this));return i.all(j)},diff:function(k){var j=[];
var o;var m=this.getStyles();var l=k.getStyles();var n;m.forEach(function(v,q){var r=v.element;
var t=v.props;var w={};var u=false;for(var p in l[q]){if(l[q].hasOwnProperty(p)){w[p]=l[q][p]
}}w.props=[];t.forEach(function(z){var x=z.property;var y=k.findStyle(r,x);if(y===null){w.props.push(z)
}else{if(y.value!==z.value||(h(x)&&u===true)){w.props.push(y);if(h(x)){u=true}}}});
if(w.props.length>0){j.push(w)}});return new f("diff",j,this.options)}};d.exports=f
},{"./helper/isTransformProperty":248,"ac-animation-sequencer":210,"ac-object":232}],248:[function(b,d,a){var c=["skew","scale","rotate","translateX","translateY","translateZ"];
d.exports=function(f){return(c.indexOf(f)!==-1)}},{}],249:[function(b,c,a){c.exports={ProductBrowser:b("./productbrowser/ProductBrowser")}
},{"./productbrowser/ProductBrowser":250}],250:[function(c,d,b){var f=c("ac-base").Element;
var a=c("./Scroll");var i=c("./Tab");function h(j){j=j||{};this.breakPoint=j.breakPoint||768;
this.timeout=null;this.browser=null;this.browserType=null;f.addEventListener(window,"resize",this.onResized.bind(this));
this.checkBrowserType()}var g=h.prototype;g.updateBrowserType=function(k,j){if(this.browser){this.browser.destroy()
}this.browser=new j();this.browserType=k};g.checkBrowserType=function(){if(!f.hasClassName(document.documentElement,"touch")){if(this.browser===null){this.updateBrowserType("tab",i)
}this.browser.resized();return}var j=window.innerWidth||document.body.clientWidth;
if(this.browserType!=="scroll"&&j<this.breakPoint){this.updateBrowserType("scroll",a)
}else{if(this.browserType!=="tab"&&j>=this.breakPoint){this.updateBrowserType("tab",i)
}else{this.browser.resized()}}};g.onResized=function(j){if(this.timeout===null){this.timeout=setTimeout(function(){this.checkBrowserType();
this.timeout=null}.bind(this),50)}};d.exports=h},{"./Scroll":251,"./Tab":252,"ac-base":false}],251:[function(b,c,a){function f(g){}var d=f.prototype;
d.resized=function(){};d.destroy=function(){};c.exports=f},{}],252:[function(c,a,f){var k=c("ac-keyframe").Keyframe;
var j=c("ac-gallery").CSSTransitionSegue;var h=c("ac-gallery").AnimationSequenceSegue;
var i=c("ac-base").Element;var l=c("ac-gallery").builder;var d=c("ac-base").Environment.Feature;
function b(m){this.pbEl=i.select(".productbrowser");this.sectionEls=i.selectAll(".productbrowser-group");
if(this.sectionEls.length<=1){return}this.nav=i.select(".productbrowser-navitems");
this.navCaret=i.select(".productbrowser-navcaret");this.current=0;this.duration=0.4;
this.translateAvailble=d.threeDTransformsAvailable();this.touchAvailable=d.touchAvailable();
this.property=(this.translateAvailble)?"translateX":"left";this.segueType=(this.translateAvailble)?j:h;
this.willShow=this.willShow.bind(this);this.didShow=this.didShow.bind(this);this.onTouchStart=this.onTouchStart.bind(this);
this.wrapper=i.select(".productbrowser-wrapper");this.html=this.wrapper.innerHTML;
this.groups=i.select(".productbrowser-groups");i.setStyle(this.groups,{width:(this.sectionEls[0].offsetWidth*this.sectionEls.length)+"px"});
var n=this.generateKeyframes(this.sectionEls,this.sectionEls[0]);this.galleryObj=l({touch:true,touchElement:this.wrapper,triggerSelector:".productbrowser-navitem",keyframes:n.keyframes,bounceInKeyframe:n.bounceInKeyframe,bounceOutKeyframe:n.bounceOutKeyframe,transitionDuration:this.duration,transitionEasing:"ease"});
this.gallery=this.galleryObj.gallery;this.gallery.on("willShow",this.willShow);
this.gallery.on("didShow",this.didShow);if(this.touchAvailable){i.addEventListener(this.pbEl,"touchstart",this.onTouchStart)
}setTimeout(function(o){this.updateNav();i.addClassName(this.navCaret,"is-ready")
}.bind(this),300)}var g=b.prototype;g.generateKeyframes=function(o,p){var t=this.property;
var q=this.segueType;var n=p.offsetWidth;var u,r,m;var v={keyframes:[],bounceInKeyframe:new k(o[0],[{element:o[0],SegueType:q,props:[{property:t,value:n,units:"px"}]}]),bounceOutKeyframe:new k(o[o.length-1],[{element:o[o.length-1],SegueType:q,props:[{property:t,value:-(o.length*n),units:"px"}]}])};
o.forEach(function(w,x){u=[];if(w!==p){i.addClassName(w,"is-hidden")}o.forEach(function(y,z){if(x>z){r=-((z+1)*n)
}else{if(x<z){r=-((z-1)*n)}else{r=-(x*n)}}u.push({element:y,SegueType:q,props:[{property:t,value:r,units:"px"}]})
});v.keyframes.push(new k(w.id,u))});return v};g.updateNav=function(){var m=i.select(".productbrowser-navitem.current");
var o=i.getBoundingBox(this.nav);var n=i.getBoundingBox(m);var p=n.left-o.left;
var q=n.width/100;if(this.translateAvailble){i.setVendorPrefixTransform(this.navCaret,"translateX("+p+"px) scaleX("+q+")")
}else{p+=(o.left-i.getBoundingBox(i.select(".productbrowser-nav")).left);i.setStyle(this.navCaret,{width:(q*100)+"px",left:p+"px"})
}};g.willShow=function(w){var v=w.interactionEvent.originalEvent&&w.interactionEvent.originalEvent.type==="touchend";
var m=i.getElementById(w.incoming.id);var r=this.sectionEls.indexOf(m);i.removeClassName(m,"is-hidden");
if(this.touchAvailable){if(this.current>0&&this.current-1!==r){i.addClassName(this.sectionEls[this.current-1],"is-hidden")
}if(this.current<this.sectionEls.length-1&&this.current+1!==r){i.addClassName(this.sectionEls[this.current+1],"is-hidden")
}}var n=r<this.current;var t=n?"before":"after";this.current=r;if(!v){var q=i.selectAll("#"+w.incoming.id+" .productbrowser-item");
var u=q.length;var o=(this.duration/u)*1000;var p=function(x,y){i.removeClassName(x,y)
};q.forEach(function(x,y){i.addClassName(x,"is-"+t);i.addClassName(x,"is-transition");
setTimeout(function(){p(x,"is-"+t)},(n?(u-y):y)*o)})}this.updateNav()};g.didShow=function(m){i.addClassName(i.getElementById(m.outgoing.id),"is-hidden")
};g.onTouchStart=function(m){if(this.current>0){i.removeClassName(this.sectionEls[this.current-1],"is-hidden")
}if(this.current<this.sectionEls.length-1){i.removeClassName(this.sectionEls[this.current+1],"is-hidden")
}};g.resized=function(){if(!this.translateAvailble&&this.nav){this.updateNav()}};
g.destroy=function(){this.gallery.off("willShow",this.willShow);this.gallery.off("didShow",this.didShow);
i.removeEventListener(this.pbEl,"touchstart",this.onTouchStart);this.sectionEls.forEach(function(p,q){p.style="";
i.removeClassName(p,"is-hidden")});var n=i.select(".productbrowser-nav");this.pbEl.removeChild(this.wrapper);
var o=document.createElement("div");i.addClassName(o,"productbrowser-wrapper");
this.pbEl.insertBefore(o,n);o.innerHTML=this.html;var m=i.select(".productbrowser-groups");
i.setStyle(m,{width:""})};a.exports=b},{"ac-base":false,"ac-gallery":181,"ac-keyframe":245}],253:[function(c,d,b){var g=c("productbrowser").ProductBrowser,f=c("ac-base").Element,a=c("ac-promomanager");
var h=(function(){return{initialize:function(){var m=new g();var o=document.getElementById("promos");
var n=(o?o.getAttribute("data-promo-key"):null);var k=(o?o.getAttribute("data-promo-classes"):"").split(",");
var l,j;if(n!==null&&k[0]!==""){for(l=0,j=k.length;l<j;l+=1){if(f.selectAll("."+k[l]).length>1){new a(n+"-"+k[l],k[l])
}}}return this}}}());d.exports=h.initialize()},{"ac-base":false,"ac-promomanager":"5NBI0F",productbrowser:249}]},{},[253]);