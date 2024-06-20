const { register, login } = require("../controllers/AuthController");
const isAuthorized = require("../middlewares/Auth");

const router = require(`express`).Router();

router.post(`/register`, register)
router.post(`/login`, login)

router.get(`/`, isAuthorized, (req, res) => res.send(`Hello World!`))

module.exports = router