import { useState } from "react";
import "./styles/style.scss";

type TogglePropsType = {
	title: string,
	onToggle: (state: boolean) => void;
}

export function Toggle(props: TogglePropsType) {
	const [on, setOn] = useState(false);
	function handleChange() {
		props.onToggle(!on);
		setOn(!on);
	}
	return (
		<div className="toggleContainer">
			<div className="title">{props.title}</div>
			<input type="checkbox" className="toggle" onChange={handleChange} checked={on}></input>
		</div>
	)
}
