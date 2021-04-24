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
		max: 2000,
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
		names: [
			"none",
			"basement",
			"bandpass",
			"lowshelf",
			"highshelf",
			"peaking",
			"notch",
			"allpass",
		],
		unit: "",
	},
	reverbPaths: {
		basement: 'basement.mp4',
	}
}



