import {Router} from "express";
import authController from '../controllers/authorization-controller'
import {body} from "express-validator";
import {check} from "../middlewares/request-middleware";

const router = Router()
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    check,
    authController.registration
);
router.post('/login',
    body('email').isEmail(),
    body('password').isString(),
    check,
    authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);

router.use((err, req, res, next) => {
    console.error(err);
    next(err);
});

export default router
