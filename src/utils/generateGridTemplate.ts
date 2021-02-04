import { IBankProps } from './../constants/banks'

export const generateGridTemplate = (banks: IBankProps[]) => {
	let template = '200px'
	banks.forEach((bank) => {
		template += ` ${130 * bank.companies.length}px`
	})

	return template
}
