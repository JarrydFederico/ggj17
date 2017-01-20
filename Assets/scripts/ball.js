
function FixedUpdate(){
	if(transform.position.x > 1 && transform.position.z > 1){
		//color = red
		GetComponent.<Renderer>().material.color = Color(1.0, 0.0, 0.0);
	}

	else if(transform.position.x > 1 && transform.position.z < -1){
		//color = green
		GetComponent.<Renderer>().material.color = Color(0.0, 1.0, 0.0);
	}

	else if(transform.position.x < -1 && transform.position.z > 1){
		//color = blue
		GetComponent.<Renderer>().material.color = Color(0.0, 0.0, 1.0);
	}

	else if(transform.position.x < -1 && transform.position.z < -1){
		//color = yellow
		GetComponent.<Renderer>().material.color = Color(1.0, 1.0, 0.0);
	}

	else{
		//color = white
		GetComponent.<Renderer>().material.color = Color(1.0, 1.0, 1.0);
	}
}

function OnCollisionEnter(collision: Collision){
	if(collision.collider.name == 'ring'){
		GetComponent.<Rigidbody>().AddForce(transform.position*-10);
	}
}