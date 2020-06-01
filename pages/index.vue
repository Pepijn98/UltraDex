<template>
    <div class="max-hw">
        <div v-if="pokemon.length < 16" class="max-hw center-content">
            <div class="loading-wrapper">
                <loading
                    :active="pokemon.length < 16"
                    :is-full-page="false"
                    :height="100"
                    :width="100"
                    color="#e8ba4b"
                    loader="dots" />
                <div style="max-width: 430px;">Fetching pokemon info, this will only take a few seconds. Next time you load this page it will be faster!</div>
            </div>
        </div>
        <div v-else>
            <ultrabar />
            <v-container fluid>
                <v-row class="list" align="center">
                    <v-col v-for="poke in pokemon" :key="poke.name" md="3">
                        <v-card
                            :elevation="3"
                            class="pokemon"
                            max-width="250"
                            min-width="250"
                            shaped>
                            <div class="header">
                                <v-btn top left fab @click="toggleShiny(poke.name)">
                                    <img :ref="`toggle-shiny-${poke.name}`" height="30px" src="/static/images/non-shiny.png">
                                </v-btn>
                                <div class="pokemon-sprite">
                                    <img
                                        :ref="poke.name"
                                        class="pokemon-sprite__image"
                                        :src="sprites[poke.name]"
                                        draggable="false"
                                        @error="onSpriteError">
                                </div>
                            </div>
                            <div class="text-center">
                                <v-chip
                                    v-for="item in poke.types"
                                    :key="item.type.name"
                                    :color="$pokemon.typeColors[item.type.name]"
                                    :ripple="false"
                                    class="ma-2"
                                    text-color="white"
                                    label
                                    small>
                                    <b style="text-shadow: 1px 1px 3px #000000;">{{ item.type.name }}</b>
                                </v-chip>
                            </div>
                            <div class="pokemon-id">{{ getID(poke) }}</div>
                            <v-card-title>{{ $utils.beautifyName(poke.name) }}</v-card-title>
                            <v-card-subtitle>{{ getGenusText(poke) }}</v-card-subtitle>
                            <v-card-text>{{ getFlavorText(poke) }}</v-card-text>
                            <div style="height: 20px;" />
                        </v-card>
                    </v-col>
                </v-row>

                <v-pagination
                    v-model="page"
                    :length="Math.floor(count / options.limit)"
                    total-visible="10"
                    @input="fetchPokemon" />
            </v-container>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// https://pokeapi.co/api/v2/pokemon-species/

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
    species: any[] = [];
    page = 1;
    count = 0;

    sprites: Record<string, string> = {};

    options = {
        limit: 16,
        offset: 0
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
                this.setSprite(pokemon);
                this.pokemon.push(pokemon);
            }

            try {
                const species = await this.$pokeapi.getPokemonSpeciesByName(list[i].name);
                if (species) this.species.push(species);
            } catch (e) {
                this.$console.error(e);
            }
        }
    }

    getID(pokemon: any) {
        return "#" + (pokemon.id < 10 ? "00" + pokemon.id : pokemon.id < 100 ? "0" + pokemon.id : pokemon.id);
    }

    getGenusText(pokemon: any) {
        const item = this.species.find((s) => s.id === pokemon.id);
        if (item) {
            const entries = item.genera.filter((entry: any) => entry.language.name === "en");
            if (entries.length >= 1) {
                return entries[0].genus;
            }
            return "No Genus Text Found";
        }
        return "No Genus Text Found";
    }

    getFlavorText(pokemon: any) {
        const item = this.species.find((s) => s.id === pokemon.id);
        if (item) {
            const entries = item.flavor_text_entries.filter((entry: any) => entry.language.name === "en");
            if (entries.length >= 1) {
                return entries[0].flavor_text;
            }
            return "No Flavor Text Found";
        }
        return "No Flavor Text Found";
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
        if (this.$pokemon.spriteNames[pokemon.name]) {
            name = this.$pokemon.spriteNames[pokemon.name];
        }
        this.sprites[pokemon.name] = `https://projectpokemon.org/images/normal-sprite/${name}.gif`;
    }

    toggleShiny(name: string) {
        const sprites = this.$refs[name] as HTMLImageElement[];
        const sprite = sprites.length >= 1 ? sprites[0] : null;
        const icons = this.$refs[`toggle-shiny-${name}`] as HTMLImageElement[];
        const icon = icons.length >= 1 ? icons[0] : null;

        let spriteName = name;
        if (this.$pokemon.spriteNames[name]) {
            spriteName = this.$pokemon.spriteNames[name];
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
.vld-overlay {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}

.v-card {
    &__text {
        max-height: 105px;
        overflow: auto;

        /* FireFox scrollbar */
        scrollbar-color: var(--scrollbar-background) transparent;
        scrollbar-width: thin;

        /* Chrome scrollbar */
        &::-webkit-scrollbar {
            width: 5px;
        }

        &::-webkit-scrollbar-track {
            background: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background: var(--scrollbar-background);
            border-radius: 50px;

            &:hover {
                background: var(--scrollbar-background-hover);
            }
        }
    }
}

.v-image {
    &__image {
        background-size: contain;
    }
}
</style>

<style lang="scss" scoped>
.max-hw {
    height: 100%;
    width: 100%;
}

.center-content {
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading-wrapper {
    width: fit-content;
    text-align: center;
}

.list {
    width: 80%;
    margin-left: auto;
    margin-right: auto;

    .pokemon {
        margin-left: auto;
        margin-right: auto;

        .header {
            background-color: var(--card-header-background);
            border-bottom-left-radius: 24px;
            border-bottom-right-radius: 24px;
        }

        &-sprite {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 200px;

            &__image {
                margin: 0;
                transform: scale(1.1);
            }
        }

        &-id {
            width: fit-content;
            padding: 0 5px 0 16px;
            margin-bottom: -16px;
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.375rem;
            letter-spacing: 0.0071428571em;
            background-color: var(--pokemon-id-background);
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }
    }
}
</style>
