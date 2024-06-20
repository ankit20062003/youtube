// import { NextApiRequest, NextApiResponse } from 'next';
// import formidable, { Fields, Files } from 'formidable';
// import fs from 'fs';
// import path from 'path';
// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// const uploadDir = path.join(process.cwd(), 'uploads');


// const pool = new Pool({
//     connectionString: "postgres://postgres:ankit@localhost:5432/postgres",
//     ssl: false,
// });

// const ensureUploadDirExists = () => {
//     if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir, { recursive: true });
//     }
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         ensureUploadDirExists();

//         const form = new formidable.IncomingForm({
//             uploadDir,
//             keepExtensions: true,
//             maxFileSize: 100 * 1024 * 1024,  //100 mb
//         });

//         form.parse(req, async (err: any, fields: Fields, files: Files) => {
//             if (err) {
//                 console.error('Formidable parse error:', err);
//                 res.status(500).json({ message: 'Error parsing the form', error: err.message });
//                 return;
//             }

//             console.log('Fields:', fields);
//             console.log('Files:', files);

//             // Ensure a video file is uploaded
//             const videoFile = Array.isArray(files.video) ? files.video[0] : files.video;
//             if (!videoFile) {
//                 res.status(400).json({ message: 'No video file uploaded' });
//                 return;
//             }

//              console.log('video is being uploaded in your postgres server');
//             const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
//             const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;

//             const metadata = {
//                 title: title || '',
//                 description: description || '',
//                 filePath: videoFile.filepath, 
//             };

//             // Insert metadata into PostgreSQL database
//             const client = await pool.connect();
//             try {
//                 await client.query('BEGIN');

//                 const insertQuery = 'INSERT INTO videos (title, description, video_url) VALUES ($1, $2, $3) RETURNING *';
//                 const values = [metadata.title, metadata.description, metadata.filePath];

//                 const result = await client.query(insertQuery, values);
//                 const uploadedVideo = result.rows[0];

//                 await client.query('COMMIT');

//                 res.status(200).json({ message: 'File uploaded successfully', metadata: uploadedVideo });

//             } catch (error) {
//                 await client.query('ROLLBACK');
//                 throw error;
//             } finally {
//                 client.release();
//             }
//         });
//     } catch (error: any) {
//         console.error('Error handling the request:', error);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

// export default handler;


// import { NextApiRequest, NextApiResponse } from 'next';
// import formidable, { Fields, Files, File } from 'formidable';
// import fs from 'fs';
// import path from 'path';
// import { query, getClient } from '../../lib/db'; // Adjust path based on your project structure

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const uploadDir = path.join(process.cwd(), 'public/uploads');

// const ensureUploadDirExists = () => {
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//   }
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     ensureUploadDirExists();

//     const form = new formidable.IncomingForm({
//       uploadDir,
//       keepExtensions: true,
//       maxFileSize: 100 * 1024 * 1024, // 100MB limit
//     });

//     form.parse(req, async (err: any, fields: Fields, files: Files) => {
//       if (err) {
//         console.error('Formidable parse error:', err);
//         res.status(500).json({ message: 'Error parsing the form', error: err.message });
//         return;
//       }

//       // Ensure a video file is uploaded
//       const videoFile = Array.isArray(files.video) ? files.video[0] : files.video;
//       if (!videoFile) {
//         res.status(400).json({ message: 'No video file uploaded' });
//         return;
//       }

//       const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
//       const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;

//       const metadata = {
//         title: title || '',
//         description: description || '',
//         video_url: videoFile.filepath, // Use 'path' property for formidable v2
//       };

//       // Insert metadata into PostgreSQL database
//       const client = await getClient();
//       try {
//         await client.query('BEGIN');

//         const insertQuery = 'INSERT INTO videos (title, description, video_url) VALUES ($1, $2, $3) RETURNING *';
//         const values = [metadata.title, metadata.description, metadata.video_url];

//         const result = await client.query(insertQuery, values);
//         const uploadedVideo = result.rows[0];

//         await client.query('COMMIT');

//         res.status(200).json({ message: 'File uploaded successfully', metadata: uploadedVideo });
//       } catch (error) {
//         await client.query('ROLLBACK');
//         throw error;
//       } finally {
//         client.release();
//       }
//     });
//   } catch (error: any) {
//     console.error('Error handling the request:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// export default handler;
