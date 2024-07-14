import express, { Router } from "express";
import { Login, SignUp } from '../controller/authController';

const router: Router = express.Router();

router.post('/signup', SignUp); 
router.post('/login',Login)

export default router;