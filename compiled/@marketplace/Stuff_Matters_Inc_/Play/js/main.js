!function(){window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(callback,thisArg){thisArg=thisArg||window;for(var i=0;i<this.length;i++)callback.call(thisArg,this[i],i,this)});var callback,play_mobile_nav_container=document.querySelector(".play_mobile_nav_container"),navToggle=document.querySelector(".play_mob_nav_check"),play_window=document.querySelector(".play_window"),lang=document.querySelector(".m_w_languages"),langToggle=document.querySelectorAll(".mwh_lang_toggle"),search=document.querySelector(".m_w_search"),searchToggle=document.querySelectorAll(".mwh_search_toggle"),closeToggle=document.querySelectorAll(".header__close--toggle"),allElementsToClose=document.querySelectorAll(".play_window, .m_w_languages, .m_w_search"),emailGlobalUnsub=document.querySelector('input[name="globalunsub"]');function toggleNav(){play_mobile_nav_container.classList.toggle("open")}function toggleLang(){play_window.classList.toggle("open"),lang.classList.toggle("open")}function toggleSearch(){play_window.classList.toggle("open"),search.classList.toggle("open")}function closeAll(){allElementsToClose.forEach((function(element){element.classList.remove("open")})),document.getElementById("goTop").classList.remove("z0"),document.querySelector(".header").classList.remove("z0")}function toggleDisabled(){document.querySelectorAll("#email-prefs-form .item").forEach((function(item){var emailSubItemInput=item.querySelector("input");emailGlobalUnsub.checked?(item.classList.add("disabled"),emailSubItemInput.setAttribute("disabled","disabled"),emailSubItemInput.checked=!1):(item.classList.remove("disabled"),emailSubItemInput.removeAttribute("disabled"))}))}callback=function(){document.body&&(langToggle&&Array.prototype.forEach.call(langToggle,(function(el){el.addEventListener("click",toggleLang)})),navToggle&&navToggle.addEventListener("change",toggleNav),searchToggle&&Array.prototype.forEach.call(searchToggle,(function(el){el.addEventListener("click",toggleSearch)})),closeToggle&&Array.prototype.forEach.call(closeToggle,(function(el){el.addEventListener("click",closeAll)})),emailGlobalUnsub&&emailGlobalUnsub.addEventListener("change",toggleDisabled))},["interactive","complete"].indexOf(document.readyState)>=0?callback():document.addEventListener("DOMContentLoaded",callback)}();var y_scroll=600,end_scroll=1200,mybutton=document.getElementById("goTop"),stickyBar=document.getElementById("play_sticky_bar");function scrollFunction(){var top=this.scrollY;top>y_scroll&&top<document.body.scrollHeight-end_scroll?(mybutton.classList.add("open"),stickyBar&&stickyBar.classList.add("open")):(mybutton.classList.remove("open"),stickyBar&&stickyBar.classList.remove("open"))}function goToTop(){document.documentElement.scrollTop=0}window.onscroll=function(){scrollFunction()};
//# sourceURL=https://cdn1.hubspotusercontent-eu1.net/hub/26937672/hub_generated/template_assets/61692941273/1676287496147/marketplace/Stuff_Matters_Inc_/Play/js/main.js