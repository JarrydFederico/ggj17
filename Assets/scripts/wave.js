
function Start(){
	transform.localScale.x = 0;
	// transform.localScale.y = 0;
	transform.localScale.z = 0;
}

function FixedUpdate(){
	transform.localScale.x += 0.3;
	// transform.localScale.y += 0.1;
	transform.localScale.z += 0.3;

	if(transform.localScale.x > 10){
		Destroy(gameObject);
	}
}

function OnCollisionEnter(collision: Collision){
}