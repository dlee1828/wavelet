export const controls = {
	gain: {
		title: "Gain",
		min: 0,
		max: 3,
		step: 0.01,
		initialValue: 1,
	},
	panning: {
		title: "Panning",
		min: -1,
		max: 1,
		step: 0.01,
		initialValue: 0,
	},
	filterFrequency: {
		title: "Filter Frequency",
		min: 0,
		max: 2000,
		initialValue: 500,
		step: 10,
	},
	filterType: {
		title: "",
		names: [
			"low-pass",
			"high-pass",
			"band-pass",
			"low-shelf",
			"high-shelf",
			"peaking",
			"band-stop",
			"all-pass",
		]
	}
}



