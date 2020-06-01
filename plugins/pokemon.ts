import Pokemon from "~/interfaces/Pokemon";
import { Plugin } from "@nuxt/types";

const plugin: Plugin = (_, inject) => {
    inject("pokemon", {
        spriteNames: {
            "giratina-altered": "giratina",
            "pumpkaboo-average": "pumpkaboo",
            "gourgeist-average": "gourgeist",
            "meowstic-female": "meowstic-f",
            "charizard-mega-y": "charizard-megay",
            "charizard-mega-x": "charizard-megax",
            "mewtwo-mega-y": "mewtwo-megay",
            "mewtwo-mega-x": "mewtwo-megax",
            "pikachu-rock-star": "pikachu-rockstar",
            "pikachu-pop-star": "pikachu-popstar",
            "pikachu-original-cap": "pikachu-kantocap",
            "pikachu-hoenn-cap": "pikachu-hoenncap",
            "pikachu-sinnoh-cap": "pikachu-sinnohcap",
            "pikachu-unova-cap": "pikachu-unovacap",
            "pikachu-kalos-cap": "pikachu-kaloscap",
            "pikachu-alola-cap": "pikachu-alolacap",
            "raticate-totem-alola": "raticate-totem",
            "greninja-battle-bond": "greninja-active",
            "greninja-ash": "greninja-active",
            "zygarde-50": "zygarde",
            "oricorio-pom-pom": "oricorio-pompom",
            "minior-orange-meteor": "minior",
            "minior-yellow-meteor": "minior",
            "minior-green-meteor": "minior",
            "minior-blue-meteor": "minior",
            "minior-indigo-meteor": "minior",
            "minior-violet-meteor": "minior",
            "minior-red-meteor": "minior",
            "mimikyu-totem-disguised": "mimikyu-totem",
            "pikachu-partner-cap": "pikachu-partnercap",
            "rockruff-own-tempo": "rockruff",
            "necrozma-dusk": "necrozma-dusk-mane",
            "necrozma-dawn": "necrozma-dawn-wings"
        },
        typeColors: {
            normal: "#9ea19d",
            poison: "#ca00cf",
            psychic: "#ff737b",
            grass: "#00cf57",
            ground: "#e37644",
            ice: "#53d8c1",
            fire: "#ffa63e",
            rock: "#c6c186",
            dragon: "#354bca",
            water: "#568ee2",
            bug: "#77ce25",
            dark: "#5b5562",
            fighting: "#e2005a",
            ghost: "#6c53bd",
            steel: "#4a95a3",
            flying: "#a3b0ed",
            electric: "#ece740",
            fairy: "#ff63e5"
        }
    } as Pokemon); // Cast for type interference
};

export default plugin;
