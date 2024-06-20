
import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: true,
    },
};

const uploadDir = path.join(process.cwd(), 'public','uploads');

const ensureUploadDirExists = () => {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        ensureUploadDirExists();

        const form = new formidable.IncomingForm({
            uploadDir,
            keepExtensions: true,
            maxFileSize: 100 * 1024 * 1024, 
        });

        form.parse(req, (err: any, fields: Fields, files: Files) => {
            if (err) {
                console.error('Formidable parse error:', err);
                res.status(500).json({ message: 'Error parsing the form', error: err.message });
                return;
            }

            console.log('Fields:', fields);
            console.log('Files:', files);

            // Ensure a video file is uploaded
            const videoFile = Array.isArray(files.video) ? files.video[0] : files.video;
            if (!videoFile) {
                res.status(400).json({ message: 'No video file uploaded' });
                return;
            }

            const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
            const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;

            const metadata = {
                title: title || '',
                description: description || '',
                filePath: videoFile.filepath,
            };

            // save metadata in a JSON file for now , 
            // will integrate with postgres later

            const metadataFilePath = path.join(uploadDir, `${videoFile.newFilename}.json`);
            fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2));
            console.log(metadataFilePath)
            res.status(200).json({ message: 'File uploaded successfully', files, metadata });
        });
        
    }catch (error: any) {
        console.error('Error handling the request:', error);
        if (res) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        } else {
            console.error('Response object is undefined');
        }
    }
};

export default handler;







// THE MIDDLEWARE TO UPLOAD VIDEOS TO DATABASE

// import { NextApiRequest, NextApiResponse } from 'next';
// import formidable, { Fields, Files, File } from 'formidable';
// import fs from 'fs';
// import path from 'path';
// import { query, getClient } from '../../../../lib/db'; // Adjust path based on your project structure

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


// import express, { Request, Response } from 'express';
// import multer, { FileFilterCallback } from 'multer';
// import { Pool, PoolClient } from 'pg';

// const app = express();
// const PORT =  3000;

// console.log("hello from index");

// // Configure Multer for file upload
// const upload = multer({ 
//     dest: 'uploads/',
//     fileFilter: (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
//         // Check if file type is video
//         if (!file.mimetype.startsWith('video/')) {
//             callback(new Error('Only video files are allowed'));
//         } else {
//             callback(null, true);
//         }
//     }
// });

// // PostgreSQL connection pool
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'videos',
//     password: 'ankit',
//     port: 5432,
// });

// // Route to handle file upload
// app.post('/upload', upload.single('video'), async (req: Request, res: Response) => {
//     try {
//         // Assuming 'video' is the name attribute of the file input in your form

//         // Get file details
//         const { filename, path, mimetype } = req.file as Express.Multer.File;

//         // Insert file details into database
//         const client: PoolClient = await pool.connect();
//         await client.query('INSERT INTO videos (filename, path, mimetype) VALUES ($1, $2, $3)', [filename, path, mimetype]);
//         client.release();

//         res.status(201).send('File uploaded successfully');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error uploading file');
//     }
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

