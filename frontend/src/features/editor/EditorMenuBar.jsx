const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex gap-2 p-2 border-b bg-gray-50">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("bold") ? "bg-indigo-200" : "hover:bg-gray-200"
        }`}
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 rounded italic ${
          editor.isActive("italic") ? "bg-indigo-200" : "hover:bg-gray-200"
        }`}
      >
        I
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("heading", { level: 1 })
            ? "bg-indigo-200"
            : "hover:bg-gray-200"
        }`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("heading", { level: 2 })
            ? "bg-indigo-200"
            : "hover:bg-gray-200"
        }`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("blockquote") ? "bg-indigo-200" : "hover:bg-gray-200"
        }`}
      >
        ❝
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="px-2 py-1 rounded hover:bg-gray-200"
      >
        ―
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="px-2 py-1 rounded hover:bg-gray-200"
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="px-2 py-1 rounded hover:bg-gray-200"
      >
        Redo
      </button>
    </div>
  );
};

export default MenuBar;
