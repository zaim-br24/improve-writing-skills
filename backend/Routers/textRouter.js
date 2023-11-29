import { addText, getText, checkValues } from "../controllers/textController.js";
import express from 'express'

const router = express.Router();


router.route('/addText').post(addText)
router.route("/checkValues").post(checkValues);

router.route("/getText").get(getText);


export default router

