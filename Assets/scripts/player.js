
private var horizontal : float = 0.0;
private var vertical   : float = 0.0;
private var horizontalLook : float = 0.0;
private var verticalLook   : float = 0.0;
private var trigger    : float = 0.0;

private var cooldown : float = 0.0;
private var charge : float = 10.0;

var controls : String = 'p1';
var wave : GameObject;

private var speed : float = 100;
private var dash : boolean = false;
private var grabbed : Collider;

public var texes : Texture2D[];
public var mesh : Renderer;

function Start(){
	if(controls == 'p1'){
		mesh.material.mainTexture = texes[0];
	}
	else if(controls == 'p2'){
		mesh.material.mainTexture = texes[1];
	}
	else if(controls == 'p3'){
		mesh.material.mainTexture = texes[2];
	}
	else if(controls == 'p4'){
		mesh.material.mainTexture = texes[3];
	}
}

function Update(){
	horizontal = Input.GetAxis(controls+'horizontal')*speed;
	vertical = Input.GetAxis(controls+'vertical')*speed;

	horizontalLook = Input.GetAxis(controls+'lookhorizontal');
	verticalLook = Input.GetAxis(controls+'lookvertical');

	trigger = Input.GetAxis(controls+'trig');

	if(horizontal && vertical){
		// transform.rotation = Quaternion.LookRotation(Vector3(vertical, 0.0, horizontal).normalized);
	}

	if(horizontalLook && verticalLook){// && !grabbed
		// transform.rotation = Quaternion.RotateTowards(transform.rotation, Quaternion.Euler(Vector3(horizontalLook, 0.0, verticalLook).normalized), 0.5);
		transform.rotation = Quaternion.LookRotation(Vector3(horizontalLook, 0.0, verticalLook).normalized);
	}

	/*if(Input.GetButtonDown(controls+'dash')){
		dash = true;
	}
	else{
		dash = false;
	}*/
}

function FixedUpdate(){
	if(!grabbed){
		GetComponent.<Rigidbody>().AddForce(Vector3(horizontal, 0.0, -vertical));
	}

	/*if(dash){
		GetComponent.<Rigidbody>().AddForce(transform.right*1000);
	}*/

	//shoot wave
	if(trigger < -0.5 && Time.time > cooldown){
		wave.transform.localScale.x = 0.1049238;
		wave.transform.localScale.y = 0.4196951;
		wave.transform.localScale.z = 0.4196954;
		charge -= 0.1;
	}
	else{
		wave.transform.localScale.x = 0;
		wave.transform.localScale.y = 0;
		wave.transform.localScale.z = 0;

		charge += 0.1;
	}

	if(charge <= 0){
		cooldown = Time.time + 1.0;
	}
	else if(charge > 10){
		charge = 10;
	}
}

function OnGUI(){
	var width = Screen.width;
	var height = Screen.height;
	var Wpercent : float = width / 100.0;
	var Hpercent : float = height / 100.0;

	if(controls == 'p1'){
		GUI.Box(Rect(0, 0, Wpercent*10, Hpercent*10), ''+charge);
	}
	else if(controls == 'p2'){
		GUI.Box(Rect(Wpercent*100-Wpercent*10, 0, Wpercent*10, Hpercent*10), ''+charge);
	}
}

function OnTriggerStay(collider: Collider){
	if(collider.tag == 'predator'){
		grabbed = collider;
	}
}
