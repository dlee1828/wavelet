import { useState } from 'react';

type SliderProps = {
	obj: {
		min: number,
		max: number,
		step: number,
		title: string,
		initial: number,
		unit: string,
	}
	onChange: (x: any) => void,
}

export default function Slider(props: SliderProps) {

	const obj = props.obj;

	const [value, setValue] = useState(obj.initial);
	function handleChange(e: any) {
		setValue(e.target.value);
		props.onChange(e.target.value);
	}
	return (
		<div className="sliderGroup">
			<div style={{ display: obj.title == '' ? 'none' : 'block' }} className="title">{obj.title}</div>
			<input id={obj.title.toLowerCase()} type="range" min={obj.min} max={obj.max} onChange={(e) => handleChange(e)} value={value} step={obj.step}></input>
			<div className="label">{value + (obj.unit != '' ? " " + obj.unit : '')}</div>
		</div>
	)
}

