import { useSelector, useDispatch } from "react-redux";
import { updateChapter, setPreviewHtml } from "./editorSlice";
import { useEffect } from "react";

const ChapterEditor = () => {
  const dispatch = useDispatch();
  const { chapters, currentChapterId } = useSelector((s) => s.editor);
  const chapter = chapters.find((c) => c.id === currentChapterId);

  const handleChange = (e) => {
    dispatch(updateChapter({ id: chapter.id, content: e.target.value }));
  };

  // Simple preview (markdown parser or HTML safe preview later)
  useEffect(() => {
    if (chapter) {
      dispatch(setPreviewHtml(chapter.content));
    }
  }, [chapter?.content, dispatch]);

  if (!chapter) return <div className="p-4">No chapter selected</div>;

  return (
    <div className="flex-1 p-4">
      <textarea
        value={chapter.content}
        onChange={handleChange}
        className="w-full h-full border p-3 rounded resize-none font-mono text-sm"
      />
    </div>
  );
};

export default ChapterEditor;
