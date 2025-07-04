import express from 'express';
import {checkAuth, login, logout, signup, updateprofile} from "../controllers/auth.controller.js"
import { protectRoute } from '../middleware/auth.middleware.js';


const router = express.Router()

router.post('/signup', signup )
router.post('/login', login )
router.post('/logOut',logout)

router.put('/update-profile', protectRoute, updateprofile);

router.get('/check', protectRoute, checkAuth);


export default router;