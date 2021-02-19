import React from 'react'
import { useModal } from '../../hooks/Modal'

import { LightBox, ModalWrapper, CloseButtonModal } from './modal.style'

export const Modal: React.FC = () => {
	const { moreInfo, removeMoreInfo } = useModal()
	return (
		<>
			{moreInfo && (
				<LightBox>
					<ModalWrapper>
						<CloseButtonModal size={20} onClick={removeMoreInfo} />
						<div>
							<h1>{moreInfo.name.replace(/[_\s]/g, ' ')}</h1>
							<p>{moreInfo.chargingTriggerInfo}</p>
						</div>
						<div>
							<h1>Termos e Condições</h1>
							<p>{moreInfo.termsConditions?.additionalInfo}</p>
							<p>{moreInfo.termsConditions?.elegibilityCriteriaInfo}</p>
							<h1>Informações de Processo de Cancelamento</h1>
							<p>{moreInfo.termsConditions?.closingProcessInfo}</p>
						</div>
					</ModalWrapper>
				</LightBox>
			)}
		</>
	)
}
