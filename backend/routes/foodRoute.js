import express from 'express';
import { addFood, upload , listFood,removeFood} from '../controllers/foodController.js';

const router = express.Router();

// POST so'rovini Multer middleware bilan yuborish
router.post('/add', upload.single('image'), addFood);

// GET so'rovini qo'shish (masalan, barcha ovqatlarni olish)
router.get('/list',listFood);
router.post("/remove",removeFood);
export default router;
