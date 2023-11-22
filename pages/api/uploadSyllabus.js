import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { app } from '../../src/app/utils/firebase_config';
import extractText from './extractText';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

// A middleware for handling multipart/form-data
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Run the middleware
    await runMiddleware(req, res, upload.single('file'));

    try {
      // Now req.file is the file
      const fileBuffer = req.file.buffer;
      const fileName = req.file.originalname;

      const storage = getStorage(app);
      const uniqueFileName = `${Date.now()}-${fileName}`;
      const storageRef = ref(storage, `uploads/${uniqueFileName}`);

      // Upload the file
      await uploadBytes(storageRef, fileBuffer);

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Process the file with Azure
      const azureResult = await extractText(downloadURL);

      // Delete the file after processing
      await deleteObject(storageRef);

      return res.status(200).json(azureResult);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Error in file processing" });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
