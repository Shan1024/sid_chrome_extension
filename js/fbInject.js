timeLineCName = document.getElementById('fb-timeline-cover-name');		//element to identify fb profileUpStatBtn = document.getElementsByClassName('uiIconText _51z7')[0];		//element to identify fb wallmembersBtn = document.getElementsByClassName('_2l5d')[1];				//element to identify fb grouptimeLineHLine = document.getElementById('fbTimelineHeadline');			//element to identify fb pagevar sidId = document.getElementById('sidId');if(getCookie("sidSession")=="true"){	//check whether user is logged in	identify();	//identify web page}function identify(){	if(timeLineCName!=null && timeLineHLine!=null && sidId == null){		manipulate();	//if an fb profile, and haven't modified before, then add sid elements	}}function manipulate(){		sidId = document.createElement("DIV"); 	sidId.innerHTML = "<p id='sidId'></p>";	document.getElementsByClassName('photoContainer')[0].appendChild(sidId);	timeLineCName.innerHTML += 		'<span class="_5rqt"><span class="_5rqu"><span data-hover="tooltip" data-tooltip-position="right" class="_56_f _5dzy _5d-1 _5d-3" id="u_jsonp_2_7" aria-label="sID Verified User"></span></span></span>'		updateProfPic();		var node = document.createElement("DIV");  	node.innerHTML=('<div class="_6a uiPopover _6-6 _9rx _5v-0" id="u_0_p"><a class="_9ry _p" href="#" aria-haspopup="true" aria-expanded="false" rel="toggle" role="button" id="u_0_q" aria-owns="u_a_0">sID Analytics<i class="_bxy img sp_qk8sNUxukfD sx_1586e3"></i></a></div>');		document.getElementsByClassName('_6_7 clearfix')[0].appendChild(node);	}/** Appends sid-rating state over fb profile picture*/function updateProfPic(){	var profID = document.	var profPic = document.getElementsByClassName("photoContainer")[0];	var icon = document.createElement("DIV");	var imgURL = chrome.extension.getURL("resources/icons/prof" + getProfRating(2) + ".png");		icon.innerHTML = "<img id ='verif' width='60' height='60' style='position:absolute;left:120px;top:-38px;z-index:1;'>"	profPic.appendChild(icon);	document.getElementById('verif').src = imgURL;}/**Returns the rating of a claim*/ /*TODO - update DUMMY method body with relevant calls to backend API*/function getProfRating(targetUser){	if(targetUser == 1){		return "T";	//True		Green	}else if(targetUser == 2){		return "R"	//Reject	Red	}else{		return "C"	//Uncertain Yellow	}}/**Get a cookie from main browser*/function getCookie(cname) {    var name = cname + "=";    var ca = document.cookie.split(';');    for(var i=0; i<ca.length; i++) {        var c = ca[i];        while (c.charAt(0)==' ') c = c.substring(1);        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);    }    return "";}