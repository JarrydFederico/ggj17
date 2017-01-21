
// boiding

private var attractRadius : float = 50.0;
private var repulseRadius : float = 5.0;
private var playersRadius : float = 20.0;
private var barrelsRadius : float = 150.0;

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
var predatorPrefab : GameObject;
var motherPrefab : GameObject;
var toxicParticle : GameObject;

private var playing : boolean = true;

function Start(){
}

function FixedUpdate(){
	var x : float = 0;
	var y : float = 0;
	var z : float = 0;
	var count : int = 0;

	if(transform.position.y < -1){
		Destroy(gameObject);
	}

	attractions = Physics.OverlapSphere(transform.position, attractRadius, ballLayer);
	repulsions = Physics.OverlapSphere(transform.position, repulseRadius, ballLayer);

// Rule 1: move towards the center of the mass
	for(var hit in attractions){
		if(hit == GetComponent.<Collider>()){
			continue;
		}

		if(Time.time > cooldown && (hit.transform.position - transform.position).magnitude < 25){
			radiation ++;
		}

		if(hit.tag == 'ball'){
			x += hit.transform.position.x;
			y += hit.transform.position.y;
			z += hit.transform.position.z;
			count ++;
		}
	}

	if(x || y || z){
		x /= count;
		y /= count;
		z /= count;

		GetComponent.<Rigidbody>().AddForce((Vector3(x, y, z) - transform.position)/2);
	}

	if(Time.time > cooldown){
		players = Physics.OverlapSphere(transform.position, playersRadius, playerLayer);
		barrels = Physics.OverlapSphere(transform.position, barrelsRadius, barrelLayer);
		cooldown = Time.time + 2.0;
	}

// Rule 2: move away from others
	for(var hit in repulsions){
		if(hit == GetComponent.<Collider>()){
			continue;
		}

		if(hit.tag == 'ball'){
			GetComponent.<Rigidbody>().AddForce((transform.position - hit.transform.position)*2.5);
		}
	}

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
	x = y = z = 0;
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
	}

	if(!playing){
		return;
	}

	var particle : GameObject;
	var neighbours : Collider[];
	count = 0;
	if(radiation >= 100){

		var type = Mathf.Floor(Random.value*2);

		if(type == 0){
			//mutate into predator
			neighbours = Physics.OverlapSphere(transform.position, 10, ballLayer);
			if(neighbours.length > 3){
				for(var neigh in neighbours){
					if(count > 3){
						continue;
					}
					if(neigh.tag != 'predator' && neigh.tag != 'mother'){
						Destroy(neigh.gameObject);
						count ++;
					}
				}
				Instantiate(predatorPrefab, transform.position, transform.rotation);
				particle = Instantiate(toxicParticle, transform.position, transform.rotation);
				Destroy(gameObject);
				Destroy(particle, 5.0);
				return;
			}
		}
		else if(type == 1){
			neighbours = Physics.OverlapSphere(transform.position, 10, ballLayer);
			if(neighbours.length > 3){
				for(var neigh in neighbours){
					if(count > 3){
						continue;
					}
					if(neigh.tag != 'predator' && neigh.tag != 'mother'){
						Destroy(neigh.gameObject);
						count ++;
					}
				}
				Instantiate(motherPrefab, transform.position, transform.rotation);
				particle = Instantiate(toxicParticle, transform.position, transform.rotation);
				Destroy(gameObject);
				Destroy(particle, 5.0);
				return;
			}
		}


		var ball = Instantiate(ballPrefab,
			(transform.position+Vector3(Random.Range(-5.0,5.0), 10 , Random.Range(-5.0,5.0))),
			transform.rotation);
		particle = Instantiate(toxicParticle, ball.transform.position, transform.rotation);
		Destroy(particle, 5.0);

		ball.GetComponent.<Rigidbody>().AddForce(Vector3(Random.Range(-30.0, -10.0),10,Random.Range(-30.0, 30.0)), ForceMode.Impulse);
		radiation = 0;
	}

	if(damage >= 50){
		Destroy(gameObject);
		particle = Instantiate(toxicParticle, transform.position, transform.rotation);
		Destroy(particle, 5.0);
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
		radiation += 0.15;
	}
}

function stop(){
	playing = false;
}