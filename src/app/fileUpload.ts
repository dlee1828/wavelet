type StateType = {
	fileUploaded: boolean,
	file: File,
}

let state: StateType = {
	fileUploaded: false,
	file: null,
}

const uploadInput: HTMLInputElement = document.querySelector("#uploadInput");

export function configFileUpload() {
	document.querySelector("#uploadButton").addEventListener('click', () => {
		uploadInput.click();
	})

	uploadInput.addEventListener('change', () => {
		state.fileUploaded = true;
		state.file = uploadInput.files[0];
		console.log(state.file.type);
	})

}
