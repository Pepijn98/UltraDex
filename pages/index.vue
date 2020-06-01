<template>
    <div>
        <ultrabar />
        <!-- <v-pagination
            v-model="page"
            :length="Math.floor(count / options.limit)"
            total-visible="10"
            @input="fetchPokemon" /> -->
        <v-container fluid>
            <v-row class="pokemon" align="center">
                <v-col v-for="poke in pokemon" :key="poke.name" md="3">
                    <v-card
                        :elevation="3"
                        class="pokemon"
                        max-width="250"
                        min-width="250"
                        shaped>
                        <v-btn class="toggle-shiny" top left fab @click="toggleShiny(poke.name)">
                            <img :ref="`toggle-shiny-${poke.name}`" height="30px" src="/static/images/non-shiny.png">
                        </v-btn>
                        <div class="sprite">
                            <img
                                :ref="poke.name"
                                class="sprite__image"
                                :src="sprites[poke.name]"
                                draggable="false"
                                @error="onSpriteError">
                        </div>
                        <div class="text-center">
                            <v-chip
                                v-for="item in poke.types"
                                :key="item.type.name"
                                :color="colors[item.type.name]"
                                :ripple="false"
                                text-color="white"
                                class="ma-2"
                                label
                                small>
                                <b style="text-shadow: 1px 1px 3px #000000;">{{ item.type.name }}</b>
                            </v-chip>
                        </div>
                        <v-card-title>{{ $utils.beautifyName(poke.name) }}</v-card-title>
                        <v-card-subtitle>Pitch-Black Pokémon</v-card-subtitle>
                        <v-card-text>It can lull people to sleep and make them dream. It is active during nights of the new moon.</v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-pagination
            v-model="page"
            :length="Math.floor(count / options.limit)"
            total-visible="10"
            @input="fetchPokemon" />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
    head: {
        title: "UltraDex",
        meta: [
            { hid: "og-title", property: "og:title", content: "UltraDex" }
        ]
    }
})
export default class IndexPage extends Vue {
    pokemon: any[] = [];
    page = 1;
    count = 0;

    sprites: Record<string, string> = {};

    options = {
        limit: 16,
        offset: 0
    };

    spriteNames: Record<string, string> = {
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
    };

    colors = {
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
    };

    async beforeMount() {
        await this.fetchPokemon();
        console.log(this.pokemon[0]);
    }

    async fetchPokemon() {
        this.pokemon = [];
        this.sprites = {};
        this.options.offset = this.page === 1 ? 0 : this.page * this.options.limit;

        const data = await this.$pokeapi.getPokemonsList(this.options);
        this.count = data.count;

        const list = data.results;
        for (let i = 0; i < list.length; i++) {
            const pokemon = await this.$pokeapi.getPokemonByName(list[i].name);
            if (pokemon) {
                await this.setSprite(pokemon);
                this.pokemon.push(pokemon);
            }
        }
    }

    onSpriteError(event: ErrorEvent) {
        if (event.target) {
            const element = event.target as HTMLImageElement;
            const list = element.src.split("/");
            const name = list[list.length - 1].replace(".gif", "");
            const pokemon = this.pokemon.find((pokemon) => pokemon.name === name);
            if (pokemon) {
                if (pokemon.sprites.front_default) {
                    element.src = pokemon.sprites.front_default;
                } else {
                    element.src = "https://b.catgirlsare.sexy/n9gQZY8v.webp";
                }
            } else {
                element.src = "https://b.catgirlsare.sexy/n9gQZY8v.webp";
            }
        }
    }

    setSprite(pokemon: any) {
        let name = pokemon.name;
        if (this.spriteNames[pokemon.name]) {
            name = this.spriteNames[pokemon.name];
        }
        this.sprites[pokemon.name] = `https://projectpokemon.org/images/normal-sprite/${name}.gif`;
    }

    toggleShiny(name: string) {
        const sprites = this.$refs[name] as HTMLImageElement[];
        const sprite = sprites.length >= 1 ? sprites[0] : null;
        const icons = this.$refs[`toggle-shiny-${name}`] as HTMLImageElement[];
        const icon = icons.length >= 1 ? icons[0] : null;

        let spriteName = name;
        if (this.spriteNames[name]) {
            spriteName = this.spriteNames[name];
        }

        if (sprite && icon) {
            if (icon.src.includes("non-shiny")) {
                if (sprite.src.includes("projectpokemon")) {
                    sprite.src = `https://projectpokemon.org/images/shiny-sprite/${spriteName}.gif`;
                } else {
                    const pokemon = this.pokemon.find((pokemon) => pokemon.name === name);
                    if (pokemon) {
                        sprite.src = pokemon.sprites.front_shiny || "https://b.catgirlsare.sexy/n9gQZY8v.webp";
                    } else {
                        sprite.src = "https://b.catgirlsare.sexy/n9gQZY8v.webp";
                    }
                }
                icon.src = "/static/images/shiny.png";
            } else {
                if (sprite.src.includes("projectpokemon")) {
                    sprite.src = `https://projectpokemon.org/images/normal-sprite/${spriteName}.gif`;
                } else {
                    const pokemon = this.pokemon.find((pokemon) => pokemon.name === name);
                    if (pokemon) {
                        sprite.src = pokemon.sprites.front_default || "https://b.catgirlsare.sexy/n9gQZY8v.webp";
                    } else {
                        sprite.src = "https://b.catgirlsare.sexy/n9gQZY8v.webp";
                    }
                }
                icon.src = "/static/images/non-shiny.png";
            }
        }
    }
}
</script>

<style lang="scss">
.v-image {
    &__image {
        background-size: contain;
    }
}
</style>

<style lang="scss" scoped>
.pokemon {
    width: 80%;
    margin-left: auto;
    margin-right: auto;

    .sprite {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;

        &__image {
            margin: 0;
            /* height: 120px; */
            transform: scale(1.1);
        }
    }
}
</style>
