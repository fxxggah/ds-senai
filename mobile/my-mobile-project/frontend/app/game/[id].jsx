import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../../src/services/api';

export default function GameDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [game, setGame] = useState(null);

  async function loadGame() {
    try {
      const response = await api.get('/games');
      const selected = response.data.find(
        (item) => item.id == id
      );

      setGame(selected);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  useEffect(() => {
    loadGame();
  }, []);

  if (!game) return null;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 24,
        }}
      >
        {game.title}
      </Text>

      <Info label="Gênero" value={game.genre} />
      <Info
        label="Classificação"
        value={game.classification}
      />
      <Info label="Plataforma" value={game.platform} />
      <Info label="Status" value={game.game_status} />
      <Info
        label="Data de lançamento"
        value={game.release_date?.split('T')[0]}
      />
      <Info
        label="Desenvolvedora"
        value={game.developer}
      />

      <TouchableOpacity
        onPress={() => router.push(`/edit/${game.id}`)}
        style={{
          backgroundColor: '#7C3AED',
          padding: 16,
          borderRadius: 12,
          marginTop: 30,
          marginBottom: 40,
        }}
      >
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Editar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Info({ label, value }) {
  return (
    <View
      style={{
        backgroundColor: '#1E1E1E',
        padding: 16,
        borderRadius: 12,
        marginBottom: 14,
      }}
    >
      <Text
        style={{
          color: '#888',
          fontSize: 13,
          marginBottom: 4,
        }}
      >
        {label}
      </Text>

      <Text
        style={{
          color: '#fff',
          fontSize: 16,
          fontWeight: '600',
        }}
      >
        {value}
      </Text>
    </View>
  );
}