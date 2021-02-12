import axios from 'axios'
import { toCamelCase } from '../utils/toCamelCase'
import { banks } from './../constants/banks'

export const callOpenBanking = async (baseURL: string, endpoint: string) => {
	const api = axios.create({
		baseURL: `${baseURL}/open-banking/products-services/v1`,
	})

	const currentBank = banks.filter((bank) => bank.apiUrl === baseURL)[0]

	const payloadName = toCamelCase(
		endpoint.substr(1, endpoint.length - 1).replace(/[-\s]/g, ' ')
	)

	return await api
		.get(endpoint)
		.then((response) => response.data.data.brand)
		.catch(() => {
			return {
				name: currentBank.brandName,
				companies: [
					{
						name: 'INDISPONÍVEL',
						cnpjNumber: '00000000000000',
						urlComplementaryList: null,
						[payloadName]: [],
					},
				],
			}
		})
}
