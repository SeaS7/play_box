import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateAvatarImage,
  updateCoverImage,
  getUserChannelProfile,
  getUserWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

//secure route
router.route("/logout").post(verifyToken, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyToken, changeCurrentPassword);
router.route("/current-user").get(verifyToken, getCurrentUser);

//for updating data we have to use patch otherwise if we'll use post it will update everything,  PATCH allows partially updating data
router.route("/update-account").patch(verifyToken, updateAccountDetails);
router
  .route("/avatar")
  .patch(verifyToken, upload.single("avatar"), updateAvatarImage);
router
  .route("/cover-image")
  .patch(verifyToken, upload.single("coverImage"), updateCoverImage);

router.route("/c/:username").get(verifyToken, getUserChannelProfile);
router.route("/history").get(verifyToken, getUserWatchHistory);

export default router;
