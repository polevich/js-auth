// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/signup', function (req, res) {
	// res.render генерує нам HTML сторінку

	// ↙️ cюди вводимо назву файлу з сontainer
	return res.render('signup', {
		// вказуємо назву контейнера
		name: 'signup',
		// вказуємо назву компонентів
		component: ['back-button', 'field', 'field-password', 'field-select', 'field-checkbox'],

		// вказуємо назву сторінки
		title: 'Signup page',
		// ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout
		// вказуємо дані,
		data: {
			role: [
				{ value: User.USER_ROLE.USER, text: "Пользователь" },
				{
					value: User.USER_ROLE.ADMIN,
					text: "Администратор",
				},
				{
					value: User.USER_ROLE.DEVELOPER,
					text: "Разработчик",
				},
			]
		},
	})
	// ↑↑ сюди вводимо JSON дані
})


// Підключаємо роутер до бек-енду
module.exports = router
