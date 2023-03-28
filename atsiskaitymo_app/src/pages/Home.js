import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL =
          "https://autumn-delicate-wilderness.glitch.me/v1/content/skills";

        const API_TOKEN =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM5MCwiZW1haWwiOiJlZG1hQGVkbWExLmx0IiwiaWF0IjoxNjgwMDE2MjE5fQ.kpmYxY1nltPX9KRKisZLnt6E06oywMQ2qonl_GkN63o";

        const config = {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        };

        const response = await axios.get(API_URL, config);
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <CardList>
      {data.map((item) => (
        <Card key={item.id}>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </Card>
      ))}
    </CardList>
  );
}

const Card = styled.div`
  background-color: lightgreen;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  margin: 1rem;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const CardTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default App;
