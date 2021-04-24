import { useEffect, useState } from "react";
import "./styles/style.scss"

type ButtonGroupProps = {
	obj: {
		names: string[],
		title: string,
		initial: string,
	}
	onChange: (x: any) => void,
	filterOn: boolean,
	disabled?: boolean,
}

// 8-button group	
export function FilterButtons(props: ButtonGroupProps) {
	const [filterType, setFilterType] = useState(props.obj.initial)
	const [filterOn, setFilterOn] = useState(props.filterOn);

	const obj = props.obj;

	let row1 = obj.names.slice(0, 4);
	let row2 = obj.names.slice(4, 8);

	function handleClick(name: string) {
		setFilterType(name);
		props.onChange(name);
	}

	return (
		<div className="buttonGroup">
			<div style={{ display: obj.title == "" ? "none" : "block" }} className="title">{obj.title}</div>
			<div className="buttonRow">
				{
					row1.map((title, index) => {
						let className = "buttonGroupButton";
						if (index == 0) className += " leftTop";
						if (index == row1.length - 1) className += " rightTop";
						if (title == filterType) className += " selected";
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
						if (title == filterType) className += " selected";
						return (
							<button disabled={props.disabled} onClick={() => handleClick(title)} className={className} key={index}>{title}</button>
						)
					})
				}

			</div>
		</div>
	)
}


