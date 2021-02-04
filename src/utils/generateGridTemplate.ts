export const generateGridTemplate = (columnsNumber: number) => {
	let template = '200px'
	for (let i = 0; i < columnsNumber; i++) {
		template += ' 130px'
	}
	console.log('template', template)
	return template
}
