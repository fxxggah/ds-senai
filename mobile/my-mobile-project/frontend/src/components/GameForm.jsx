import { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../services/api';

export default function GameForm({ mode }) {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [showDatePicker, setShowDatePicker] = useState(false);

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

    try {
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
    } catch (error) {
      console.log(error.response?.data || error.message);
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

        router.replace('/games');
      } else {
        await api.put(`/games/${id}`, form);

        Alert.alert('Success', 'Game updated successfully');

        router.replace('/games');
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert('Error', 'Operation failed');
    }
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
      }}
    >
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

      {Platform.OS === 'web' ? (
        <TextInput
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#666"
          value={form.release_date}
          onChangeText={(text) =>
            setForm({ ...form, release_date: text })
          }
          style={input}
        />
      ) : (
        <>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              placeholder="Selecione uma data"
              placeholderTextColor="#666"
              value={form.release_date}
              editable={false}
              style={input}
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={
                form.release_date
                  ? new Date(form.release_date)
                  : new Date()
              }
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);

                if (selectedDate) {
                  const formattedDate = selectedDate
                    .toISOString()
                    .split('T')[0];

                  setForm({
                    ...form,
                    release_date: formattedDate,
                  });
                }
              }}
            />
          )}
        </>
      )}

      <Text style={{ color: '#fff', marginTop: 10 }}>
        Classificação
      </Text>
      <Picker
        selectedValue={form.classification}
        onValueChange={(value) =>
          setForm({ ...form, classification: value })
        }
        style={{
          color: '#fff',
          backgroundColor: '#1E1E1E',
          marginBottom: 16,
        }}
      >
        <Picker.Item label="Livre" value="Livre" />
        <Picker.Item label="10" value="10" />
        <Picker.Item label="12" value="12" />
        <Picker.Item label="14" value="14" />
        <Picker.Item label="16" value="16" />
        <Picker.Item label="18" value="18" />
      </Picker>

      <Text style={{ color: '#fff' }}>Status</Text>
      <Picker
        selectedValue={form.game_status}
        onValueChange={(value) =>
          setForm({ ...form, game_status: value })
        }
        style={{
          color: '#fff',
          backgroundColor: '#1E1E1E',
        }}
      >
        <Picker.Item label="Quero jogar" value="Quero jogar" />
        <Picker.Item label="Jogando" value="Jogando" />
        <Picker.Item label="Completado" value="Completado" />
        <Picker.Item label="Dropado" value="Dropado" />
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
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {mode === 'create'
            ? 'Criar Game'
            : 'Salvar Alterações'}
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