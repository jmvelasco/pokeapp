/**
 *
 * Server Side Rendering (SSR): Implementar función getServerSideProps
 *   => Se genera el HTML en el servidor y se manda al cliente el HTML construido
 *      junto con el javascript que aporta la funcionalidad de la aplicación
 *
 */
import { Title } from "../../styles/globalStyles";
import { List } from "../../components/List";

const Pokemons = (props) => {
  return (
    <>
      <Title>Pokemons</Title>
      <List items={props.pokemons} />
    </>
  );
};

// getServerSideProps := A nivel de server voy a conseguir las props para el componente
// el cliente nunca verá este código, por ejemplo código como API-KEY nunca será accedida desde el cliente
export const getStaticProps = async () => {
  const pokemons = await (
    await fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
  ).json();

  const results = [];
  pokemons.results.forEach((pokemon) => {
    results.push({ ...pokemon, link: `/pokemons/${pokemon.name}` });
  });
  console.log("pokemons", results);
  return {
    props: {
      pokemons: results,
    },
  };
};

export default Pokemons;
