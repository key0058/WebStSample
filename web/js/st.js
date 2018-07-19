$(function() {
	var menuFlag = true;
	var aBarFlag = true;
	var qBarFlag = true;
	var formFlag = true;
	
	$(document).ready(function() {
		/*
		* Load common page content
		*/

		if ($("#header").length > 0) {
			$("#header").load(websitePath + "common/header.html");
		}
		if ($("#applyBar").length > 0) {
			aBarFlag=false;
			$("#applyBar").load(websitePath + "common/apply-bar.html", function() { aBarFlag = true; });
		} 
		if ($("#menu").length > 0) {
			menuFlag = false; 
			$("#menu").load(websitePath + "common/menu.html", function() { menuFlag = true; });
		} 
		if ($("#questionBar").length > 0) {
			qBarFlag = false;
			$("#questionBar").load(websitePath + "common/question-bar.html", function() { qBarFlag = true; });
		}
		if ($("#applyForm").length > 0) {
			formFlag = false;
			$("#applyForm").load(websitePath + "common/apply-form.html", function() { formFlag = true; });
		}
		if ($("#footer").length > 0) {
			$("#footer").load(websitePath + "common/footer.html");
		}
	});

	/*
	* When common page all load, then do anything.
	*/
	var pageEnd = setInterval(function() {
		if (menuFlag && aBarFlag && qBarFlag && formFlag) {

			updateAboutUsMenu();
			$(".hover-effect").click(function(event) {
				event.preventDefault();
				goPage($(this).children("a").attr("href"));
			});

			initApplyLaterForm();
			$(".st-dropdown>.st-dropdown-button").click(function() {
				if ($(this).next(".st-dropdown-menu").css("display") == "none") {
					openDropdownMenu(this);
				} else {
					closeDropdownMenu(this);
				}
			});


			// console.log($(".st-dropdown-menu>li>a"));
			// $(".st-dropdown-menu>li>a").click(function(event) {
			// 	console.log($(this).html());
			// 	$("#applynowMenu").children("strong").text($(this).html());
			// 	closeDropdownMenu($(".st-dropdown>.st-dropdown-button"));
			// 	$(".school-form>div>table").hide();
			// 	$("#" + $(this).attr("name")).slideDown();
			// 	event.preventDefault();
			// });

			$("[setAbsolutePath]").each(function() {
				if (!$.isEmptyObject($(this).attr("src"))) {
					var path = websitePath + $(this).attr("src");
					$(this).attr("src", path);
					console.log($(this).attr("src"));
				}
				
			});

			resetLanguage(websiteLanguage);
			resetArticleTitle();
			clearInterval(pageEnd);
		}
	}, 500);

	// window.scrollReveal = ScrollReveal({ reset: true });
	// scrollReveal.reveal('.st-lazy-in');
});	

/*
* Load page function
* 1. check url param "lang"
* 2. keep lanuage setting in any page
*/
function goPage(url, language) {
	var link = window.location.href;
	if (url == "" || url == "this") {
		url = link.substring(0, link.lastIndexOf("?"));
	}
	if ($.isEmptyObject(language)) {
		language = websiteLanguage;
		if (queryUrlParam("lang") != null) {
			language = queryUrlParam("lang");
		}
	}	
	window.location.href = url + "?lang=" + language;
}

/* 
* Set page content by i18n config
* 1. refer file: js/st-i18n.js
* 2. (zh-cn/zh-hk/en)
* 3. custome tag attribute "i18n"
*/
function resetLanguage(language) {
	if ($.isEmptyObject(language)) {
		language = websiteLanguage;
	}
	if (queryUrlParam("lang") != null) {
		language = queryUrlParam("lang");
	}

	//Mutil-Language setting
	var map = returnJSONi18n(language);
	if ($.isEmptyObject(map) == true) {
		map = returnJSONi18n(websiteLanguage);
	}
	$("[i18n]").each(function() {
		$(this).html(map[$(this).attr("i18n")]);
	});
}

/*
* For title align justify
*/
function resetArticleTitle() {
	$(".st-article-title h3").css("width", $(".st-article-title h1").innerWidth());
}

/*
* Apply later form 
* 1. drop down menu logic
* 2. 
*/
function initApplyLaterForm() {
	$("#email").val("");
	$("#emailFormBtn").slideUp();
	$("#applylaterMenu").parent().nextAll(".radio-inline").slideUp();
	$("#applylaterMenu").children("b").text("Please select campus");
}

function showSchoolType(schoolArea, schoolName) {
	$("#emailFormBtn").slideDown();
	$("#applylaterMenu").children("b").text(schoolName);
	$("#applylaterMenu").parent().nextAll(".radio-inline").slideUp();
	$("#schoolArea").val(schoolArea);
	
	if (schoolArea == "kowloon") {
		$("#applylaterMenu").parent().nextAll(".radio-inline").slideDown();
	} else if (schoolArea == "hongkong") {
	} else if (schoolArea == "yuenlong") {
	}
	closeDropdownMenu($("#applylaterMenu"));
	return false;
}

function openDropdownMenu(dropdownButtonObject) {
	$(dropdownButtonObject).children("span").addClass("glyphicon-minus");
	$(dropdownButtonObject).children("span").removeClass("glyphicon-plus");
	$(dropdownButtonObject).next(".st-dropdown-menu").slideDown();
}

function closeDropdownMenu(dropdownButtonObject) {
	$(dropdownButtonObject).children("span").removeClass("glyphicon-minus");
	$(dropdownButtonObject).children("span").addClass("glyphicon-plus");
	$(dropdownButtonObject).next(".st-dropdown-menu").slideUp();
}	

/*
* Update about us menu
* 1. show about us icon instead current page icon
*/
function updateAboutUsMenu() {
	if ($("#menu").length > 0) {
		var path = window.location.pathname;
		var page = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
		var tag = '<a href="about-us.html">';
		tag += '<img class="img-responsive center-block" src="images/menu/aboutus.png" />';
		tag += '<p i18n="menu.aboutus">Our School</p>';
		tag += '</a>';
		tag += '<div class="overlay">';
		tag += '<table><tr><td i18n="menu.aboutus">Our School</td></tr></table>';
		tag += '</div>';
		$("#" + page).children("a").remove();
		$("#" + page).children("div").remove();
		$("#" + page).append(tag);
	}
}

/*
* Function for get url param by key
*/
function queryUrlParam(name) {
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if (r!=null) return  unescape(r[2]); return null;
}

