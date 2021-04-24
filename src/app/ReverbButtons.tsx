import { useEffect, useState } from "react";
import "./styles/style.scss"

type ButtonGroupProps = {
	obj: {
		names: string[],
		title: string,
		initial: string,
	}
	onChange: (x: any) => void,
	disabled?: boolean,
}

// 8-button group	
export function ReverbButtons(props: ButtonGroupProps) {
	const [reverbType, setReverbType] = useState(props.obj.initial)

	const obj = props.obj;

	let row1 = obj.names.slice(0, 4);
	let row2 = obj.names.slice(4, 8);

	function handleClick(name: string) {
		setReverbType(name);
		props.onChange(name);
	}

	return (
		<div className="buttonGroup">
			<div style={{ display: obj.title == "" ? "none" : "block", marginTop: '24px' }} className="title">{obj.title}</div>
			<div className="buttonRow">
				{
					row1.map((title, index) => {
						let className = "buttonGroupButton";
						if (index == 0) className += " leftTop";
						if (index == row1.length - 1) className += " rightTop";
						if (title == reverbType) className += " selected";
						return (
							<button disabled={props.disabled} onClick={() => handleClick(title)} className={className} key={index}>{title}</button>
						)
					})
				}

			</div>
			<div className="buttonRow">
				{
					row2.map((title, index) => {
						let className = "buttonGroupButton";
						if (index == 0) className += " leftBottom";
						if (index == row2.length - 1) className += " rightBottom";
						if (title == reverbType) className += " selected";
						return (
							<button disabled={props.disabled} onClick={() => handleClick(title)} className={className} key={index}>{title}</button>
						)
					})
				}

			</div>
		</div>
	)
}


