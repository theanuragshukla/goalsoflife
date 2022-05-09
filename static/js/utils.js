function checkSpaces(str, exact) {
    var len = str.replace(/\s/g, '').length
    return (exact ? len === str.length && len !== 0: len !== 0)
}

function checklen(min,max,str){
	if(!checkSpaces(str, true)){
		return false;
	}
	if(!str.length<=max || !str.length>=min){
		return false;
	}
	return true;
}

function chkName(str){
	return checklen(3, 50, str)
}

function validEmail(str){
	const atposition = str.indexOf("@");
	const dotposition = str.lastIndexOf(".");
	const wrongEmail = (atposition < 1 || dotposition < atposition+2 || dotposition+2 >= str.length || str.length <= 5);
	return !wrongEmail
}

function chkEmail(str){
	return (checklen(10, 100, str) && validEmail(str))
}

function validUser(str){
	const valid = /^[a-z0-9_\.]+$/.exec(str);
	return (valid && checklen(8, 20, str));	
}
function chkPass(str){
	if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{9,}$/.test(str)){
		return checklen(8, 128, str);
	}
	return false
}

function checkAll(arr){
	if(chkPass(arr.pass) && chkEmail(arr.email) && chkName(arr.fname) && validUser(arr.user)){
		return true
	}
	alert("invalid")
	return false
} 
