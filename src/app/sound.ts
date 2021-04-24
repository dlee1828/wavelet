// export default function SetAudio() {
// 	// Get html audio element
// 	const audioElement: HTMLAudioElement = document.querySelector("#song")!;

// 	// Create audio context with source as audio element
// 	const audioContext = new AudioContext();
// 	const track = audioContext.createMediaElementSource(audioElement);

// 	// Connect source node to destination
// 	track.connect(audioContext.destination);

// 	// Get pause button
// 	const pauseButton = document.querySelector("#pauseButton");
// 	pauseButton!.addEventListener('click', onPause);

// 	let playing = false;

// 	function onPause() {
// 		if (audioContext.state == "suspended") {
// 			audioContext.resume();
// 		}

// 		if (!playing) {
// 			audioElement.play();
// 			playing = true;
// 		}
// 		else {
// 			audioElement.pause();
// 			playing = false;
// 		}
// 	}

// 	audioElement.addEventListener('ended', () => { playing = false })


// 	const gainNode = audioContext.createGain();
// 	track.connect(gainNode).connect(audioContext.destination);

// 	const volumeControl: HTMLInputElement = document.querySelector("#volume")!;

// 	volumeControl.addEventListener('input', () => {
// 		gainNode.gain.value = parseFloat(volumeControl.value);
// 	})

// 	const pannerOptions = { pan: 0 };
// 	const panner = new StereoPannerNode(audioContext, pannerOptions);

// 	const pannerControl: HTMLInputElement = document.querySelector('#panner')!;

// 	pannerControl.addEventListener('input', () => {
// 		panner.pan.value = parseFloat(pannerControl.value);
// 	})

// 	track.connect(gainNode).connect(panner).connect(audioContext.destination);




// }
export default {};