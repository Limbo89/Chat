const User = require('./models/User')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
// const { secret } = require("./config")

// const generateAccessToken = (id, username) => {
//     const payload = {
//         id,
//         username
//     }
//     return jwt.sign(payload, secret, { expiresIn: "24h" })
// }


class authController {
    async registration(req, res) {
        if (req.body.password === req.body.password_confirm) {
            console.log(req.body)
            try {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    return res.render('register-password-error');
                }
                const { username, password } = req.body
                const candidate = await User.findOne({ username })
                if (candidate) {
                    return res.render('register-login-error');
                    // return res.status(400).json({ message: 'Пользователь с таким именем уже существует' })
                }
                const hashPassword = bcrypt.hashSync(password, 7);
                const user = new User({ username, password: hashPassword })
                await user.save()
                return res.redirect('/')
            } catch (e) {
                console.log(e)
                res.status(400).json({ message: 'Неизвестная ошибка при регистрациии' })
            }
        } else {
            // return res.status(400).json({ message: "Пароли не совпадают" })
            return res.render('register-password_confirm-error');
        }
    }
    async login(req, res) {
        //console.log(req.body)
        try {
            const { username, password } = req.body

            const user = await User.findOne({ username })
            if (!user) {
                return res.render('login-username-error');
                // return res.status(400).json({ message: `Пользователя с логином: ${username} не существует` })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.render('login-password-error');
                // return res.status(400).json({ message: `Введен не верный пароль` })
            }

            // const token = generateAccessToken(user._id, user.username)
            // return res.json({ token })
            // console.log(token)
            return res.redirect('chat')
        } catch (e) {
            //console.log(e)
            res.status(400).json({ message: 'Неизвестная ошибка при входе' })
        }
    }
}

module.exports = new authController()