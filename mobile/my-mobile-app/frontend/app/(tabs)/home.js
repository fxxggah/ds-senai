import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api'; 

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true, 
    shouldShowList: true, 
    shouldPlaySound: true, 
    shouldSetBadge: false,
  }),
});

export default function TelaInicialRestrita() {
  const [comunicadoRecente, setComunicadoRecente] = useState(null);

  useEffect(() => {
    configurarEBuscarNotificacoes();
  }, []);

  const configurarEBuscarNotificacoes = async () => {
    try {
      const { status: statusExistente } = await Notifications.getPermissionsAsync();
      let statusFinal = statusExistente;

      if (statusExistente !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        statusFinal = status;
      }

      if (statusFinal !== 'granted') {
        console.log('Permissão negada.');
        return;
      }

      const emailLogado = await AsyncStorage.getItem('usuarioEmail');
      
      if (emailLogado) {
        // Usa o IP que você configurou no services/api
        const res = await api.get(`/notificacoes/checar/${emailLogado}`);
        
        if (res.data.temNotificacao) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: res.data.titulo,
              body: res.data.mensagem,
            },
            trigger: null, 
          });
          
          setComunicadoRecente({
            titulo: res.data.titulo,
            mensagem: res.data.mensagem,
          });
        }
      }
    } catch (erro) {
      console.error('Erro ao processar notificações:', erro);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.boasVindas}>Painel de Controle</Text>
      
      <TouchableOpacity style={styles.botaoChecar} onPress={configurarEBuscarNotificacoes}>
        <Text style={styles.textoBotao}>🔄 Checar Novos Avisos do RH</Text>
      </TouchableOpacity>

      {/* Seu mural fixo de avisos da fábrica */}
      <View style={styles.cardInfo}>
        <Text style={styles.tituloCard}>Avisos da Fábrica</Text>
        <Text style={styles.textoCard}>- Reunião de CIPA às 14h.</Text>
        <Text style={styles.textoCard}>- Manutenção preventiva na fresadora 02.</Text>
      </View>

      {/* Card dinâmico para os avisos nativos direcionados */}
      {comunicadoRecente && (
        <View style={[styles.cardInfo, { marginTop: 15, borderColor: '#4F46E5', borderWidth: 2 }]}>
          <Text style={styles.tituloCard}>🔔 {comunicadoRecente.titulo}</Text>
          <Text style={styles.textoCard}>{comunicadoRecente.mensagem}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  boasVindas: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  botaoChecar: {
    backgroundColor: '#4F46E5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotao: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardInfo: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tituloCard: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  textoCard: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  }
});