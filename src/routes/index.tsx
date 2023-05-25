import { $, component$ } from '@builder.io/qwik';
import { DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/usePokemonGame';



export default component$(() => {


  const nav = useNavigate();
  const { pokemonId,
    showBackImage,
    isVisible,
    nextPokemon,
    previousPokemon,
    toggleFromBack,
    toggleVisible } = usePokemonGame();


  const gotoPokemon = $((id:number) => {
    nav(`/pokemon/${pokemonId}/`)
  });

  return (
    <>
      <span class="text-2xl">Buscador Simple</span>
      <span class="text-9xl">{pokemonId.value}</span>

      <div onClick$={() => gotoPokemon(pokemonId.value)}>
        <PokemonImage id={pokemonId.value} backImage={showBackImage.value} isVisible={isVisible.value} />
      </div>

      <div class="mt-2">
        <button onClick$={previousPokemon} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={nextPokemon} class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={toggleFromBack} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={toggleVisible} class="btn btn-primary mr-2">Revelar</button>
      </div>

    </>

  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Primera aplicacion con Qwik',
    },
  ],
};
