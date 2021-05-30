const Router = require('express')
const router = new Router()
const controller = require('./authController')
const { check } = require("express-validator")
// const authMiddleware = require('./middleware/authMiddleware')
// const bodyParser = require("body-parser");
// const urlencodedParser = bodyParser.urlencoded({ extended: false })

// router.get('/example', function (req, res) {
//     res.render('example');
// });
// res.render('example-success', { data: req.body });
// router.post('/example', function (req, res) {
//     if (!req.body) return res.sendStatus(400);
//     console.log(req.body);
//     if (!req.body.pass) {
//         res.render('example-password-error');
//     } else if (!req.body.email) {
//         res.render('example-email-error');
//     } else if (!req.body.check) {
//         res.render('example-checkbox-error');
//     } else {
//         res.render('example-success', { data: req.body });
//     }

// });
// router.use(bodyParser())
// router.use(urlencodedParser)
router.get('/', function (req, res) {
    res.render('login');
})
router.get('/register', function (req, res) {
    res.render('register');
})
router.get('/chat', function (req, res) {
    res.sendFile(__dirname + '/chat.html');
    // console.log({ token })
})
router.post('/registration'
    , [
        check('username', "Имя пользователя не может быть пустым").notEmpty(),
        check('password', "Пароль должен быть больше 6 и меньше 20 символов").isLength({ min: 6, max: 20 })
    ]
    , controller.registration)

router.post('/login', controller.login)


module.exports = router