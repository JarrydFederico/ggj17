
private var left  : boolean = false;
private var right : boolean = false;
private var up    : boolean = false;
private var down  : boolean = false;
private var space : boolean = false;

var controls : String = 'p1';

function Update(){
	if(Input.GetAxis(controls+'hor') < -0.1){
		left = true;
	}
	else{
		left = false;
	}
	if(Input.GetAxis(controls+'hor') > 0.1){
		right = true;
	}
	else{
		right = false;
	}
	if(Input.GetAxis(controls+'ver') < -0.1){
		up = true;
	}
	else{
		up = false;
	}
	if(Input.GetAxis(controls+'ver') > 0.1){
		down = true;
	}
	else{
		down = false;
	}

	space = false;
	if(Input.GetButton(controls+'force')){
		space = true;
	}
}

function FixedUpdate(){
	if(left){
		GetComponent.<Rigidbody>().AddForce(Vector3(-10.0, 0.0, 0.0));
	}
	if(right){
		GetComponent.<Rigidbody>().AddForce(Vector3(10.0, 0.0, 0.0));
	}
	if(up){
		GetComponent.<Rigidbody>().AddForce(Vector3(0.0, 0.0, 10.0));
	}
	if(down){
		GetComponent.<Rigidbody>().AddForce(Vector3(0.0, 0.0, -10.0));
	}

	if(space){
		var explosionRadius = 5.0;
		var colliders : Collider[] = Physics.OverlapSphere(transform.position, explosionRadius);
		var explosionPower = 100.0;

		for(var hit in colliders){
			if(hit == GetComponent.<Collider>()){
				continue;
			}
			if(hit.GetComponent.<Rigidbody>()){
				hit.GetComponent.<Rigidbody>().AddExplosionForce(explosionPower, transform.position, explosionRadius);
			}
		}
	}
}