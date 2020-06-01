type SpriteNames = Record<string, string>;

interface TypeColors {
    normal: string;
    poison: string;
    psychic: string;
    grass: string;
    ground: string;
    ice: string;
    fire: string;
    rock: string;
    dragon: string;
    water: string;
    bug: string;
    dark: string;
    fighting: string;
    ghost: string;
    steel: string;
    flying: string;
    electric: string;
    fairy: string;
}

interface Pokemon {
    spriteNames: SpriteNames;
    typeColors: TypeColors;
}

export default Pokemon;
