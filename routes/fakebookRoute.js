const express = require('express')
const { body } = require('express-validator')
const fakebookController = require('../controllers/fakebookController.js')

const router = express.Router()

router.get('/ao', (req, res) => {
  res.send('OK')
})
router.post('/signup', fakebookController.registerUser)

// router.post('/', [
//     body('name').not().isEmpty().withMessage('Field name is required'),
//     body('email').not().isEmpty().withMessage('Field email is required').isEmail().withMessage('Wrong email format'),
//     body('password').not().isEmpty().withMessage('Field password is required').isLength({ min: 6 }).withMessage('Password must be  at least 6 digits')
// ], userController.signup);
// router.post('/signin',
//     body('email').not().isEmpty().withMessage('Field email is required').isEmail().withMessage('Wrong email format'),
//     body('password').not().isEmpty().withMessage('Field password is required')
//     , userController.signin);
// router.get('/me', authentication.isLoggedIn, userController.getProfile);

// router.get('/', userController.index);
// router.get('/:id', authentication.isLoggedIn, userController.getUserById);
// router.put('/:id', authentication.isLoggedIn, userController.updateUser);
// router.delete('/:id', [authentication.isLoggedIn, authorization.isAdmin], userController.deleteUser);
module.exports = router
