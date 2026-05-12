import { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../services/api';

export default function GameForm({ mode }) {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    genre: '',
    classification: 'Livre',
    platform: '',
    game_status: 'Wishlist',
    release_date: '',
    developer: '',
  });

  async function loadGame() {
    if (mode !== 'edit') return;

    const response = await api.get('/games');
    const selected = response.data.find((item) => item.id == id);

    if (selected) {
      setForm({
        title: selected.title,
        genre: selected.genre,
        classification: selected.classification,
        platform: selected.platform,
        game_status: selected.game_status,
        release_date: selected.release_date.split('T')[0],
        developer: selected.developer,
      });
    }
  }

  useEffect(() => {
    loadGame();
  }, []);

  async function handleSubmit() {
    try {
      if (mode === 'create') {
        await api.post('/games', form);
        Alert.alert('Success', 'Game created successfully');
      } else {
        await api.put(`/games/${id}`, form);
        Alert.alert('Success', 'Game updated successfully');
        router.back();
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert('Error', 'Operation failed');
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#121212', padding: 20 }}>
      <Text style={{ color: '#fff' }}>Título</Text>
      <TextInput
        value={form.title}
        onChangeText={(text) => setForm({ ...form, title: text })}
        style={input}
      />

      <Text style={{ color: '#fff' }}>Gênero</Text>
      <TextInput
        value={form.genre}
        onChangeText={(text) => setForm({ ...form, genre: text })}
        style={input}
      />

      <Text style={{ color: '#fff' }}>Plataforma</Text>
      <TextInput
        value={form.platform}
        onChangeText={(text) => setForm({ ...form, platform: text })}
        style={input}
      />

      <Text style={{ color: '#fff' }}>Desenvolvedora</Text>
      <TextInput
        value={form.developer}
        onChangeText={(text) => setForm({ ...form, developer: text })}
        style={input}
      />

      <Text style={{ color: '#fff' }}>Data lançamento</Text>
      <TextInput
        placeholder="2022-02-25"
        placeholderTextColor="#666"
        value={form.release_date}
        onChangeText={(text) => setForm({ ...form, release_date: text })}
        style={input}
      />

      <Picker
        selectedValue={form.classification}
        onValueChange={(value) =>
          setForm({ ...form, classification: value })
        }
        style={{ color: '#fff', backgroundColor: '#1E1E1E' }}
      >
        <Picker.Item label="Livre" value="Livre" />
        <Picker.Item label="10" value="10" />
        <Picker.Item label="12" value="12" />
        <Picker.Item label="14" value="14" />
        <Picker.Item label="16" value="16" />
        <Picker.Item label="18" value="18" />
      </Picker>

      <Picker
        selectedValue={form.game_status}
        onValueChange={(value) =>
          setForm({ ...form, game_status: value })
        }
        style={{ color: '#fff', backgroundColor: '#1E1E1E' }}
      >
        <Picker.Item label="Wishlist" value="Wishlist" />
        <Picker.Item label="Playing" value="Playing" />
        <Picker.Item label="Completed" value="Completed" />
        <Picker.Item label="Dropped" value="Dropped" />
      </Picker>

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: '#7C3AED',
          padding: 16,
          borderRadius: 12,
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          {mode === 'create' ? 'Criar Game' : 'Salvar Alterações'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const input = {
  backgroundColor: '#1E1E1E',
  color: '#fff',
  padding: 14,
  borderRadius: 10,
  marginBottom: 16,
  marginTop: 6,
};