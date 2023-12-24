import {
  addText,
  getText,
  checkValues,
  addCustomText,
  getCustomTexts,
  deleteCustomText,
  updateCustomText,
} from "../controllers/textController.js";
import express from "express";
import authenticateUser from "../middleware/auth.js";

const router = express.Router();

router.route("/addText", authenticateUser).post(addText);
router.route("/checkValues").post(checkValues);
router.route("/addCustomText", authenticateUser).post(addCustomText);

router
  .route("/:id", authenticateUser, authenticateUser)
  .delete(deleteCustomText)
  .patch(updateCustomText);

router.route("/getText").get(getText);
router.route("/getCustomTexts", authenticateUser).get(getCustomTexts);

export default router;
