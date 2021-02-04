interface IPayload {
	name: string
	minimum: string
	maximum: string
	brand: string
}

export const brandMap = (payload: IPayload, requiredBrand: string, fixFunction?: any) => {
	return (
		payload.brand === requiredBrand && (
			<div className="interestRates">
				<div className="index">
					<span>{payload.name.replace(/[_\s]/g, ' ')}</span>
				</div>

				<div className="min">
					{fixFunction ? fixFunction(payload.minimum) : payload.minimum}
				</div>
				<div className="max">
					{fixFunction ? fixFunction(payload.maximum) : payload.maximum}
				</div>
			</div>
		)
	)
}
