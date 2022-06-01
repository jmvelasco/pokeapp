/**
 *
 * Server Side Rendering (SSR): Implementar función getServerSideProps
 *   => Se genera el HTML en el servidor y se manda al cliente el HTML construido
 *      junto con el javascript que aporta la funcionalidad de la aplicación
 *
 */
import styled from 'styled-components';
import Link from "next/link";

const Pokemons = (props) => {
  return (
    <>
      <Title>Pokemons</Title>
      <ListWraper>
        {props.pokemons.map((pokemon, index) => (
          <ListItem key={pokemon.name}>
            <Link href={`/${pokemon.name}`}>
              <a>{pokemon.name.toTitle()}</a>
            </Link>
          </ListItem>
        ))}
      </ListWraper>
    </>
  );
};

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  text-align: center;
`;
const ListWraper = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;
const ListItem = styled.span`
  list-style: none;
  border: 1px solid #e4e4e4;
  padding: 0.5rem;
  background-color: lightblue;

  &:hover {
    background-color: darkblue;
    color: #e4e4e4;
  }
`;

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
