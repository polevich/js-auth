import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../../script/form'
import { saveSession } from '../../script/session'

class LoginForm extends Form {

	FIELD_NAME = {
		EMAIL: 'email',
		PASSWORD: 'password',
	}
	FIELD_ERROR = {
		IS_EMPTY: "Введите значения в поле",
		IS_BIG: "Очень длинное значение, уберите лишнее",
		EMAIL: "Введите корректное значение email адреса",
	}

	validate = (name, value) => {
		if (String(value).length < 1) {
			return this.FIELD_ERROR.IS_EMPTY
		}

		if (String(value).length > 20) {
			return this.FIELD_ERROR.IS_BIG
		}

		if (name === this.FIELD_NAME.EMAIL) {
			if (!REG_EXP_EMAIL.test(String(value))) {
				return this.FIELD_ERROR.EMAIL
			}
		}

	}

	submit = async () => {
		if (this.disabled === true) {
			this.validateAll()
		} else {
			console.log(this.value)
			this.setAlert('progress', 'Загрузка...')

			try {
				const res = await fetch('/login', {
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
			[this.FIELD_NAME.EMAIL]: this.value[this.FIELD_NAME.EMAIL],
			[this.FIELD_NAME.PASSWORD]: this.value[this.FIELD_NAME.PASSWORD],
		})
	}
}

window.loginForm = new LoginForm()

document.addEventListener('DOMContentLoaded', () => {
	if (window.session) {
		location.assign('/')
	}
})
