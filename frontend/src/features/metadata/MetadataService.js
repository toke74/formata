import api from "../../services/api";

const uploadCover = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/metadata/upload-cover", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data; // { url: "cloudinary-url" }
};

export default { uploadCover };
