
private var damage : float = 0.0;
private var countdown : float = 0.0;

var toxicParticle : GameObject;

private var playing : boolean = true;

public var anim : GameObject;

function Start(){
	countdown = Time.time + 10;
}

function FixedUpdate(){
	if(!playing){
		return;
	}

	if(transform.position.y < -100){
		Destroy(gameObject);
	}

	var particle : GameObject;
	// if(Time.time > countdown-0.5){
		// anim.GetComponent.<Animator>().SetTrigger("Explode");
	// }
	if(Time.time > countdown){
		// Damage players
		var players = gameObject.FindGameObjectsWithTag('Player');

		for(var player in players){
			if((player.transform.position - transform.position).magnitude < 20){
				player.sendMessage('takeDamage');
  				player.GetComponent.<Rigidbody>().AddExplosionForce(100, transform.position, 30);
			}
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

function upgrade(){
	countdown -= 2.5;
}




