import React from 'react'
import { BrandMiniPayloadStyled } from './BrandMiniPayload.styled'

interface IPayload {
	name: string
	minimum: string
	maximum: string
	brand: string
}

interface Props {
	props: {
		payload: IPayload
		requiredBrand: string
		fixFunction?: any
	}
}

const BrandMiniPayload = ({ props }: Props) => {
	const { payload, requiredBrand, fixFunction } = props
	return (
		payload.brand === requiredBrand && (
			<BrandMiniPayloadStyled>
				<div className="index">
					<span>{payload.name.replace(/[_\s]/g, ' ')}</span>
				</div>
				<div className="min">
					{fixFunction ? fixFunction(payload.minimum) : payload.minimum}
				</div>
				<div className="max">
					{fixFunction ? fixFunction(payload.maximum) : payload.maximum}
				</div>
			</BrandMiniPayloadStyled>
		)
	)
}

export default BrandMiniPayload
