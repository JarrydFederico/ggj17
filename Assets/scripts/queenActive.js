
private var cooldown : float = 5.0;
var delay : float = 10.0;
var particles : ParticleSystem;

private var playing = true;
private var space = false;

private var health : float = 100.0;

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
	var width = Screen.width;
	var height = Screen.height;
	var Wpercent : float = width / 100.0;
	var Hpercent : float = height / 100.0;

	GUI.Box(Rect(0, 0, Wpercent*100, Hpercent*10), ''+health);
}

function activate(){
	if(Time.time > cooldown){
		cooldown = Time.time + delay*Random.Range(0.8, 1.2);


   		var balls = gameObject.FindGameObjectsWithTag('ball');
		for(var ball in balls){
			ball.SendMessage('upgrade');
		}

		balls = gameObject.FindGameObjectsWithTag('popcorn');
		for(var ball in balls){
			ball.SendMessage('upgrade');
		}

		balls = gameObject.FindGameObjectsWithTag('predator');
		for(var ball in balls){
			ball.SendMessage('upgrade');
		}

		balls = gameObject.FindGameObjectsWithTag('food');
		for(var ball in balls){
			ball.SendMessage('upgrade');
		}
	}
}

function feed(){
	health += 10;
}