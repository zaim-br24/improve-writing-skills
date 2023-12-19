import {
  addText,
  getText,
  checkValues,
  addCustomText,
  getCustomTexts,
  deleteCustomText,
  updateCustomText,
} from "../controllers/textController.js";
import express from 'express'

const router = express.Router();


router.route('/addText').post(addText)
router.route("/checkValues").post(checkValues);
router.route("/addCustomText").post(addCustomText);

router.route("/:id").delete(deleteCustomText).patch(updateCustomText);


router.route("/getText").get(getText);
router.route("/getCustomTexts").get(getCustomTexts);



export default router

