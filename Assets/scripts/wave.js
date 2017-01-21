
function FixedUpdate(){
	GetComponent.<Renderer>().material.SetTextureOffset("_MainTex", new Vector2(0, Time.time));
}
