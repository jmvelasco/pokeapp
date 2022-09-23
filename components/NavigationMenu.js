import Link from "next/link";
import React, { useState } from "react";

export const NavigationMenu = () => {
  const [selectedLink, setSelectedLink] = useState("pokemons");
  console.log(selectedLink);
  return (
    <nav>
      <Link href={`/pokemons`}>
        <a
          className={selectedLink == "pokemons" ? "active" : ""}
          onClick={() => setSelectedLink("pokemons")}
        >
          Pokemons
        </a>
      </Link>
      |
      <Link href={`/olympic-games`}>
        <a
          className={selectedLink == "olympic-games" ? "active" : ""}
          onClick={() => setSelectedLink("olympic-games")}
        >
          Olympic Games
        </a>
      </Link>
    </nav>
  );
};
