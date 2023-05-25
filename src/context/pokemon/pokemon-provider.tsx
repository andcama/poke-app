import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { PokemonGameContext, type PokemonGameState } from './pokemon-game.context';
import { PokemonListContext, type PokemonListState } from './pokemon-list.context';

export const PokemonProvider = component$(() => {

  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    isVisible: true,
    showBackImage: false

  });

  const pokemonList = useStore<PokemonListState>({
    currentPage: 1,
    isLoading: false,
    pokemons: []
  })
  useContextProvider(PokemonGameContext, pokemonGame)
  useContextProvider(PokemonListContext, pokemonList)

  useVisibleTask$(() => {
    if (localStorage.getItem('pokemon-game')) {
      const { isVisible = true, pokemonId = 10, showBackImage = false } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;
      pokemonGame.isVisible = isVisible;
      pokemonGame.pokemonId = pokemonId;
      pokemonGame.showBackImage = showBackImage;
    }
  })
  useVisibleTask$(({ track }) => {
    track(() => [pokemonGame.isVisible, pokemonGame.pokemonId, pokemonGame.showBackImage]);
    localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
  })
  return (
    <Slot />
  )
});