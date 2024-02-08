import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import {
    JSONLoader,
    JSONLinesLoader
} from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
/* import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { PPTXLoader } from "langchain/document_loaders/fs/pptx"; */

/* see docs for supporting more file's
 * https://js.langchain.com/docs/integrations/document_loaders/file_loaders/
 */
export async function getChunkedDocs() {
    try {
        const loader = new DirectoryLoader("docs", {
            ".json": (path) => new JSONLoader(path, "/texts"),
            ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
            ".txt": (path) => new TextLoader(path),
            ".csv": (path) => new CSVLoader(path, "text"),
            ".pdf": (path) => new PDFLoader(path)
            /* ".docx": (path) => new DocxLoader(path),
            ".pptx": (path) => new PPTXLoader(path), */
        });
        const docs = await loader.load();
        return docs;
    } catch (e) {
        console.error(e);
        throw new Error("PDF docs chunking failed !");
    }
}
