/**
 *
 * Server Side Rendering (SSR): Implementar función getServerSideProps
 *   => Se genera el HTML en el servidor y se manda al cliente el HTML construido
 *      junto con el javascript que aporta la funcionalidad de la aplicación
 *
 */
import Link from "next/link";

const Pokemons = (props) => {
  return (
    <div>
      <h1>Pokemons</h1>
      <ul>
        {props.pokemons.map((pokemon, index) => (
          <li key={pokemon.name}>
            <Link href={`/pokemons/${pokemon.name}`}>
              <a>{pokemon.name.toTitle()}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// getServerSideProps := A nivel de server voy a conseguir las props para el componente
// el cliente nunca verá este código, por ejemplo código como API-KEY nunca será accedida desde el cliente
export const getServerSideProps = async () => {
  const pokemons = await (
    await fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
  ).json();

  return {
    props: {
      pokemons: pokemons.results,
    },
  };
};

export default Pokemons;
