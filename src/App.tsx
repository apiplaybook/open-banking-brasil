import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from './pages/Home'
import BusinessLoansPage from './pages/BusinessLoans'
import PersonalLoansPage from './pages/PersonalLoans'
import PersonalAccountsPage from './pages/PersonalAccounts'
import BusinessAccountsPage from './pages/BusinessAccounts'
import {
	HOME,
	PERSONAL_LOANS,
	BUSINESS_LOANS,
	PERSONAL_ACCOUNTS,
	PERSONAL_CREDIT_CARDS,
	BUSINESS_ACCOUNT,
} from './routes'
import AppStyled from './styles/App'
import PersonalCreditCardsPage from './pages/PersonalCreditCards'

function App() {
	return (
		<AppStyled>
			<Router>
				<Switch>
					<Route exact component={BusinessLoansPage} path={BUSINESS_LOANS} />
					<Route exact component={PersonalLoansPage} path={PERSONAL_LOANS} />
					<Route exact component={BusinessAccountsPage} path={BUSINESS_ACCOUNT} />
					<Route exact component={PersonalAccountsPage} path={PERSONAL_ACCOUNTS} />
					<Route exact component={PersonalCreditCardsPage} path={PERSONAL_CREDIT_CARDS} />
					<Route component={HomePage} path={HOME} />
				</Switch>
			</Router>
		</AppStyled>
	)
}

export default App
