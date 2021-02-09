import { getBanksOfApi } from './../utils/getBanksOfApi'
import { callOpenBanking } from './api'

export const callApisOpenBanking = async (endpoint: string, omit?: string[]) => {
	// Realiza as consultas às APIs
	try {
		const banks = getBanksOfApi(endpoint)
		const urls = omit
			? banks.map((bank) => !omit.includes(bank.brandName) && bank.apiUrl)
			: banks.map((bank) => bank.apiUrl)

		const apiResponses = await Promise.all(
			urls.filter(Boolean).map(async (url) => {
				// @ts-ignore
				const response = await callOpenBanking(url, endpoint)
				return response
			})
		)
		return apiResponses
	} catch (error) {
		console.log('Error to call api:', error)
	}
}
