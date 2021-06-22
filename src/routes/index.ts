import { Router } from "express";
const router = Router();

import upload from "../libs/multer";
import { GetPhotos, AddPhoto, DeletePhoto, GetPhotoById, UpdatePhoto } from "../controllers/photo.controller";

// routes
router.route("/photos").get(GetPhotos).post(upload.single("image"), AddPhoto);

router.route("/photos/:id").get(GetPhotoById).delete(DeletePhoto).put(UpdatePhoto);

export default router;
