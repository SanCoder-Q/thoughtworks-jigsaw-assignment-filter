var username = $(".user-menu .username").text();
var tabUrl = location.href;
if(!tabUrl.match(/jigsaw\.thoughtworks.+assignment/)) {
    chrome.storage.sync.remove(["tracked"]);
} else {
    chrome.storage.sync.get("tracked", function(data) {
        if(data.tracked == tabUrl) return;
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.text = `var _gaq=_gaq||[];_gaq.push(['_setAccount','UA-58271438-2']);_gaq.push(['_trackPageview']);_gaq.push(['_setCustomVar',1,'userId','${username}',3]);var ga=document.createElement('script');ga.type='text/javascript';ga.async=true;ga.src='https://ssl.google-analytics.com/ga.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga,s);`;
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        chrome.storage.sync.set({tracked: tabUrl});
    });
}
