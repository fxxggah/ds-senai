import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function GameCard({ game }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/game/${game.id}`)}
      style={{
        backgroundColor: '#1E1E1E',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
      }}
    >
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
        {game.title}
      </Text>

      <Text style={{ color: '#aaa' }}>
        Classification: {game.classification}
      </Text>

      <Text style={{ color: '#aaa' }}>
        Release: {new Date(game.release_date).toLocaleDateString('pt-BR')}
      </Text>
    </TouchableOpacity>
  );
}