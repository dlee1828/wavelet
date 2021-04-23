import React from 'react';
import logo from './logo.svg';
import './scss/style.scss';

function App() {
	return (
		<div className="mainContainer">
			<div className="title">wavelet</div>
			<audio crossOrigin="anonymous" src="bright.mp3" id="song"></audio>
			<div className="bodyContainer">
				<div className="uploadContainer">
					<input id="uploadInput" accept=".mp3" type="file" hidden></input>
					<div className="btnDiv">
						<button id="uploadButton">Upload file</button>
						<div id="fileLabel" className="label">Text</div>
					</div>
				</div>
				<div className="controlsContainer">
					<button id="pauseButton" role="switch" aria-checked="false">PAUSE</button>
					<input type="range" id="volume" min="0" max="2" value="1" step="0.01"></input>
					<input type="range" id="panner" min="-1" max="1" value="0" step="0.01"></input>
				</div>
			</div>
			<script src="build/js/main.js"></script>
		</div>
	);
}

export default App;
