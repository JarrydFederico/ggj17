
private var damage : float = 0.0;
private var countdown : float = 0.0;

var ballPrefab : GameObject;
var toxicParticle : GameObject;

private var playing : boolean = true;

function Start(){
	transform.localScale.x = 3;
	transform.localScale.y = 1;
	transform.localScale.z = 3;

	countdown = Time.time + 10;
}

function FixedUpdate(){
	if(!playing){
		return;
	}

	if(transform.position.y < -1){
		Destroy(gameObject);
	}

	var particle : GameObject;
	if(Time.time > countdown){
		for(var i = 0; i < 10; i++){
			Instantiate(ballPrefab, transform.position+Vector3(Random.Range(-7.5,7.5), Random.Range(1.0,3.0), Random.Range(-7.5,7.5)), transform.rotation);
		}

		Destroy(gameObject);
		particle = Instantiate(toxicParticle, transform.position, transform.rotation);
		Destroy(particle, 5.0);
	}

	if(damage >= 150){
		Destroy(gameObject);
		particle = Instantiate(toxicParticle, transform.position, transform.rotation);
		Destroy(particle, 5.0);
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