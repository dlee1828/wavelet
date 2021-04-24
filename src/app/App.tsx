import React, { useEffect, useRef, useState } from 'react';
import './styles/style.scss';
import Slider from './Slider';
import { FiPlay, FiPause } from 'react-icons/fi';
import { BsFillPlayFill, BsToggleOff } from 'react-icons/bs';
import { controls } from './controls';
import { ButtonGroup } from './ButtonGroup';
import { Toggle } from './Toggle';
import { storage } from '..';
import { songs } from './songs';
import { Select } from './Select';

function App() {
	const audioRef = useRef<HTMLAudioElement>(null);

	const [fileName, setFileName] = useState("no file");
	const [playing, setPlaying] = useState(false);

	// NODE STATES
	const [pannerNode, setPannerNode] = useState((new AudioContext()).createStereoPanner());
	const [panning, setPanning] = useState(controls.panning.initial);
	const [filterNode, setFilterNode] = useState((new AudioContext()).createBiquadFilter());
	const [filterOn, setFilterOn] = useState(false);
	const [filterFrequency, setFilterFrequency] = useState(controls.filterFrequency.initial);
	const [filterType, setFilterType] = useState(controls.filterType.initial as BiquadFilterType);

	// AUDIO NODE SETUP

	useEffect(() => {
		async function effect() {

			if (fileName == "no file") return;

			// Get html audio element
			const audioElement: HTMLAudioElement = audioRef.current!;

			// Create audio context with source as audio element
			const audioContext = new AudioContext();
			const track = audioContext.createMediaElementSource(audioElement);

			const pannerOptions = { pan: 0 };
			const newPannerNode = new StereoPannerNode(audioContext, pannerOptions);
			const newFilterNode = new BiquadFilterNode(audioContext);

			newPannerNode.pan.value = panning;
			newFilterNode.type = filterOn ? filterType : "highpass";
			newFilterNode.frequency.value = filterOn ? 0 : filterFrequency;
			newFilterNode.gain.value = 8;

			// Create a reference with an initial file path and name

			// 2) Load the impulse response; upon load, connect it to the audio output.
			// let response = await fetch(url, {
			// 	mode: 'no-cors',
			// })
			// const newReverbNode = audioContext.createConvolver();
			// const arraybuffer = await response.arrayBuffer();
			// newReverbNode.buffer = await audioContext.decodeAudioData(arraybuffer);
			// track.connect(newPannerNode).connect(newFilterNode).connect(newReverbNode).connect(audioContext.destination);

			track.connect(newPannerNode).connect(newFilterNode).connect(audioContext.destination);

			setPannerNode(newPannerNode);
			setFilterNode(newFilterNode);

		}

		effect();

	}, [fileName])

	// CONTROL HANDLERS

	function handlePanningChange(x: any) {
		setPanning(x);
		if (fileName == "no file") return;
		pannerNode.pan.value = x;
		setPannerNode(pannerNode);
	}

	function handleFilterToggle(state: boolean) {
		setFilterOn(state);
		if (!state) {
			filterNode.type = "highpass";
			filterNode.frequency.value = 0;
		}
		else {
			filterNode.type = filterType;
			filterNode.frequency.value = filterFrequency;
		}
		setFilterNode(filterNode);
	}

	function handleFrequencyChange(x: any) {
		setFilterFrequency(x);
		if (fileName == "no file") return;
		filterNode.frequency.value = x;
		setFilterNode(filterNode);
	}

	function handleFilterTypeChange(x: string) {
		setFilterType(x as any);
		if (fileName == "no file") return;
		filterNode.type = x as any;
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

	async function onUploadClick() {
		var pathReference = storage.ref('');
		let url = await pathReference.child('bright.mp3').getDownloadURL();
		(document.querySelector("#audioElement") as HTMLAudioElement).src = url;
		setFileName("apple");
		// (document.querySelector("#fileUpload")! as HTMLInputElement).click();
	}

	function onUploaded() {
		const file = (document.querySelector("#fileUpload") as HTMLInputElement).files![0];
		const url = URL.createObjectURL(file);
		(document.querySelector("#audioElement") as HTMLAudioElement).src = url;
		setFileName(file.name);
	}

	// Component functions

	function filterArea() {
		if (filterOn) {
			controls.filterFrequency.initial = filterFrequency;
			controls.filterType.initial = filterType;
			controls.panning.initial = panning;
			return (
				<div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
					<div style={{ width: "450px", display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-around', alignItems: 'center' }}>
						<Slider obj={controls.filterFrequency} onChange={(e) => handleFrequencyChange(e)}></Slider>
					</div>

					<ButtonGroup filterOn={filterOn} onChange={(x: string) => handleFilterTypeChange(x)} obj={controls.filterType} ></ButtonGroup>
				</div>

			)
		}

	}

	return (
		<div className="mainContainer">
			{/* <audio src={sound} controls autoPlay /> */}
			<audio onEnded={() => setPlaying(false)} id="audioElement" crossOrigin="anonymous" ref={audioRef}></audio>
			<div className="mainTitle">wavelet</div>

			<div className="bodyContainer">
				<div style={{ marginBottom: '10px', fontSize: "25px", }}>{fileName == "no file" ? 'no file selected' : fileName}</div>
				<div className="fileUploadArea">
					<button style={{ width: '150px' }} onClick={onUploadClick}>Upload File</button>
					<input id="fileUpload" type="file" accept="audio/*" onChange={onUploaded} hidden></input>
					<div style={{ marginLeft: '10px', marginRight: '10px' }}>or</div>
					<Select options={songs}></Select>
				</div>

				<button className="playPauseButton" style={{ display: fileName == "no file" ? 'none' : 'block', borderRadius: '25px', color: playing ? 'rgb(228, 105, 105)' : 'white', backgroundColor: playing ? 'white' : 'rgb(228, 105, 105)' }} onClick={onPlay}> {playing ? <FiPause></FiPause> : <BsFillPlayFill></BsFillPlayFill>}</button>
				<div className="controlsContainer" style={{ display: fileName == "no file" ? 'none' : 'flex' }}>
					<div className="controlsColumn">
						<Toggle title="Filter" onToggle={(state: boolean) => handleFilterToggle(state)} ></Toggle>
						{filterArea()}
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
