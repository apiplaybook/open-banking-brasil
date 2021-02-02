//@ts-nocheck
import { fixTaxes } from './fixTaxes'
import { omit } from './omit'

export const brandMap = (interestRates: any, brand: string) => {
	return (
		interestRates.brand === brand &&
		Object.values(omit('brand', interestRates)).map((interestRates) => (
			<div className="interestRates">
				<div className="index">
					<span>{interestRates.referentialRateIndexer.replace(/[_\s]/g, ' ')}</span>
				</div>
				<div className="min">{fixTaxes(interestRates.minimumRate)}%</div>
				<div className="max">{fixTaxes(interestRates.maximumRate)}%</div>
			</div>
		))
	)
}
