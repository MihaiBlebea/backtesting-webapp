(function() {
	console.log("Authenticating...")

	let token = localStorage.getItem("apiToken")
	if (token === null) {
		window.location.href = "/register.html"
	}

	console.log("Token found")
})()