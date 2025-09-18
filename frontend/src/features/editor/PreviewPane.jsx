import { useSelector } from "react-redux";

const PreviewPane = () => {
  const { previewHtml } = useSelector((s) => s.editor);

  return (
    <div className="w-1/3 border-l p-4 overflow-y-auto bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">Preview</h2>
      <div
        className="prose prose-indigo max-w-none"
        dangerouslySetInnerHTML={{ __html: previewHtml }}
      />
    </div>
  );
};

export default PreviewPane;
