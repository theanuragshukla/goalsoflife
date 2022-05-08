function login(){
	const user = document.getElementById('user')
	const pass = document.getElementById('pass')

	const data = {
		pass:pass.value,
		user:user.value
	}
	
fetch('/let-me-in', {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify( {
		pass:pass.value,
		"user":user.value
		})
})
	.then(res=>res.json())
	.then(res=>alert(res.status ? "welcome back! "+res.result : res.result))
	
}
