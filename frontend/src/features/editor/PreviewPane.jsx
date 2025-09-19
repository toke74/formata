import { useSelector } from "react-redux";
import DOMPurify from "dompurify";

const PreviewPane = () => {
  const { previewHtml } = useSelector((s) => s.editor);

  return (
    <div className="w-1/3 border-l p-4 overflow-y-auto bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">Preview</h2>
      <div
        className="prose prose-lg prose-indigo max-w-none leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(previewHtml),
        }}
      />
    </div>
  );
};

export default PreviewPane;
