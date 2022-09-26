import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export const NavigationMenu = () => {
  const [selectedLink, setSelectedLink] = useState("pokemons");
  const router = useRouter();

  useEffect(() => {
    const route = router.route;
    if (route.indexOf("pokemons") >= 0) {
      setSelectedLink("pokemons");
    } else {
      setSelectedLink("olympic-games");
    }
  }, [router.route]);

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
