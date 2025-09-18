import { useDispatch, useSelector } from "react-redux";
import { importDocx } from "./editorSlice";

const DocxImport = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.editor);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".docx")) {
      dispatch(importDocx(file));
    }
  };

  return (
    <div className="p-4 border-b">
      <label className="block text-sm font-medium mb-2">Import DOCX</label>
      <input
        type="file"
        accept=".docx"
        onChange={handleFileChange}
        disabled={loading}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
          file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600
          hover:file:bg-indigo-100"
      />
    </div>
  );
};

export default DocxImport;
