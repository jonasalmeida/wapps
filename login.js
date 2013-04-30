// login wApp
console.log('login for wApp');

login={
	//getAssessToken:function(){
	//	this.access_token=document.location.href.match(/access_token=([^&]+)/)[1];
	//	$('<i class="icon-plus-sign"></i>').appendTo($("#login"));
	//}
	ini:function(){ // have the body start with login.ini()
		var ak = document.location.href.match(/access_token=([^&]+)/);
		if(!!ak){
			login.access_token=ak[1];
			$('<a id="showLogin" href=#><i class="icon-plus-sign"></i></a><a id="hideLogin" href=#><i class="icon-minus-sign"></i></a><p id="userInfo"></p>').appendTo($("#login"));
			$('#showLogin').click(function(){login.showLogin()});
			$('#hideLogin').click(function(){login.hideLogin()});
			$.get('https://www.googleapis.com/oauth2/v1/userinfo?access_token='+login.access_token,function(x){
				login.userInfo=x;
				login.userInfoUI();
				$('#showLogin').click();

			})
		}
	},

	userInfoUI:function(){
		$('#userInfo').html(JSON.stringify(login.userInfo));

	},

	showLogin:function(){
		console.log('show login');
		$('#showLogin').hide();
		$('#hideLogin').show();
		$('#userInfo').show();

	},

	hideLogin:function(){
		console.log('hide login');
		$('#hideLogin').hide();
		$('#showLogin').show();
		$('#userInfo').hide();

	},

	receiveMessage:function(event){
		x = event.data;
		console.log(x);
	},

	sendMessage:function(msg,target){
		if(!target){target=window.parent}; // assume this is an iframe
		target.postMessage(msg,"*");
	}

}

// listening if talked to
window.addEventListener("message", login.receiveMessage, false);
//window.parent.postMessage("ole","*"); // talking back

// ini
//login.ini();

