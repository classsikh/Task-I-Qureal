import React, { useState } from "react";
import { usePokemons } from "./queries/usePokemons";
import { Input, Row, Col, Spin, Typography } from "antd";
import PokemonCard from "./components/PokemonCard";
import "./App.css";

const { Title } = Typography;

const App = () => {
  const [searchField, setSearchField] = useState("");
  const { data: pokemons, isLoading, error } = usePokemons();

 
  const filteredPokemons = pokemons?.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <div className="app">
      <Title level={2} style={{ textAlign: "center", margin: "20px 0" }}>
        PokéApp
      </Title>
      <Input
        placeholder="Search Pokémon"
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
        style={{ width: 300, margin: "0 auto 20px", display: "block" }}
      />
      {isLoading && <Spin size="large" style={{ display: "block", margin: "20px auto" }} />}
      {error && <p style={{ textAlign: "center", color: "red" }}>Failed to fetch data</p>}
      <Row gutter={[16, 16]}>
        {filteredPokemons?.map((pokemon, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <PokemonCard pokemon={pokemon} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default App;
