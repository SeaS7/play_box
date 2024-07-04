import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log(response);
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

const deleteFromCloudinary = async (fileUrl) => {
  try {
    if (!fileUrl) return null;

    // Extract public_id from fileUrl
    // Assuming the public_id is part of the URL after /upload/
    const urlParts = fileUrl.split('/');
    const publicIdWithExtension = urlParts.pop(); // Get the last part which includes public_id and extension
    const publicId = publicIdWithExtension.split('.')[0]; // Remove the file extension

    const response = await cloudinary.uploader.destroy(publicId);
    
    console.log("File is deleted from Cloudinary:", response.result);
    return response.result;
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
