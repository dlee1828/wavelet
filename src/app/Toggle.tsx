import "./styles/style.scss";


export function Toggle(props: any) {
	return (
		<div className="toggleContainer">
			<div className="title">{props.title}</div>
			<input type="checkbox" className="toggle"></input>
		</div>
	)
}
