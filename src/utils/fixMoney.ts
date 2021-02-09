export const fixMoney = (money: string) => {
	if (money === 'NA') {
		return 'N/A'
	}
	return `R$${parseFloat(money).toFixed(2).toString().replace(/[.\s]/g, ',')}`
}
