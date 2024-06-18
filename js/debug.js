//code for debug my little app on android webbrowser (developer-tools).
(function() {
	let script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/eruda';
        document.body.appendChild(script);
        script.onload = function() {
		eruda.init();
                };
        })();
    //fin codigo developer tools
