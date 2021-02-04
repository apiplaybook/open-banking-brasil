export const fixMoney = (money: string) => {
	return `R$${parseFloat(money).toFixed(2).toString().replace(/[.\s]/g, ',')}`
}
