import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './styles/style.scss';
import SetAudio from './sound';
import Slider from './Slider';
import { FiPlay, FiPause } from 'react-icons/fi';
import { BsFillPlayFill } from 'react-icons/bs';
import { controls } from './controls';

function App() {
	const audioRef = useRef<HTMLAudioElement>(null);

	const [fileName, setFileName] = useState("no file");
	const [playing, setPlaying] = useState(false);

	// NODE STATES
	const [pannerNode, setPannerNode] = useState((new AudioContext()).createStereoPanner());
	const [filterNode, setFilterNode] = useState((new AudioContext()).createBiquadFilter());
	const [filterType, setFilterType] = useState("lowpass" as BiquadFilterType);

	// AUDIO NODE SETUP

	useEffect(() => {

		if (fileName == "no file") return;

		// Get html audio element
		const audioElement: HTMLAudioElement = audioRef.current!;

		// Create audio context with source as audio element
		const audioContext = new AudioContext();
		const track = audioContext.createMediaElementSource(audioElement);

		const pannerOptions = { pan: 0 };
		const newPannerNode = new StereoPannerNode(audioContext, pannerOptions);
		const newFilterNode = new BiquadFilterNode(audioContext);

		newFilterNode.type = filterType;

		track.connect(newPannerNode).connect(newFilterNode).connect(audioContext.destination);

		// setGainNode(newGainNode);
		setPannerNode(newPannerNode);
		setFilterNode(newFilterNode);

	}, [fileName])

	// CONTROL HANDLERS


	function handlePanningChange(x: any) {
		if (fileName == "no file") return;
		let copy = pannerNode;
		copy.pan.value = x;
		setPannerNode(copy);
	}

	function handleFrequencyChange(x: any) {
		if (fileName == "no file") return;
		let copy = filterNode;
		filterNode.frequency.value = x;
		setFilterNode(filterNode);
	}

	// PLAY AND UPLOAD BUTTONS

	async function onPlay() {
		if (fileName == "no file") return;
		if (playing) {
			audioRef.current!.pause();
		}
		else {
			audioRef.current!.play();
		}
		setPlaying(!playing);
	}

	function onUploadClick() {
		(document.querySelector("#fileUpload")! as HTMLInputElement).click();
	}

	function onUploaded() {
		const file = (document.querySelector("#fileUpload") as HTMLInputElement).files![0];
		const url = URL.createObjectURL(file);
		(document.querySelector("#audioElement") as HTMLAudioElement).src = url;
		setFileName(file.name);
	}

	return (
		<div className="mainContainer">
			{/* <audio src={sound} controls autoPlay /> */}
			<audio onEnded={() => setPlaying(false)} id="audioElement" crossOrigin="anonymous" ref={audioRef}></audio>
			<div className="mainTitle">wavelet</div>

			<div className="bodyContainer">
				<input id="fileUpload" type="file" accept="audio/*" onChange={onUploaded} hidden></input>
				<div className="inputGroup">
					<button style={{ width: '150px' }} onClick={onUploadClick}>Upload File</button>
					<div style={{ width: '150px' }} className="label">{fileName}</div>
				</div>

				<button className="playPauseButton" style={{ borderRadius: '25px', color: playing ? 'rgb(228, 105, 105)' : 'white', backgroundColor: playing ? 'white' : 'rgb(228, 105, 105)' }} onClick={onPlay}> {playing ? <FiPause></FiPause> : <BsFillPlayFill></BsFillPlayFill>}</button>
				<div className="controlsContainer">
					<div className="controlsColumn">
						<Slider obj={controls.filterFrequency} onChange={(e) => handleFrequencyChange(e)}></Slider>
					</div>
					<div className="controlsColumn">
						<Slider obj={controls.panning} onChange={(e) => handlePanningChange(e)}></Slider>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
