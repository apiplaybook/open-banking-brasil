import axios from 'axios'

export const callOpenBanking = async (baseURL: string, endpoint: string) => {
	const api = axios.create({
		baseURL: `${baseURL}/open-banking/products-services/v1`,
	})
	const response = await api.get(endpoint)

	return response.data.data.brand
}
