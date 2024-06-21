const { register, login } = require("../controllers/AuthController");
const { getData } = require("../controllers/GetController");
const isAuthorized = require("../middlewares/Auth");

const router = require(`express`).Router();

router.post(`/register`, register)
router.post(`/login`, login)

router.get(`/`, isAuthorized, getData)

module.exports = router