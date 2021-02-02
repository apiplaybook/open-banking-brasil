import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import HomePage from './pages/Home'
import PersonalLoansPage from './pages/PersonalLoans'
import { HOME, PERSONAL_LOANS } from './routes'
import AppStyled from './styles/App'

function App() {
	return (
		<AppStyled>
			<BrowserRouter>
				<Switch>
					<Route exact component={HomePage} path={HOME} />
					<Route exact component={PersonalLoansPage} path={PERSONAL_LOANS} />
				</Switch>
			</BrowserRouter>
		</AppStyled>
	)
}

export default App
