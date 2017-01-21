
private var cooldown : float = 5.0;
var ballPrefab : GameObject;
var delay : float = 1.0;

private var playing = true;
private var space = false;

function Start(){

}

function Update(){
	if(Input.GetButtonDown('motherspace')){
		space = true;
	}
	else{
		space = false;
	}
}

function FixedUpdate(){
	if(!playing){
		return;
	}

	transform.position += Vector3(Input.GetAxis('motherhorizontal'), 0, Input.GetAxis('mothervertical'))*2;

	if(space){
		// var colliders = Physics.OverlapSphere(transform.position, 40);
		var hits = Physics.CapsuleCastAll(transform.position, transform.position-Vector3(0, 50, 0), 60, Vector3(0,-1,0));

		for(var ray in hits){
			ray.collider.SendMessage('activate', SendMessageOptions.DontRequireReceiver);
		}
	}
}

function OnGUI(){

}

function stop(){
	playing = false;
}