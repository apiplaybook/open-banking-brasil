// @ts-nocheck
import React from 'react'
import { IBankProps } from '../../../../constants/banks'
import { returnBankLogo } from '../../../../utils/returnBankLogo'

interface Props {
	banks: IBankProps[]
}

const MatrixHeader = ({ banks }: Props) => {
	return (
		<>
			<span />
			{banks.map((bank) => (
				<div style={bank.style} key={`matrixMiniHeader${bank.brandName}`}>
					<img
						src={returnBankLogo(bank.brandName)}
						alt={bank.brandName}
						height={bank.logoWidth}
					/>
				</div>
			))}
			<span />
			{banks.map((bank, index) => (
				<div key={`miniHeader${index}`} className="mini" style={{ height: '100px' }}>
					<div
						key={`miniHeaders${index}`}
						className="miniHeaders"
						style={{ height: '100%' }}
					>
						{bank.companies.length === 0 ? (
							<div key={`minMaxHeader${bank.brandName}${Math.random()}`} className="minMax">
								<div key={`miniHeader${Math.random()}`} className="miniHeader">
									<b>INDISPONÍVEL</b>
								</div>
							</div>
						) : (
							bank.companies.map((company, i) => (
								<div
									key={`minMaxHeader${company}${index}`}
									className="minMax"
									style={i > 0 ? { borderLeft: '2px solid #c6c6c650' } : {}}
								>
									<div key={`miniHeader${index}`} className="miniHeader">
										<b>{company}</b>
									</div>
									<div key={`minHeader${index}`} className="min">
										<b>MÍN.</b>
									</div>
									<div key={`maxHeader${index}`} className="max">
										<b>MÁX.</b>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			))}
		</>
	)
}

export default MatrixHeader
