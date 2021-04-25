export const controls = {
	panning: {
		title: "Panning",
		min: -1,
		max: 1,
		step: 0.05,
		initial: 0,
		unit: "",
	},
	filterFrequency: {
		title: "",
		min: 0,
		max: 4000,
		initial: 500,
		step: 10,
		unit: "Hz",
	},
	filterType: {
		title: "",
		initial: "lowpass",
		names: [
			"lowpass",
			"highpass",
			"bandpass",
			"lowshelf",
			"highshelf",
			"peaking",
			"notch",
			"allpass",
		],
		unit: "",
	},
	reverbType: {
		title: "Reverb",
		initial: "none",
		spaces: [
			{
				name: "none",
				path: "",
			},
			{
				name: "basement",
				path: "basement.mp4",
			},
			{
				name: "mall",
				path: "SquareVictoriaDome.wav",
			},
			{
				name: "chapel",
				path: "chapel.mp4",
			},
			{
				name: "living room",
				path: "livingroom.mp4",
			},
			{
				name: "tunnel",
				path: "tunnel.wav",
			},
			{
				name: "lecture hall",
				path: "lecturehall.wav",
			},
			{
				name: "national park",
				path: "nationalpark.wav",
			},
		],
		unit: "",
	},
	gain: {
		title: "Gain",
		min: 0,
		max: 2,
		step: 0.05,
		initial: 1,
		unit: "",
	},
}



