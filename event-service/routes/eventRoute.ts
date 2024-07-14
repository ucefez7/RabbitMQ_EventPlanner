import express, { Router } from "express";
import { booking, eventCreate, events  } from '../controller/eventController';
import { auth } from "../middleware/authMiddle";

const router: Router = express.Router();

router.get('/',events); 
router.post('/adding',auth,eventCreate); 
router.post('/booking',booking)

export default router;