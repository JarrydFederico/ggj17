var sounds : AudioClip[];

var cooldown = 0.0;
function FixedUpdate(){
	if(Time.time < cooldown){
		cooldown = Time.time + 5;

		var pos = Mathf.Floor(Random.value*sounds.length);

		GetComponent.<AudioSource>().PlayOneShot(sounds[pos], 1.0);
	}
}