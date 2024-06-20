// import { NextApiRequest, NextApiResponse } from 'next';
// import multer from 'multer';
// import { Pool } from 'pg';
// import nextConnect from 'next-connect';
// import path from 'path';
// import fs from 'fs';

// // Configure multer for file uploads
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       const uploadPath = path.join(process.cwd(), 'public/uploads');
//       if (!fs.existsSync(uploadPath)) {
//         fs.mkdirSync(uploadPath, { recursive: true });
//       }
//       cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     }
//   })
// });

// // PostgreSQL pool setup
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'ankit',
//   port: 5432,
// });

// const handler = nextConnect<NextApiRequest, NextApiResponse>();

// handler.use(upload.single('video'));

// handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
//   const { title, description } = req.body;
//   const videoPath = `/uploads/${(req.file as Express.Multer.File).filename}`;

//   try {
//     const query = 'INSERT INTO videos (title, description, video_path) VALUES ($1, $2, $3) RETURNING *;';
//     const values = [title, description, videoPath];
//     const result = await pool.query(query, values);

//     res.status(200).json({ message: 'Video uploaded successfully!', video: result.rows });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error uploading video' });
//   }
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default handler;
