import React from 'react'
import Header from '../Header/Header'

const Layout = ({ title, children }: { title?: string; children: any }) => {
	return (
		<>
			<Header title={title} />
			{children}
		</>
	)
}

export default Layout
