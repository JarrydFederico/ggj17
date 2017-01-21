
private var damage : float = 0.0;

private var playing : boolean = true;
private var speedMod : float = 1.0;

var toxicParticle : GameObject;
var mother : Transform;

function Start(){
	transform.localScale.x = 2;
	transform.localScale.y = 1;
	transform.localScale.z = 1;

	mother = gameObject.FindGameObjectWithTag('mother').transform;
}

function FixedUpdate(){
	if(transform.position.y < -1){
		Destroy(gameObject);
	}

	GetComponent.<Rigidbody>().AddForce((mother.position - transform.position).normalized * 20 * speedMod);

	if(speedMod > 1.0){
		speedMod -= 0.01;
	}

	if(!playing){
		return;
	}

	var particle : GameObject;
	if(damage >= 150){
		Destroy(gameObject);
		particle = Instantiate(toxicParticle, transform.position, transform.rotation);
		Destroy(particle, 5.0);
	}
}

function OnCollisionEnter(collision: Collision){
	if(collision.collider.name == 'mother'){
		Destroy(gameObject);
		particle = Instantiate(toxicParticle, transform.position, transform.rotation);
		Destroy(particle, 5.0);

		collision.collider.SendMessage('feed');
	}
}

function OnTriggerStay(collider: Collider){
	if(collider.name == 'wave'){
		GetComponent.<Rigidbody>().AddForce((transform.position - collider.transform.position)/20.0);
		damage ++;
	}
}

function stop(){
	playing = false;
}

function upgrade(){
	speedMod = 3.0;
}