function init() {
	document.addEventListener("deviceready",onDeviceReady, false);
}

function onDeviceReady() {
	navigator.notification.beep(2);
	deviceInfo();
}

function meInfo() {

	info =  'My hobbies:'+ <br> +
		'fitness, healthy cooking, baking, dancing, travels';
	document.getElementById("deviceDetails").innerHTML = info;	
}
