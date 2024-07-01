export const REG_EXP_EMAIL = new RegExp(
	/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
)

export const REG_EXP_PASSWORD = new RegExp(
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
)

export class Form {
	FIELD_NAME = {}
	FIELD_ERROR = {}

	value = {}
	error = {}

	change = (name, value) => {
		console.log(name, value)
		if (this.validate(name, value)) this.value[name] = value
	}
}

