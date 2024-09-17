import { User } from "../models/user.model.js";
import { Pg } from "./../models/pg.model.js";
import { v2 as clodinary } from "cloudinary";

export const createPg = async (req, res) => {
  try {
    const { name, location, description, pricePerMonth } = req.body;
    let { image } = req.body;
    const userId = req.user._id.toString();

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!name || !location || !pricePerMonth) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (image) {
      const uploadedResponse = await clodinary.uploader.upload(image);
      image = uploadedResponse.secure_url;
    }

    const newPg = new Pg({
      name,
      location,
      description,
      pricePerMonth,
      image,
      owner: userId,
    });

    newPg.save();

    res.status(201).json(newPg);
  } catch (error) {
    console.log("Error in createPg controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllPgs = async (req, res) => {
  try {
    const pgs = await Pg.find().sort({ createdAt: -1 }).populate({
      path: "owner",
      select: "-password",
    });

    if (pgs.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(pgs);
  } catch (error) {
    console.log("Error in getAllPgs controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSinglePg = async (req, res) => {
  try {
    const { id } = req.params;

    const pg = await Pg.findById(id).populate({
      path: "owner",
      select: "-password",
    });

    if (!pg) {
      return res.status(404).json({ error: "Pg not found" });
    }

    res.status(200).json(pg);
  } catch (error) {
    console.log("Error in getSinglePg controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
