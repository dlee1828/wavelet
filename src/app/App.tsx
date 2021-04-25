import React, { useEffect, useRef, useState } from 'react';
import './styles/style.scss';
import Slider from './Slider';
import { FiPlay, FiPause } from 'react-icons/fi';
import { BsFillPlayFill, BsToggleOff } from 'react-icons/bs';
import { controls } from './controls';
import { FilterButtons } from './FilterButtons';
import { Toggle } from './Toggle';
import { storage } from '..';
import { songs } from './songs';
import { Select } from './Select';
import { ReverbButtons } from './ReverbButtons';
import { isWindow } from 'jquery';

declare global {
	interface Window {
		audioContext: AudioContext;
		sourceNode: MediaElementAudioSourceNode;
		filterNode: BiquadFilterNode;
		reverbNode: ConvolverNode;
		pannerNode: StereoPannerNode;
		gainNode: GainNode;
	}
}

function App() {
	const audioRef = useRef<HTMLAudioElement>(null);

	const [fileName, setFileName] = useState("no file");
	const [playing, setPlaying] = useState(false);

	// NODE STATES
	// const [audioContext, setAudioContext] = useState(null as null | AudioContext);
	const [panning, setPanning] = useState(controls.panning.initial);
	const [filterOn, setFilterOn] = useState(false);
	const [filterFrequency, setFilterFrequency] = useState(controls.filterFrequency.initial);
	const [filterType, setFilterType] = useState(controls.filterType.initial as BiquadFilterType);
	const [reverbType, setReverbType] = useState("none");
	const [gain, setGain] = useState(controls.gain.initial);

	// AUDIO NODE SETUP

	function findReverbPath(name: string): string {
		for (let item of controls.reverbType.spaces) {
			if (item.name == name) return item.path;
		}
		return "NO PATH FOUND";
	}

	useEffect(() => {
		async function effect() {

			if (fileName == "no file") return;

			setPlaying(false);

			if (window.audioContext == null) {
				window.audioContext = new AudioContext();
			}

			// Create audio context with source as audio element
			if (window.sourceNode == null) {
				window.sourceNode = window.audioContext.createMediaElementSource(audioRef.current!);
			}
			const pannerOptions = { pan: 0 };
			if (window.pannerNode == null) {
				window.pannerNode = new StereoPannerNode(window.audioContext, pannerOptions);
			}
			if (window.filterNode == null) {
				window.filterNode = new BiquadFilterNode(window.audioContext);
			}
			if (window.reverbNode == null) {
				window.reverbNode = window.audioContext.createConvolver();
			}
			if (window.gainNode == null) {
				window.gainNode = window.audioContext.createGain();
			}

			window.pannerNode.pan.value = panning;
			window.filterNode.type = filterOn ? filterType : "highpass";
			window.filterNode.frequency.value = filterOn ? filterFrequency : 0;
			window.filterNode.gain.value = 8;
			window.gainNode.gain.value = gain;

			if (reverbType == "none") {
				window.sourceNode.connect(window.gainNode).connect(window.pannerNode).connect(window.filterNode).connect(window.audioContext.destination);
				return;
			}

			// Load the impulse response; upon load, connect it to the audio output.
			let pathReference = storage.ref('');
			let path = findReverbPath(reverbType);
			let url = await pathReference.child(path).getDownloadURL();
			let response = await fetch(url);
			const arraybuffer = await response.arrayBuffer();
			window.reverbNode.buffer = await window.audioContext.decodeAudioData(arraybuffer);

			window.sourceNode.connect(window.gainNode).connect(window.pannerNode).connect(window.filterNode).connect(window.reverbNode).connect(window.audioContext.destination);
			// newFilterNode.disconnect();
			// newReverbNode.disconnect();
			// newFilterNode.connect(newAudioContext.destination);




		}

		effect();

	}, [fileName])

	// CONTROL HANDLERS

	function handlePanningChange(x: any) {
		setPanning(x);
		if (fileName == "no file") return;
		window.pannerNode.pan.value = x;
	}

	function handleFilterToggle(state: boolean) {
		setFilterOn(state);
		if (!state) {
			window.filterNode.type = "highpass";
			window.filterNode.frequency.value = 0;
		}
		else {
			window.filterNode.type = filterType;
			window.filterNode.frequency.value = filterFrequency;
		}
	}

	function handleFrequencyChange(x: any) {
		setFilterFrequency(x);
		if (fileName == "no file") return;
		window.filterNode.frequency.value = x;
	}

	function handleFilterTypeChange(x: string) {
		setFilterType(x as any);
		if (fileName == "no file") return;
		window.filterNode.type = x as any;
	}

	async function handleSelectSong(value: string) {
		var pathReference = storage.ref('');
		let url = await pathReference.child(value).getDownloadURL();
		(audioRef.current!).src = url;
		setFileName(value);
	}

	async function handleReverbChange(x: string) {
		// Check if changed to or from none
		if (x == "none") {
			// Switched to none
			window.filterNode.disconnect();
			window.reverbNode.disconnect();
			window.filterNode.connect(window.audioContext.destination!);
			setReverbType(x);
			return;
		}
		if (reverbType == "none") {
			// Switched from none
			window.filterNode.disconnect();
			window.filterNode.connect(window.reverbNode);
			window.reverbNode.connect(window.audioContext.destination);
		}
		// Set reverb type
		setReverbType(x);
		let path = findReverbPath(x);
		console.log(path);
		let pathReference = storage.ref('');
		let url = await pathReference.child(path).getDownloadURL();
		let response = await fetch(url);
		let arraybuffer = await response.arrayBuffer();
		window.reverbNode.buffer = await window.audioContext!.decodeAudioData(arraybuffer);
	}

	function handleGainChange(x: number) {
		setGain(x);
		if (fileName == "no file") return;
		window.gainNode.gain.value = x;
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
		(document.querySelector("#fileUpload")! as HTMLInputElement).click();
	}

	function onUploaded() {
		const file = (document.querySelector("#fileUpload") as HTMLInputElement).files![0];
		const url = URL.createObjectURL(file);
		(audioRef.current! as HTMLAudioElement).src = url;
		setFileName(file.name);
	}

	// Component functions

	useEffect(() => {
		controls.filterFrequency.initial = filterFrequency;
		controls.filterType.initial = filterType;
		controls.panning.initial = panning;
	}, [filterOn])



	return (
		<div className="mainContainer">
			{/* <audio src={sound} controls autoPlay /> */}
			<audio onEnded={() => setPlaying(false)} id={fileName} crossOrigin="anonymous" ref={audioRef}></audio>
			<div className="mainTitle">wavelet</div>

			<div className="bodyContainer">
				<div style={{ marginBottom: '10px', fontSize: "25px", }}>{fileName == "no file" ? 'no file selected' : fileName}</div>
				<div className="fileUploadArea">
					<button style={{ width: '150px' }} onClick={onUploadClick}>Upload File</button>
					<input id="fileUpload" type="file" accept="audio/*" onChange={onUploaded} hidden></input>
					<div style={{ marginLeft: '10px', marginRight: '10px' }}>or</div>
					<Select onChange={(value) => handleSelectSong(value)} options={songs}></Select>
				</div>

				<button className="playPauseButton" style={{ display: fileName == "no file" ? 'none' : 'block', borderRadius: '25px', color: playing ? 'rgb(228, 105, 105)' : 'white', backgroundColor: playing ? 'white' : 'rgb(228, 105, 105)' }} onClick={onPlay}> {playing ? <FiPause></FiPause> : <BsFillPlayFill></BsFillPlayFill>}</button>
				<div className="controlsContainer" style={{ display: fileName == "no file" ? 'none' : 'flex' }}>
					<div className="controlsColumn">
						<Slider obj={controls.gain} onChange={(e) => handleGainChange(e)}></Slider>
						<div style={{ display: 'flex', marginTop: '20px', flexFlow: 'column nowrap', alignItems: 'center', }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', width: '130px' }}>
								<div className="title">Filter</div>
								<Toggle onToggle={(state: boolean) => handleFilterToggle(state)} ></Toggle>
							</div>
							<FilterButtons disabled={!filterOn} filterOn={filterOn} onChange={(x: string) => handleFilterTypeChange(x)} obj={controls.filterType} ></FilterButtons>
							<Slider disabled={!filterOn} obj={controls.filterFrequency} onChange={(e) => handleFrequencyChange(e)}></Slider>
						</div>
					</div>
					<div className="controlsColumn">
						<Slider obj={controls.panning} onChange={(e) => handlePanningChange(e)}></Slider>
						<ReverbButtons obj={controls.reverbType} onChange={(name) => handleReverbChange(name)}></ReverbButtons>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
