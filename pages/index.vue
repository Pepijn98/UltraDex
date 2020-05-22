<template>
    <div>
        <ultrabar />
        <v-container fluid>
            <v-row class="pokemon" align="center">
                <v-col v-for="p in 50" :key="p.name" md="3">
                    <v-card
                        :elevation="3"
                        class="pokemon"
                        max-width="250"
                        shaped>
                        <v-img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/491.png" />
                        <v-card-title>Darkrai</v-card-title>
                        <v-card-subtitle>Pitch-Black Pokémon</v-card-subtitle>
                        <v-card-text>It can lull people to sleep and make them dream. It is active during nights of the new moon.</v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
    head: {
        title: "UltraDex / Home",
        meta: [
            { hid: "og-title", property: "og:title", content: "UltraDex" }
        ]
    }
})
export default class IndexPage extends Vue {
    pokemon: any[] = [];

    async beforeMount() {
        const pokemons = await this.$pokeapi.getPokemonsList();
        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = await this.$pokeapi.getPokemonByName(pokemons[i].name);
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
