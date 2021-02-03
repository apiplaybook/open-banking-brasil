import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from './pages/Home'
import PersonalLoansPage from './pages/PersonalLoans'
import { HOME, PERSONAL_LOANS } from './routes'
import AppStyled from './styles/App'

function App() {
	return (
		<AppStyled>
			<Router>
				<Switch>
					<Route exact component={PersonalLoansPage} path={PERSONAL_LOANS} />
					<Route component={HomePage} path={HOME} />
				</Switch>
			</Router>
		</AppStyled>
	)
}

export default App
