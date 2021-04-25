import { useEffect, useState } from "react";
import "./styles/style.scss"

type ButtonGroupProps = {
	obj: {
		spaces: { name: string, path: string }[],
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

	let row1 = obj.spaces.slice(0, 4);
	let row2 = obj.spaces.slice(4, 8);

	function handleClick(name: string) {
		setReverbType(name);
		props.onChange(name);
	}

	return (
		<div className="buttonGroup">
			<div style={{ display: obj.title == "" ? "none" : "block", marginTop: '24px' }} className="title">{obj.title}</div>
			<div className="buttonRow">
				{
					row1.map((item, index) => {
						let className = "buttonGroupButton";
						if (index == 0) className += " leftTop";
						if (index == row1.length - 1) className += " rightTop";
						if (item.name == reverbType) className += " selected";
						return (
							<button disabled={props.disabled} onClick={() => handleClick(item.name)} className={className} key={index}>{item.name}</button>
						)
					})
				}

			</div>
			<div className="buttonRow">
				{
					row2.map((item, index) => {
						let className = "buttonGroupButton";
						if (index == 0) className += " leftBottom";
						if (index == row2.length - 1) className += " rightBottom";
						if (item.name == reverbType) className += " selected";
						return (
							<button disabled={props.disabled} onClick={() => handleClick(item.name)} className={className} key={index}>{item.name}</button>
						)
					})
				}

			</div>
		</div>
	)
}


