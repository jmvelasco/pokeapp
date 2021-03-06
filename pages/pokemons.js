/**
 *
 * Server Side Rendering (SSR): Implementar función getServerSideProps
 *   => Se genera el HTML en el servidor y se manda al cliente el HTML construido
 *      junto con el javascript que aporta la funcionalidad de la aplicación
 *
 */
import styled from 'styled-components';
import { List } from '../components/List';

const Pokemons = (props) => {
  return (
    <>
      <Title>Pokemons</Title>
      <List items={props.pokemons} />
    </>
  );
};

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  text-align: center;
`;

// getServerSideProps := A nivel de server voy a conseguir las props para el componente
// el cliente nunca verá este código, por ejemplo código como API-KEY nunca será accedida desde el cliente
export const getStaticProps = async () => {
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
