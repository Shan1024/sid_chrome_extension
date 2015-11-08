//window.open('main.html','_self');//TODO for testing purposes only, when server is down. remove imediately after server starts

/* globals chrome,getCookie,setCookie,injectCookie: false */

if(getCookie("sidSession")==="true"){	/*TODO Manipulate Cookies with a better approach*/
	window.open('main.html','_self');
}

document.addEventListener('DOMContentLoaded', function() {

	try{
		var btnSignin = document.getElementById('btnSignin');		//Sign in button in login page
		var usr = document.getElementById('usr');	//input text field in login page
		var pwd = document.getElementById('pwd');	//input text field in login page
		
		btnSignin.addEventListener('click', function() {
			if(usr.value==="" || pwd.value ===""){
				displayError("Please fill your details");
				return;
			}
			$.post("https://id.projects.mrt.ac.lk:9000/authenticate",
			{
				username: usr.value,	//get value from input text field
				password: pwd.value		//get value from input text field
			},
			function(data, status){
				console.log(data,status);
				if(status==="success"){
					if(data.success){
						console.log("Authentication success");
						setCookie("sidSession","true",3);	//expires after 3 days if not logged out
						injectCookie("sidSession","true",3); 	//inject to save cookie inside the main browser
						window.open('main.html','_self');
						chrome.tabs.query({url:"https://*.facebook.com/*"}, function (tabAr){
							for(var i=0;tabAr.length;i++){
								chrome.tabs.executeScript(tabAr[i].id,{
									file:'js/jquery-1.11.3.min.js'	//Inject script on sign in 
								},function(){});
								chrome.tabs.executeScript(tabAr[i].id,{
									file:'js/cookie.js'	//Inject script on sign in
								},function(){});
								chrome.tabs.executeScript(tabAr[i].id,{
									file:'js/fbInject.js',	//Inject script on sign in
									runAt: "document_end"
								},function(){});
							}
						});
						
					}else{
						displayError("Invalid Username or Password");
					}
				}else{
					console.log("Error: Post request failed");
				}
			});
		});
		
	}catch(e){/*Do nothing*/}
	
	try{
		var btnRegister = document.getElementById('btnRegister');	//Register button in login page
		
		btnRegister.addEventListener('click', function() {
			chrome.tabs.getSelected(null, function(tab) {
				chrome.tabs.executeScript(tab.id,{
				code:'window.open("http://id.projects.mrt.ac.lk")'
				},function(){
					/*Log Navigation*/
					console.log("Redirect to Sid|Main Web Page");
				});
			});
		});
	}catch(e){/*Do nothing*/}
	
}, false);

function displayError(message){
	$("#usr").css("border-color","red");
	$("#pwd").css("border-color","red");
	document.getElementById("loginError").innerText = message;
	$("#failureMsg").fadeIn(1000);
}
