import { wrapper } from "./audio.js";
import { weather } from "./weather.js";
import { welcome, data, welcomeName } from "./welcome.js";
import { changeUrl } from "./slider.js";
import { getPhrase } from "./phrase.js";
import { settings, check } from "./settings.js";
import "./localstorage.js"
wrapper();
weather();
welcome();
data();
welcomeName();
changeUrl();
getPhrase();
settings();
