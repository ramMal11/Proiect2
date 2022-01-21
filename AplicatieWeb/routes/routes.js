
const router = require("express").Router();
const {createUser, getUser} = require('../controllers/users');

router.post('/users', createUser)
router.get('/users/:email/users/:password', getUser)

module.exports = router;