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
import authenticateUser from "../middleware/auth.js";

const router = express.Router();


router.route("/addText").post(authenticateUser, addText);
router.route("/checkValues").post(checkValues);
router.route("/addCustomText").post(authenticateUser, addCustomText);

router
  .route("/:id")
  .delete(authenticateUser, deleteCustomText)
  .patch(authenticateUser, updateCustomText);


router.route("/getText").get(getText);
router.route("/getCustomTexts").get(authenticateUser, getCustomTexts);



export default router

