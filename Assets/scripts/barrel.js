
private var cooldown : float = 0.0;
var ballPrefab : GameObject;
var delay : float = 1.0;
var particles : ParticleSystem;

private var playing = true;
private var balls : GameObject[];

function Start(){

}

function FixedUpdate(){
	if(!playing){
		return;
	}

	if(Time.time > cooldown){
		particles.emission.enabled = true;
	}
	else{
		particles.emission.enabled = false;
	}
}

function stop(){
	playing = false;
}

function activate(){
	if(Time.time > cooldown){
		cooldown = Time.time + delay*Random.Range(0.8, 1.2);

		for(var i = 0.0; i < 6.28; i += 6.28/4.0){

			var ball = Instantiate(ballPrefab,
				(transform.position+Vector3(Mathf.Sin(i)*5, 10, Mathf.Cos(i)*5)),
				transform.rotation);

			ball.GetComponent.<Rigidbody>().AddForce(Vector3(Random.Range(-50.0, 50.0),10,Random.Range(-50.0, 50.0)), ForceMode.Impulse);
		}
	}
}