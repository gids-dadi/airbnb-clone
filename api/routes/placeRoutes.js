import express from "express";
import {
  createPlace,
  getPlaces,
  getPlace,
  updatePlace,
  upLoadByLink,
  uploadPhoto,
} from "../controllers/placeController.js";
import multer from "multer";
const photoUploads = multer({ dest: "uploads" });

const router = express.Router();

router.post("/create-place", createPlace);
router.get("/get-places", getPlaces);
router.get("/get-place/:id", getPlace);
router.put("/update-place/:id", updatePlace);
router.post("/upload", photoUploads.array("photos", 100), uploadPhoto);
router.post("/upload-by-link", upLoadByLink);

export default router;
