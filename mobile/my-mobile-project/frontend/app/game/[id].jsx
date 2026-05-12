import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../../src/services/api';

export default function GameDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [game, setGame] = useState(null);

  async function loadGame() {
    const response = await api.get('/games');
    const selected = response.data.find((item) => item.id == id);
    setGame(selected);
  }

  useEffect(() => {
    loadGame();
  }, []);

  if (!game) return null;

  return (
    <View style={{ flex: 1, backgroundColor: '#121212', padding: 20 }}>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
        {game.title}
      </Text>

      <Text style={{ color: '#ddd' }}>Genre: {game.genre}</Text>
      <Text style={{ color: '#ddd' }}>Classification: {game.classification}</Text>
      <Text style={{ color: '#ddd' }}>Platform: {game.platform}</Text>
      <Text style={{ color: '#ddd' }}>Status: {game.game_status}</Text>
      <Text style={{ color: '#ddd' }}>Developer: {game.developer}</Text>

      <TouchableOpacity
        onPress={() => router.push(`/edit/${game.id}`)}
        style={{
          backgroundColor: '#7C3AED',
          padding: 16,
          borderRadius: 12,
          marginTop: 30,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Editar</Text>
      </TouchableOpacity>
    </View>
  );
}