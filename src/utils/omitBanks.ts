import { banks } from '../constants/banks'

export const omitBanks = (omitApis: string[]) => {
	return banks.filter((bank) => !omitApis.includes(bank.brandName))
}
