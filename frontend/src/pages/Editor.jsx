import DocxImport from "../features/editor/DocxImport";
import ChapterList from "../features/editor/ChapterList";
import ChapterEditor from "../features/editor/ChapterEditor";
import PreviewPane from "../features/editor/PreviewPane";

const Editor = () => {
  return (
    <div className="flex h-screen">
      <ChapterList />
      <div className="flex flex-col flex-1">
        <DocxImport />
        <div className="flex flex-1">
          <ChapterEditor />
          <PreviewPane />
        </div>
      </div>
    </div>
  );
};

export default Editor;
