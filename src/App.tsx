import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from './pages/Home'
import BusinessLoansPage from './pages/BusinessLoans'
import PersonalLoansPage from './pages/PersonalLoans'
import PersonalAccountsPage from './pages/PersonalAccounts'

import { HOME, PERSONAL_LOANS, BUSINESS_LOANS, PERSONAL_ACCOUNTS } from './routes'
import AppStyled from './styles/App'

function App() {
	return (
		<AppStyled>
			<Router>
				<Switch>
					<Route exact component={BusinessLoansPage} path={BUSINESS_LOANS} />
					<Route exact component={PersonalLoansPage} path={PERSONAL_LOANS} />
					<Route exact component={PersonalAccountsPage} path={PERSONAL_ACCOUNTS} />
					<Route component={HomePage} path={HOME} />
				</Switch>
			</Router>
		</AppStyled>
	)
}

export default App
