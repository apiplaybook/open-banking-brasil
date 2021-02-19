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
				<div className={`index title ${payload.name.length > 30 && 'miniFont'}`}>
					<span>{payload.name.replace(/[_\s]/g, ' ')}</span>
				</div>
				<div className={`min ${payload.minimum.length > 5 && 'miniFont'}`}>
					{fixFunction ? fixFunction(payload.minimum) : payload.minimum}
				</div>
				<div className={`max ${payload.maximum.length > 5 && 'miniFont'}`}>
					{fixFunction ? fixFunction(payload.maximum) : payload.maximum}
				</div>
			</BrandMiniPayloadStyled>
		)
	)
}

export default BrandMiniPayload
