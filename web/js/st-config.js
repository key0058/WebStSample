/*
* If any js/css updated, please update this version num.
*/
var websiteDebug = true;
var websiteVersion = "v1.19";
var websiteLanguage = "zh-cn";
var websitePath = "http://www.st-lorraine.edu.hk/new2018/"


$(function() {
    /**
     * Debug test
     */
    if (websiteDebug) {
        websiteVersion = Math.random();
        websitePath = "http://192.168.0.199/StEduHk/new/"
    }

    $.extend({ 
        includePath: '', 
        include: function(file) { 
            var files = typeof file == "string" ? [file]:file; 
            for (var i = 0; i < files.length; i++) { 
                var name = files[i].replace(/^\s|\s$/g, ""); 
                var att = name.split('.'); 
                var ext = att[att.length - 1].toLowerCase(); 
                var isCSS = ext == "css"; 
                var tag = isCSS ? "link" : "script"; 
                var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' "; 
                var link = (isCSS ? "href" : "src") + "='" + $.includePath + name + "?" + websiteVersion + "'"; 
                if ($(tag + "[" + link + "]").length == 0) 
                    $("head").append("<" + tag + attr + link + "></" + tag + ">"); 
            } 
       } 
    });

    console.log("load config start");

    $.include([
        websitePath + "css/bootstrap.min.css",
        websitePath + "js/wowslider/style.css",
        websitePath + "css/magic.css",
        websitePath + "css/st.css",

        websitePath + "js/bootstrap.min.js",
        websitePath + "js/wowslider/wowslider.js",
        websitePath + "js/wowslider/wowslider.mod.js",
        websitePath + "js/wowslider/script.js",
        websitePath + "js/st-i18n.js",
        websitePath + "js/st.js",
    ]);

    console.log("load config end");
})

