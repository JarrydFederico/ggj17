
private var cooldown : float = 5.0;
var delay : float = 10.0;
var particles : ParticleSystem;

private var playing = true;
private var space = false;

function Start(){

}

function Update(){
}

function FixedUpdate(){
	if(Time.time > cooldown){
		particles.emission.enabled = true;
	}
	else{
		particles.emission.enabled = false;
	}
}

function OnGUI(){

}

function activate(){
	if(Time.time > cooldown){
		cooldown = Time.time + delay*Random.Range(0.8, 1.2);

   		var players = gameObject.FindGameObjectsWithTag('Player');

		for(var player in players){
			player.SendMessage('drain');
		}
	}
}