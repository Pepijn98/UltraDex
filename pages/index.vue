<template>
    <div>
        <ultrabar />
        <v-container fluid>
            <v-row class="pokemon" align="center">
                <v-col v-for="poke in pokemon" :key="poke.name" md="3">
                    <v-card
                        :elevation="3"
                        class="pokemon"
                        max-width="250"
                        shaped>
                        <v-img :src="poke.sprites.front_default || 'https://b.catgirlsare.sexy/n9gQZY8v.webp'" />
                        <div class="text-center">
                            <v-chip
                                v-for="item in poke.types"
                                :key="item.type.name"
                                :color="colors[item.type.name]"
                                :ripple="false"
                                class="ma-2"
                                label
                                small>
                                <b style="text-shadow: 1px 1px 3px #000000;">{{ item.type.name }}</b>
                            </v-chip>
                        </div>
                        <v-card-title>{{ poke.name }}</v-card-title>
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
    page = 1;
    count = 0;

    options = {
        limit: 16,
        offset: 0
    };

    pokemon: any[] = [];

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
        this.options.offset = this.page === 1 ? 0 : this.page * this.options.limit;

        const data = await this.$pokeapi.getPokemonsList(this.options);
        this.count = data.count;

        const list = data.results;
        for (let i = 0; i < list.length; i++) {
            const pokemon = await this.$pokeapi.getPokemonByName(list[i].name);
            if (pokemon) this.pokemon.push(pokemon);
        }
    }
}
</script>

<style lang="scss" scoped>
.pokemon {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}
</style>
