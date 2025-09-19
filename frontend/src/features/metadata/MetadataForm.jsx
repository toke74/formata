import { useDispatch, useSelector } from "react-redux";
import { setMetadata, uploadCover } from "./metadataSlice";

const MetadataForm = () => {
  const dispatch = useDispatch();
  const metadata = useSelector((state) => state.metadata);

  const handleChange = (e) => {
    dispatch(setMetadata({ [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) dispatch(uploadCover(file));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Book Metadata</h2>

      <div>
        <label className="block text-sm">Title</label>
        <input
          type="text"
          name="title"
          value={metadata.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm">Author</label>
        <input
          type="text"
          name="author"
          value={metadata.author}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm">Language</label>
        <select
          name="language"
          value={metadata.language}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>

      <div>
        <label className="block text-sm">ISBN</label>
        <input
          type="text"
          name="isbn"
          value={metadata.isbn}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm">Publisher</label>
        <input
          type="text"
          name="publisher"
          value={metadata.publisher}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
        {metadata.coverUrl && (
          <img
            src={metadata.coverUrl}
            alt="Cover"
            className="mt-3 w-40 rounded shadow"
          />
        )}
      </div>
    </div>
  );
};

export default MetadataForm;
