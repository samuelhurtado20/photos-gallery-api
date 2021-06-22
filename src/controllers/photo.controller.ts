import { Request, Response } from "express";
import fs from "fs-extra";
import path from "path";

import Photo, { IPhoto } from "../models/Photo";

export async function GetPhotos(req: Request, res: Response): Promise<Response> {
	const photos = await Photo.find();
	return res.json(photos);
}

export async function AddPhoto(req: Request, res: Response): Promise<Response> {
	const { title, description } = req.body;
	const newPhoto = { title, description, imagePath: req.file.path };
	const photo = new Photo(newPhoto);
	await photo.save();

	return res.json({
		message: "Photo Saved Successfully",
		photo,
	});
}

export async function GetPhotoById(req: Request, res: Response): Promise<Response> {
	const { id } = req.params;
	const photo = await Photo.findById(id);
	return res.json(photo);
}

export async function DeletePhoto(req: Request, res: Response): Promise<Response> {
	const { id } = req.params;
	const photo = (await Photo.findByIdAndRemove(id)) as IPhoto;
	if (photo) {
		await fs.unlink(path.resolve(photo.imagePath));
	}
	return res.json({ message: "Photo Deleted" });
}

export async function UpdatePhoto(req: Request, res: Response): Promise<Response> {
	const { id } = req.params;
	const { title, description } = req.body;
	const updatedPhoto = await Photo.findByIdAndUpdate(id, {
		title,
		description,
	});
	return res.json({
		message: "Successfully updated",
		updatedPhoto,
	});
}
