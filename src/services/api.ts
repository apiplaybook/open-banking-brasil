import axios from 'axios'

export const callOpenBanking = async (baseURL: string, endpoint: string) => {
	const api = axios.create({
		baseURL: `${baseURL}/open-banking/products-services/v1`,
	})

	return await api.get(endpoint)
}
export const callOpenBankingApiPersonalLoans = async (baseURL: string) => {
	const apiResponse = await callOpenBanking(baseURL, '/personal-loans')
	return apiResponse.data.data.brand
}
