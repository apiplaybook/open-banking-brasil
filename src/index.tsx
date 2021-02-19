import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { GlobalStyles } from './styles/global'

import { ModalProvider } from './hooks/Modal'

ReactDOM.render(
	<React.StrictMode>
		<ModalProvider>
			<GlobalStyles />
			<App />
		</ModalProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

reportWebVitals()
