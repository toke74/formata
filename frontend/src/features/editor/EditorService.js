import api from "../../services/api";

const importDocx = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/editor/import-docx", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export default { importDocx };
