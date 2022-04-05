
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AppRegistry } from "react-native";

AppRegistry.registerComponent("App", () => App);

AppRegistry.runApplication("App", {
  initialProps: {},
  rootTag: document.getElementById("root"),
});

serviceWorker.unregister();
