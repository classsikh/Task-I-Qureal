import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spin } from "antd";

const PokemonCard = ({ pokemon }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(pokemon.url);
        setDetails(response.data); 
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchDetails();
  }, [pokemon.url]);

  if (loading) {
    return <Spin style={{ display: "block", margin: "20px auto" }} />;
  }

  return (
    <Card
      title={pokemon.name.toUpperCase()}
      hoverable
      cover={
        details?.sprites?.front_default ? (
          <img
            alt={pokemon.name}
            src={details.sprites.front_default}
            style={{ height: 120, objectFit: "contain", margin: "10px auto" }}
          />
        ) : (
          <p>No Image Available</p>
        )
      }
      style={{ textAlign: "center" }}
    >
      <h4>Abilities:</h4>
      <ul>
        {details?.abilities?.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
    </Card>
  );
};

export default PokemonCard;
