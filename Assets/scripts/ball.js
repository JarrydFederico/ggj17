
// boiding

private var attractRadius : float = 100.0;
private var attractModifier : float = 1.0;
private var repulseRadius : float = 5.0;
private var playersRadius : float = 20.0;
private var barrelsRadius : float = 150.0;
private var irradiateModifier : float = 1.0;

private var ballLayer = 1 << 8;
private var playerLayer = 1 << 9;
private var barrelLayer = 1 << 10;

private var cooldown : float = -1.0;

private var attractions : Collider[];
private var repulsions : Collider[];
private var players : Collider[];
private var barrels : Collider[];

private var radiation : float = 0.0;
private var damage : float = 0.0;

var ballPrefab : GameObject;
var mutations : GameObject[];
var toxicParticle : GameObject;
var particles : ParticleSystem;

private var playing : boolean = true;

function Start(){
}

function Update(){
	if(radiation >= 100){
		particles.emission.enabled = true;
	}
	else{
		particles.emission.enabled = false;
	}
}

function FixedUpdate(){
	var x : float = 0;
	var y : float = 0;
	var z : float = 0;
	var count : int = 0;

	if(transform.position.y < -100){
		Destroy(gameObject);
	}

	// attractions = Physics.OverlapSphere(transform.position, attractRadius*(attractModifier == 1.0 ? 1.0 : 2.0), ballLayer);
	// repulsions = Physics.OverlapSphere(transform.position, repulseRadius, ballLayer);
	var balls = gameObject.FindGameObjectsWithTag('ball');

// Rule 1: move towards the center of the mass
	for(var ball in balls){
		//attract
		if(Vector3.Distance(ball.transform.position, transform.position) < attractRadius){
			if(Time.time > cooldown && (ball.transform.position - transform.position).magnitude < 25){
				radiation += 1.0*irradiateModifier;
			}

			x += ball.transform.position.x;
			y += ball.transform.position.y;
			z += ball.transform.position.z;
			count ++;
		}
		//repulse
		if(Vector3.Distance(ball.transform.position, transform.position) < repulseRadius){
			GetComponent.<Rigidbody>().AddForce((transform.position - ball.transform.position)*2.5);
		}
	}

	if(x || y || z){
		x /= count;
		y /= count;
		z /= count;

		GetComponent.<Rigidbody>().AddForce((Vector3(x, y, z) - transform.position).normalized*5*attractModifier);
	}

	// GetComponent.<Rigidbody>().AddForce((Vector3(x, 0, 0) - transform.position).normalized*5);

	if(Time.time > cooldown){
		players = Physics.OverlapSphere(transform.position, playersRadius, playerLayer);
		barrels = Physics.OverlapSphere(transform.position, barrelsRadius, barrelLayer);
		cooldown = Time.time + 2.0;
	}

	if(attractModifier > 1.0){
		attractModifier -= 0.1;
	}
	if(irradiateModifier > 1.0){
		irradiateModifier -= 0.1;
	}

// Rule 2: move away from others
	/*for(var hit in repulsions){
		if(hit == GetComponent.<Collider>()){
			continue;
		}

		if(hit.tag == 'ball'){
			GetComponent.<Rigidbody>().AddForce((transform.position - hit.transform.position)*2.5);
		}
	}*/

// Rule 3: move away from players
	x = y = z = 0;
	for(var hit in players){

		if(hit == GetComponent.<Collider>()){
			continue;
		}

		var vec = transform.position - hit.transform.position;
		var mag = (40-vec.magnitude);
		var dir : Vector3 = vec.normalized;
		GetComponent.<Rigidbody>().AddForce((dir*mag));
	}

// Rule 4: attracted to barrels (modify to choose the closest?)
	/*x = y = z = 0;
	for(var hit in barrels){
		if(hit == GetComponent.<Collider>()){
			continue;
		}

		if((hit.transform.position - transform.position).magnitude < 15){
			radiation ++;
		}

		if(hit.tag == 'barrel'){
			GetComponent.<Rigidbody>().AddForce((hit.transform.position - transform.position)/20);
		}
	}*/

	if(!playing){
		return;
	}

	var particle : GameObject;
	var neighbours : Collider[];
	count = 0;

	if(damage >= 50){
		Destroy(gameObject);
		particle = Instantiate(toxicParticle, transform.position, transform.rotation);
		Destroy(particle, 5.0);

		var explosionRadius = 20.0;
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

function OnCollisionEnter(collision: Collision){
	if(collision.collider.name == 'ring'){
		GetComponent.<Rigidbody>().AddForce(transform.position*-10);
	}
}

function OnTriggerStay(collider: Collider){
	if(collider.name == 'wave'){
		GetComponent.<Rigidbody>().AddForce((transform.position - collider.transform.position)/2.0);
		damage ++;
		radiation += 0.15*irradiateModifier;
	}
}

function stop(){
	playing = false;
}

function upgrade(){
	attractModifier = 5.0;
	irradiateModifier = 5.0;
}

function activate(){
	var count : int = 0;
	if(radiation >= 100){
		var type = Mathf.Floor(Random.value*mutations.length);

		neighbours = Physics.OverlapSphere(transform.position, 10, ballLayer);
		if(neighbours.length > 5){
			for(var neigh in neighbours){
				if(count > 5){
					continue;
				}
				if(neigh.tag != 'predator' && neigh.tag != 'mother'){
					Destroy(neigh.gameObject);
					count ++;
				}
			}

			Instantiate(mutations[type], transform.position, transform.rotation);
			particle = Instantiate(toxicParticle, transform.position, transform.rotation);
			Destroy(gameObject);
			Destroy(particle, 5.0);
		}
		else{
			particle = Instantiate(toxicParticle, transform.position, transform.rotation);
			Destroy(gameObject);
			Destroy(particle, 5.0);
		}

	}
}