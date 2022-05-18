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
import Image from "next/image";
import Link from "next/link";

const Pokemon = (props) => {
  return (
    <>
      <h1>{props.pokemon.name.toTitle()}</h1>
      <Link href={`/pokemons`}>
        <a>Back to Pokemon list</a>
      </Link>
      <br />
      <Image
        src={props.pokemon.sprites.other["official-artwork"].front_default}
        width={220}
        height={220}
        alt={props.pokemon.name}
      />
      <ul>
        <li>Height: {props.pokemon.height}</li>
        <li>Weight: {props.pokemon.weight}</li>
        <li>Types:</li>
        <ul>
          {props.pokemon.types &&
            props.pokemon.types.map((type, idx) => (
              <li key={idx}>{type.type.name}</li>
            ))}
        </ul>
        <li>Abilities:</li>
        <ul>
          {props.pokemon.abilities &&
            props.pokemon.abilities.map((abilitie, idx) => (
              <li key={idx}>{abilitie.ability.name}</li>
            ))}
        </ul>
        <li>Moves:</li>
        <ul>
          {props.pokemon.moves &&
            props.pokemon.moves.map((move, idx) => (
              <li key={idx}>{move.move.name}</li>
            ))}
        </ul>
      </ul>
    </>
  );
};

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
