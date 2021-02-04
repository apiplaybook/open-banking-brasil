export const fixTaxes = (tax: string) => {
	return `${parseFloat(tax).toFixed(3).toString().replace(/[.\s]/g, ',')}%`
}
