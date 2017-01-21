
private var damage : float = 0.0;

var ballPrefab : GameObject;
var toxicParticle : GameObject;

private var playing : boolean = true;

function Start(){
	transform.localScale.x = 2;
	transform.localScale.y = 2;
	transform.localScale.z = 2;
}

function FixedUpdate(){
	if(transform.position.y < -1){
		Destroy(gameObject);
	}

	var x : float = 0;
	var y : float = 0;
	var z : float = 0;
	var count : int = 0;

	var players = gameObject.FindGameObjectsWithTag('Player');

// Rule 3: move towards players
	x = y = z = 0;
	var playa = null;
	var mag = 1000;
	for(var player in players){
		if(player == GetComponent.<Collider>()){
			continue;
		}

		var asdmag = (transform.position - player.transform.position).magnitude;

		if(asdmag < mag){
			mag = asdmag;
			playa = player.gameObject;
		}
	}

	if(playa){
		GetComponent.<Rigidbody>().AddForce((playa.transform.position - transform.position).normalized * 20);
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

function OnTriggerStay(collider: Collider){
	if(collider.name == 'wave'){
		GetComponent.<Rigidbody>().AddForce((transform.position - collider.transform.position)/20.0);
		damage ++;
	}
}

function stop(){
	playing = false;
}