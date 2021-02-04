// @ts-nocheck
import React from 'react'
import { banks } from '../../../../constants/banks'
import { returnBankLogo } from '../../../../utils/returnBankLogo'

const MatrixHeader = (omit?: string[]) => {
	const fixedBanks = omit.omit
		? banks.filter((bank) => !omit.omit.includes(bank.brandName))
		: banks
	return (
		<>
			<span />
			{fixedBanks.map((bank) => (
				<div style={bank.style}>
					<img
						src={returnBankLogo(bank.brandName)}
						alt={bank.brandName}
						height={bank.logoWidth}
					/>
				</div>
			))}
			<span />
			{fixedBanks.map((bank, index) => (
				<div key={`miniHeader${index}`} className="mini" style={{ height: '50px' }}>
					<div key={`minMaxHeader${index}`} className="minMax">
						<div key={`minHeader${index}`} className="min">
							<b>MÍN.</b>
						</div>
						<div key={`maxHeader${index}`} className="max">
							<b>MÁX.</b>
						</div>
					</div>
				</div>
			))}
		</>
	)
}

export default MatrixHeader
