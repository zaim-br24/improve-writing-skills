import { addText, getText } from "../controllers/textController.js";
import express from 'express'

const router = express.Router();


router.route('/addText').post(addText)
router.route("/getText").get(getText);


export default router

