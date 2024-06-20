"use client"
import React, { useState } from 'react';
import axios from 'axios';
import formidable, { Fields, Files } from 'formidable';


const VideoUploadForm = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!selectedFile || !title || !description) {
      alert('Please fill out all fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedFile);
    formData.append('title', title);
    formData.append('description', description);

    try {
      setUploadProgress(0);

      const response = await axios.post('/api/uploadvids', formData, {

        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        },
      });
        
            // Handle successful upload response
            alert('Upload successful');
            console.log(response.data);
            console.log("break");
            console.log(formData);

            setSelectedFile(null); // Clear state for next upload
            setTitle('');
            setDescription('');

    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <div className="flex items-center gap-2">
        <label htmlFor="file" className="text-sm font-medium">Choose a video file:</label>
        <input type="file" id="file" onChange={handleFileChange} className="rounded-md border border-gray-300 px-3 m-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 " />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="title" className="text-sm mr-12 font-medium">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="rounded-md border border-gray-300 px-3 m-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-black"
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="description" className="text-sm font-medium">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          className="rounded-md border border-gray-300 px-3 m-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-black"
        />
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 my-2 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Upload
      </button>
      {uploadProgress > 0 && <p className="text-gray-500">Upload Progress: {uploadProgress}%</p>}
      {uploadError && <p className="text-red-500">{uploadError}</p>}
    </form>
  );
};

export default VideoUploadForm;

// THE FORM OF THE CLIENT SIDE FROM WHERE THE DATA WILL GO TO OTHER COMPONENTS

// import React, { useState } from 'react';
// import axios from 'axios';

// const UploadVideoPage: React.FC = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [title, setTitle] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [uploadProgress, setUploadProgress] = useState<number>(0);
//   const [uploadError, setUploadError] = useState<string | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setTitle(event.target.value);
//   };

//   const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setDescription(event.target.value);
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!selectedFile || !title || !description) {
//       alert('Please fill out all fields and select a file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', selectedFile);
//     formData.append('title', title);
//     formData.append('description', description);

//     try {
//       setUploadProgress(0);
//       const response = await axios.post('/api/uploadvids', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           if (progressEvent.total) {
//             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setUploadProgress(percentCompleted);
//           }
//         },
//       });

//       console.log('Upload successful:', response.data);
//       // Optionally, handle success UI or redirection
//       alert('Video uploaded successfully!');
//     } catch (error) {
//       console.error('Upload error:', error);
//       setUploadError('Error uploading file.');
//     }
//   };

//   return (
//     <div>
//       <h1>Upload Video</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="file">Choose a video file:</label>
//           <input type="file" id="file" onChange={handleFileChange} />
//         </div>
//         <div>
//           <label htmlFor="title">Title:</label>
//           <input type="text" id="title" value={title} onChange={handleTitleChange} />
//         </div>
//         <div>
//           <label htmlFor="description">Description:</label>
//           <textarea id="description" value={description} onChange={handleDescriptionChange} />
//         </div>
//         <button type="submit">Upload</button>
//       </form>
//       {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
//       {uploadError && <p>Error: {uploadError}</p>}
//     </div>
//   );
// };

// export default UploadVideoPage;
