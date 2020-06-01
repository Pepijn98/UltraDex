import * as Api from "pokeapi-js-wrapper"; // TODO : Write proper typings
import { Plugin } from "@nuxt/types";

const plugin: Plugin = (_, inject) => {
    inject("pokeapi", new Api.Pokedex());
};

export default plugin;
