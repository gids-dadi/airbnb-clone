import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import path from "path";
import imageDownloader from "node-image-downloader";
import fs from "fs";
import { fileURLToPath } from "url";
import Place from "../models/placeModel.js";

const createPlace = asyncHandler(async (req, res) => {
  const { jwtCookie } = req.cookies;
  const {
    title,
    address,
    placesPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
  } = req.body;

  jwt.verify(jwtCookie, process.env.JWT_SECRET, {}, (err, data) => {
    if (err) console.log(err);

    const placeDocs = Place.create({
      user: data.userId,
      title,
      address,
      placesPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
    });

    res.json(placeDocs);
  });
});

const upLoadByLink = asyncHandler(async (req, res) => {
  const { link } = req.body;
  const splittedLink = link.split(".");
  console.log(splittedLink);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const rootDir = path.resolve(__dirname, "../");
  const fileName = "photo" + Date.now();
  await imageDownloader({
    imgs: [
      {
        uri: link,
        fileName,
      },
    ],
    dest: `${rootDir}/uploads`,
  })
    .then((info) => {
      console.log("all done", info);
    })
    .catch((error) => {
      console.log(error);
    });

  res.json(fileName);
});

const uploadPhoto = asyncHandler(async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const splittedName = originalname.split(".");
    const ext = splittedName[splittedName.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

const getPlaces = asyncHandler(async (req, res) => {
  const { jwtCookie } = req.cookies;
  jwt.verify(jwtCookie, process.env.JWT_SECRET, {}, async (err, data) => {
    if (err) console.log(err);
    const userId = data.userId;
    const places = await Place.find({ user: userId });
    res.json(places);
  });
});

const getPlace = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) return res.json("Kindly provide a valid id of a place");
  const place = await Place.findById(id);

  res.json({ place });
});

const updatePlace = asyncHandler(async (req, res) => {
  const { jwtCookie } = req.cookies;
  const {
    title,
    address,
    placesPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
  } = req.body;

  jwt.verify(jwtCookie, process.env.JWT_SECRET, {}, async (err, data) => {
    if (err) console.log(err);
    const placeDocs = await Place.findById(id);
    if (data.id === placeDocs.user.toString) {
      placeDocs.set({
        title,
        address,
        placesPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
      });

      await placeDocs.save();
    }
  });
  res.json("Updated successfully");
});

export {
  createPlace,
  upLoadByLink,
  uploadPhoto,
  getPlaces,
  getPlace,
  updatePlace,
};
