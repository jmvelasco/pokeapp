/**
 *
 * [name].js representa una página con un parámetro dinámico
 *
 *  => cualquier ruta por debajo de /pokemons que no coincida con alguno de los archivos
 *     declarados bajo este directorio mostrará el contenido de este archivo
 *
 *  => el parametro de la ruta se obtiene examinando la propiedad params en las props en la función getServerSideProps
 *  => la clave del parámetro es el nombre del archivo: name
 */
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import {
  Container,
  StyledLink,
  Properties,
  PropertyItem,
} from "../../styles/globalStyles";
import { NavigateBack } from "../../components/NavigateBack";

const Pokemon = (props) => {
  return (
    <>
      <h1>{props.pokemon.name.toTitle()}</h1>
      <NavigateBack backToUrl="/pokemons" backToPage="Pokemon List" />
      <Container>
        <div>
          <Image
            src={props.pokemon.sprites.other["official-artwork"].front_default}
            width={220}
            height={220}
            alt={props.pokemon.name}
          />
        </div>

        <Properties>
          <PropertyItem>
            Height: <span>{props.pokemon.height}</span>
          </PropertyItem>
          <PropertyItem>
            Weight: <span>{props.pokemon.weight}</span>
          </PropertyItem>
          <PropertyItem>Types:</PropertyItem>
          <Properties>
            {props.pokemon.types &&
              props.pokemon.types.map((type, idx) => (
                <PropertyItem key={idx} pillColor="lightgreen">
                  <div>{type.type.name}</div>
                </PropertyItem>
              ))}
          </Properties>
          <PropertyItem>Abilities:</PropertyItem>
          <Properties>
            {props.pokemon.abilities &&
              props.pokemon.abilities.map((abilitie, idx) => (
                <PropertyItem key={idx} pillColor="orange">
                  <div>{abilitie.ability.name}</div>
                </PropertyItem>
              ))}
          </Properties>

          <PropertyItem>Moves:</PropertyItem>
          <MovesList>
            {props.pokemon.moves &&
              props.pokemon.moves.map((move, idx) => (
                <MovesItem key={idx}>{move.move.name}</MovesItem>
              ))}
          </MovesList>
        </Properties>
      </Container>
    </>
  );
};

const MovesList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.1rem;
`;

const MovesItem = styled.span`
  background-color: lightblue;
  text-align: center;
  padding: 0.5rem;
  border-radius: 2.5rem;
`;

export const getServerSideProps = async (ctx) => {
  const queryParam = ctx.params.name;
  const pokemon = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${queryParam}`)
  ).json();

  /**
   * ctx: contexto de la petición (request)
   */
  return {
    props: {
      pokemon,
    },
  };
};

export default Pokemon;
