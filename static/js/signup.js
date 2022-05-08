function signup(){
	const fname  = document.getElementById('fname')
	const lname  = document.getElementById('lname')
	const email = document.getElementById('email')
	const user = document.getElementById('user')
	const pass = document.getElementById('pass')

	const data = {
		fname:fname.value,
		lname:lname.value,
		email:email.value,
		pass:pass.value,
		user:user.value
	}
	alert(user.value)	
	
fetch('/add-new-user', {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify( {
		fname:fname.value,
		lname:lname.value,
		email:email.value,
		pass:pass.value,
		"user":user.value
		})
})
	.then(res=>res.json())
	.then(res=>console.log(res))
	
}
