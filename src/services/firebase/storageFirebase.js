import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../utils/firebase";

/**
 * Uploads a file to Firebase Storage
 * @param {File} file - The file to upload
 * @param {string} path - The folder path (e.g., "products")
 * @returns {Promise<string>} - The download URL of the uploaded file
 */
export const uploadFile = async (file, path = "products") => {
  if (!file) return null;

  try {
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `${path}/${fileName}`);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

/**
 * Deletes a file from Firebase Storage given its URL
 * @param {string} fileUrl - The full download URL of the file
 */
export const deleteFile = async (fileUrl) => {
  if (!fileUrl) return;

  try {
    // Create a reference from the URL
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    // Ignore error if file doesn't exist
  }
};
