import React, { createContext, useState, useContext } from 'react'
import { Modal } from '../components/Modal'

interface IModalContextData {
	addMoreInfo(data: IModalProps): void
	removeMoreInfo(): void
	moreInfo: IModalProps | null
}

export interface IModalProps {
	name: string
	chargingTriggerInfo: string
	termsConditions: {
		additionalInfo?: string
		elegibilityCriteriaInfo?: string
		closingProcessInfo?: string
	}
}

const ModalContext = createContext({} as IModalContextData)

export const ModalProvider: React.FC = ({ children }) => {
	const [moreInfo, setMoreInfo] = useState<IModalProps | null>(null)

	const addMoreInfo = (data: IModalProps) => {
		setMoreInfo(data)
	}

	const removeMoreInfo = () => {
		setMoreInfo(null)
	}

	return (
		<ModalContext.Provider value={{ addMoreInfo, removeMoreInfo, moreInfo }}>
			<Modal />
			{children}
		</ModalContext.Provider>
	)
}

export function useModal() {
	const context = useContext(ModalContext)

	return context
}
