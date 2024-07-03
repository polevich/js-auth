import { Form } from '../../script/form'
import { saveSession, getTokenSession } from '../../script/session'

class SignupConfirmForm extends Form {

	FIELD_NAME = {
		CODE: 'code',
	}
	FIELD_ERROR = {
		IS_EMPTY: "Введите значения в поле",
		IS_BIG: "Очень длинное значение, уберите лишнее",
	}

	validate = (name, value) => {
		if (String(value).length < 1) {
			return this.FIELD_ERROR.IS_EMPTY
		}

		if (String(value).length > 20) {
			return this.FIELD_ERROR.IS_BIG
		}
	}

	submit = async () => {
		if (this.disabled === true) {
			this.validateAll()
		} else {
			console.log(this.value)
			this.setAlert('progress', 'Загрузка...')

			try {
				const res = await fetch('/signup-confirm', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: this.convertData(),
				})
				const data = await res.json()

				if (res.ok) {
					this.setAlert('success', data.message)
					saveSession(data.session)
					location.assign('/')
				} else {
					this.setAlert('error', data.message)
				}

			} catch (error) {
				this.setAlert('error', error.message)
			}
		}
	}

	convertData = () => {
		return JSON.stringify({
			[this.FIELD_NAME.CODE]: Number(this.value[this.FIELD_NAME.CODE]),
			token: getTokenSession(),
		})
	}
}

window.signupConfirmForm = new SignupConfirmForm()

