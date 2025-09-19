import { useSelector, useDispatch } from "react-redux";
import { updateChapter, setPreviewHtml } from "./editorSlice";
import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./EditorMenuBar";

const ChapterEditor = () => {
  const dispatch = useDispatch();
  const { chapters, currentChapterId } = useSelector((s) => s.editor);
  const chapter = chapters.find((c) => c.id === currentChapterId);

  const editor = useEditor({
    extensions: [StarterKit],
    content: chapter?.content || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      dispatch(updateChapter({ id: chapter.id, content: html }));
      dispatch(setPreviewHtml(html));
    },
  });

  // Load chapter content when switching chapters
  useEffect(() => {
    if (editor && chapter) {
      editor.commands.setContent(chapter.content || "");
    }
  }, [chapter, editor]);

  if (!chapter) return <div className="p-4">No chapter selected</div>;

  return (
    <div className="flex-1 flex flex-col">
      <MenuBar editor={editor} />
      <div className="flex-1 overflow-y-auto border rounded m-2">
        <EditorContent editor={editor} className="p-4 prose prose-indigo" />
      </div>
    </div>
  );
};

export default ChapterEditor;
