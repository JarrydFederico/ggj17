
private var horizontal : float = 0.0;
private var vertical   : float = 0.0;
private var horizontalLook : float = 0.0;
private var verticalLook   : float = 0.0;
private var trigger    : float = 0.0;

private var cooldown : float = 0.0;
private var charge : float = 20.0;

var controls : String = 'p1';
var wave : GameObject;

private var speed : float = 100;
private var dash : boolean = false;
private var grabbed : Collider;

private var health : float = 100;

public var texes : Texture2D[];
public var mesh : Renderer;
public var energyTex : Texture2D;
public var healthTex : Texture2D;

function Start(){
	if(controls == 'p1'){
		if(!statics.player1){
			Destroy(gameObject);
		}
		mesh.material.mainTexture = texes[0];
	}
	else if(controls == 'p2'){
		if(!statics.player2){
			Destroy(gameObject);
		}
		mesh.material.mainTexture = texes[1];
	}
	else if(controls == 'p3'){
		if(!statics.player3){
			Destroy(gameObject);
		}
		mesh.material.mainTexture = texes[2];
	}
	else if(controls == 'p4'){
		if(!statics.player4){
			Destroy(gameObject);
		}
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
	else{
		health -= 0.1;
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
		cooldown = Time.time + 2.0;
		charge = 0;
	}
	else if(charge > 20.0){
		charge = 20.0;
	}
}

function OnGUI(){
	var width = Screen.width;
	var height = Screen.height;
	var Wpercent : float = width / 100.0;
	var Hpercent : float = height / 100.0;

	if(controls == 'p1'){
		GUI.DrawTexture(Rect(0, Hpercent*100-Hpercent*25, Wpercent*25, Hpercent*25), texes[4]);
		GUI.DrawTexture(Rect(Wpercent*10, Hpercent*100-Hpercent*8, Wpercent*10*(charge/20.0), Hpercent*2), energyTex);
		GUI.DrawTexture(Rect(Wpercent*10, Hpercent*100-Hpercent*15.5, Wpercent*10*(health/100.0), Hpercent*2), healthTex);
	}
	else if(controls == 'p2'){
		GUI.DrawTexture(Rect(Wpercent*25, Hpercent*100-Hpercent*25, Wpercent*25, Hpercent*25), texes[5]);
		GUI.DrawTexture(Rect(Wpercent*35, Hpercent*100-Hpercent*8, Wpercent*10*(charge/20.0), Hpercent*2), energyTex);
		GUI.DrawTexture(Rect(Wpercent*35, Hpercent*100-Hpercent*15.5, Wpercent*10*(health/100.0), Hpercent*2), healthTex);
	}
	else if(controls == 'p3'){
		GUI.DrawTexture(Rect(Wpercent*50, Hpercent*100-Hpercent*25, Wpercent*25, Hpercent*25), texes[6]);
		GUI.DrawTexture(Rect(Wpercent*60, Hpercent*100-Hpercent*8, Wpercent*10*(charge/20.0), Hpercent*2), energyTex);
		GUI.DrawTexture(Rect(Wpercent*60, Hpercent*100-Hpercent*15.5, Wpercent*10*(health/100.0), Hpercent*2), healthTex);
	}
	else if(controls == 'p4'){
		GUI.DrawTexture(Rect(Wpercent*75, Hpercent*100-Hpercent*25, Wpercent*25, Hpercent*25), texes[7]);
		GUI.DrawTexture(Rect(Wpercent*85, Hpercent*100-Hpercent*8, Wpercent*10*(charge/20.0), Hpercent*2), energyTex);
		GUI.DrawTexture(Rect(Wpercent*85, Hpercent*100-Hpercent*15.5, Wpercent*10*(health/100.0), Hpercent*2), healthTex);
	}
}

function OnTriggerStay(collider: Collider){
	if(collider.tag == 'predator'){
		grabbed = collider;
	}
}

function drain(){
	charge = 0;
	cooldown = Time.time + 2.0;
}

function takeDamage(){
	health -= 20;
}