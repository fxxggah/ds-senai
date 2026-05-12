import { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import api from '../../src/services/api';
import GameCard from '../../src/components/GameCard';

export default function GamesScreen() {
  const [games, setGames] = useState([]);

  async function loadGames() {
    try {
      const response = await api.get('/games');
      setGames(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadGames();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#121212', padding: 20 }}>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <GameCard game={item} />}
        ListEmptyComponent={
          <Text style={{ color: '#fff' }}>Nenhum game cadastrado.</Text>
        }
      />
    </View>
  );
}