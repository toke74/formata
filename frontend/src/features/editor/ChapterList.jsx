import { useSelector, useDispatch } from "react-redux";
import { setCurrentChapter } from "./editorSlice";

const ChapterList = () => {
  const { chapters, currentChapterId } = useSelector((s) => s.editor);
  const dispatch = useDispatch();

  return (
    <div className="border-r w-64 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Chapters</h2>
      <ul>
        {chapters.map((ch) => (
          <li
            key={ch.id}
            className={`cursor-pointer p-2 rounded ${
              ch.id === currentChapterId ? "bg-indigo-100" : "hover:bg-gray-100"
            }`}
            onClick={() => dispatch(setCurrentChapter(ch.id))}
          >
            {ch.title || "Untitled"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterList;
