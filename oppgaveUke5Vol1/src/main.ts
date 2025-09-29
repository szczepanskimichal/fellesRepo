import {MyApp} from "./views/MyApp";
import {Location} from "./components/Location";
import { Input } from "./components/Input";
import { MainComponent } from "./components/MainComponent";

customElements.define("my-app", MyApp);
customElements.define("my-location", Location);
customElements.define("my-input", Input);
customElements.define("main-component", MainComponent);
