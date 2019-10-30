import dotenv from 'dotenv';

dotenv.config();

export const imgurId = process.env.IMGUR_ID;
export const imgurSecret = process.env.IMGUR_SECRET;
export const fileSizeLimit = 10000000; // ~ 10MB
