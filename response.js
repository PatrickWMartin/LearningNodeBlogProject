
function response(resObject){
	function send(content){
		resObject.end(content);
	}

	return{send, resObject}
}

module.exports = response;
