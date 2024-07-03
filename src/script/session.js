export const SESSION_KEY = 'sessionAuth'

export const saveSession = (session) => {
	console.log(session)
	window.session = session
	localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export const loadSession = () => {
	try {
		const session = JSON.parse(localStorage.getItem(SESSION_KEY))

		if (session) {
			window.session = session
		} else {
			window.session = null
		}

	} catch (er) {
		console.log(er)
		window.session = null
	}

}