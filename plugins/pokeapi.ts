import * as Pokedex from "pokeapi-js-wrapper";
import { Plugin } from "@nuxt/types";

const plugin: Plugin = (_, inject) => {
    inject("pokeapi", new Pokedex.Pokedex());
};

export default plugin;
