import { FilesAndFolders } from "./components/FilesAndFolders";
import { AddFileOrFolder } from "./components/AddFileOrFolder";
import { DeleteFileOrFolder } from "./components/DeleteFileOrFolder";
import { MyApp } from "./views/MyApp";


customElements.define('files-and-folders', FilesAndFolders);
customElements.define('add-file-or-folder', AddFileOrFolder);
customElements.define('delete-file-or-folder', DeleteFileOrFolder);
customElements.define('my-app', MyApp);

