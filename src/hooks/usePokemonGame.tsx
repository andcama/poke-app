import { useComputed$, useContext, $ } from '@builder.io/qwik';
import { PokemonGameContext } from "~/context";

export const usePokemonGame = () => {

    const pokemonGame = useContext(PokemonGameContext);

    const changePokemonId = $((value: number) => {
        if ((pokemonGame.pokemonId + value) <= 0) return;
        pokemonGame.pokemonId += value;
    });

    const toggleFromBack = $(() => {
        pokemonGame.showBackImage = !pokemonGame.showBackImage;
    })

    const toggleVisible = $(() => {
        pokemonGame.isVisible = !pokemonGame.isVisible;
    })

    return {
        pokemonId: useComputed$(() => pokemonGame.pokemonId),
        showBackImage: useComputed$(() => pokemonGame.showBackImage),
        isVisible: useComputed$(() => pokemonGame.isVisible),
        nextPokemon: $(() => changePokemonId(+1)),
        previousPokemon: $(() => changePokemonId(-1)),
        toggleFromBack: toggleFromBack,
        toggleVisible: toggleVisible

    }
}