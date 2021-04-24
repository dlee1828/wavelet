import './styles/style.scss';

type DropDownPropsType = {
	options: { name: string, value: string }[],
	onChange: (val: string) => void;
}

export function Select(props: DropDownPropsType) {
	const options = props.options;
	function handleChange(e: any) {
		props.onChange(e.target.value)
	}
	return (
		<select onChange={(e) => handleChange(e)}>
			<option value="" disabled selected>Choose a sample</option>
			{
				options.map((item, index) => {
					return (
						<option key={index} value={item.value}>{item.name}</option>
					)
				})
			}
		</select>
	)
}



