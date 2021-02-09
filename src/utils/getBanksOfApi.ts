import { apis } from './../constants/apis'
import { banks } from './../constants/banks'

export const getBanksOfApi = (apiEndpoint: string) => {
	const apiBanks = apis.filter((api) => api.endpoint === apiEndpoint)[0].banks
	const apiBanksCompanies = apiBanks.flatMap((bank) => bank.companies)
	const apiBanksName = apiBanks.flatMap((bank) => bank.brand)

	return banks
		.filter(({ brandName }) => apiBanksName.includes(brandName))
		.map((bank) => {
			return {
				...bank,
				companies: bank.companies.filter((company) => apiBanksCompanies.includes(company)),
			}
		})
}
