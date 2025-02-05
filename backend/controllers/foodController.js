import multer from 'multer';
import fs from 'fs'; // fs modulini import qilish
import foodModel from "../models/foodModel.js";

// Multer konfiguratsiyasi
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Yuklangan fayllar qayerga saqlanishi kerak
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname); // Fayl nomini o'zgartirish
    }
});

const upload = multer({ storage: storage });

// add food item
const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding food", error: error.message });
    }
};

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, date: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {}); // Faylni o'chirish

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed" }); // "massage" -> "message"
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" }); // "massage" -> "message"
    }
};

export { addFood, upload, listFood, removeFood };
