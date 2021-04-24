import './styles/style.scss';

type DropDownPropsType = {
	options: { name: string, value: string }[]
}

export function Select(props: DropDownPropsType) {
	const options = props.options;
	return (
		<select>
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



