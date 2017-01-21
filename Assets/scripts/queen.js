
private var cooldown : float = 5.0;
var ballPrefab : GameObject;
var delay : float = 1.0;

private var playing = true;
private var balls : GameObject[];

function Start(){

}

function FixedUpdate(){
	if(!playing){
		return;
	}

	if(transform.position.y < -1){
		Destroy(gameObject);
	}

	if(Time.time > cooldown){
		cooldown = Time.time + delay*Random.Range(0.8, 1.2);

		for(var i = 0; i < 1; i++){
			var ball = Instantiate(ballPrefab,
				(transform.position+Vector3(Random.Range(-5.0,5.0), 10 , Random.Range(-5.0,5.0))),
				transform.rotation);

			ball.GetComponent.<Rigidbody>().AddForce(Vector3(Random.Range(-50.0, 50.0),10,Random.Range(-50.0, 50.0)), ForceMode.Impulse);
		}
	}
}

function OnGUI(){
	var width = Screen.width;
	var height = Screen.height;
	var Wpercent : float = width / 100.0;
	var Hpercent : float = height / 100.0;

	balls = gameObject.FindGameObjectsWithTag('ball');

	GUI.Box(Rect(0, Hpercent*100-Hpercent*10, Wpercent*10, Hpercent*10), ''+balls.length);

	if(balls.length > 150){
		//game over

		for(var ball in balls){
			ball.BroadcastMessage('stop');
		}

		var barrels = gameObject.FindGameObjectsWithTag('barrel');
		for(var barrel in barrels){
			barrel.BroadcastMessage('stop');
			stop();
		}
	}
}

function stop(){
	playing = false;
}