import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", checkAuth);
router.put("/update-profile", updateProfile);

export default router;
