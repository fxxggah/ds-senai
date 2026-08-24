import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

// Carregamento condicional do react-native-maps para evitar crash na Web
let MapView, Marker;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
}

export default function TelaLocalizacao() {
  const [localizacao, setLocalizacao] = useState(null);
  const [carregandoGPS, setCarregandoGPS] = useState(true);
  const [enviandoCheckin, setEnviandoCheckin] = useState(false);

  // Busca a localização atual na montagem da tela
  useEffect(() => {
    obterLocalizacaoAtual();
  }, []);

  // Solicita permissão e obtém as coordenadas de GPS do dispositivo
  const obterLocalizacaoAtual = async () => {
    setCarregandoGPS(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'É necessário autorizar o uso do GPS para registrar presença na fábrica.');
        setCarregandoGPS(false);
        return;
      }

      const posicao = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocalizacao({
        latitude: posicao.coords.latitude,
        longitude: posicao.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      });
    } catch (erro) {
      console.error(erro);
      Alert.alert('Erro no GPS', 'Não foi possível capturar sua posição atual.');
    } finally {
      setCarregandoGPS(false);
    }
  };

  // Envia as coordenadas do usuário e o tipo (ENTRADA/SAIDA) para a API
  const registrarPonto = async (tipo) => {
    if (!localizacao) {
      return Alert.alert('Aguarde', 'Obtendo sinal de GPS...');
    }

    setEnviandoCheckin(true);

    try {
      const idSalvo = await AsyncStorage.getItem('usuarioId');

      if (!idSalvo) {
        return Alert.alert('Erro', 'Sessão inválida. Faça login novamente.');
      }

      // Envia requisição via Gateway contendo as coordenadas no body
      const res = await api.post(`/api/perfil/perfil/${idSalvo}/checkin`, {
        latitude: localizacao.latitude,
        longitude: localizacao.longitude,
        tipo: tipo,
      });

      Alert.alert('Sucesso!', res.data.message);
    } catch (erro) {
      console.error(erro);
      Alert.alert('Erro', `Falha ao registrar ${tipo.toLowerCase()} no servidor.`);
    } finally {
      setEnviandoCheckin(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Tela de carregando GPS */}
      {carregandoGPS ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#003366" />
          <Text style={styles.textoCarregando}>Buscando sinal de satélite GPS...</Text>
        </View>
      ) : localizacao ? (
        <>
          {/* Renderização do mapa no Mobile (Android/iOS) */}
          {Platform.OS !== 'web' && MapView ? (
            <MapView 
              style={styles.mapa} 
              initialRegion={localizacao}
              showsUserLocation={true}
            >
              {/* Marcador da posição atual do usuário */}
              <Marker
                coordinate={{
                  latitude: localizacao.latitude,
                  longitude: localizacao.longitude,
                }}
                title="Você está aqui"
                description="Posto de Operação Industrial"
              />

              {/* Marcadores fictícios de apoio das Unidades Fabris */}
              <Marker
                coordinate={{
                  latitude: localizacao.latitude + 0.004,
                  longitude: localizacao.longitude + 0.004,
                }}
                title="Portaria Central"
                description="Unidade Fabril 01"
                pinColor="blue"
              />

              <Marker
                coordinate={{
                  latitude: localizacao.latitude - 0.004,
                  longitude: localizacao.longitude - 0.004,
                }}
                title="Portaria Central"
                description="Unidade Fabril 02"
                pinColor="blue"
              />
            </MapView>
          ) : (
            /* Fallback visual exibido quando executado no navegador Web */
            <View style={styles.containerWeb}>
              <Text style={styles.tituloWeb}>📍 Visualização de Mapa Indisponível na Web</Text>
              <Text style={styles.subtextoWeb}>
                O mapa interativo é executado apenas no aplicativo móvel (Android/iOS). 
                Suas coordenadas foram capturadas via navegador e podem ser enviadas abaixo.
              </Text>
            </View>
          )}

          {/* Painel inferior de ações e informações de coordenadas */}
          <View style={styles.painelInferior}>
            <Text style={styles.tituloPainel}>Confirmação de Posto</Text>
            <Text style={styles.coordTexto}>Lat: {localizacao.latitude.toFixed(6)}</Text>
            <Text style={styles.coordTexto}>Lon: {localizacao.longitude.toFixed(6)}</Text>

            <TouchableOpacity 
              style={[styles.botaoEntrada, enviandoCheckin && styles.botaoDesabilitado]} 
              onPress={() => registrarPonto('ENTRADA')}
              disabled={enviandoCheckin}
            >
              {enviandoCheckin ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.textoBotao}>📍 REGISTRAR ENTRADA NO TURNO</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.botaoSaida, enviandoCheckin && styles.botaoDesabilitado]} 
              onPress={() => registrarPonto('SAIDA')}
              disabled={enviandoCheckin}
            >
              {enviandoCheckin ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.textoBotao}>🛑 REGISTRAR SAÍDA DO TURNO</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoAtualizar} onPress={obterLocalizacaoAtual}>
              <Text style={styles.textoBotaoAtualizar}>🔄 Recalibrar GPS</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        /* Estado de erro/falha ao capturar GPS */
        <View style={styles.centro}>
          <Text style={styles.textoErro}>GPS não disponível ou permissão recusada.</Text>
          <TouchableOpacity style={styles.botaoAtualizar} onPress={obterLocalizacaoAtual}>
            <Text style={styles.textoBotaoAtualizar}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// Estilização dos componentes da interface
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  mapa: { flex: 1 },
  containerWeb: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#e6f2ff', 
    padding: 20 
  },
  tituloWeb: { fontSize: 16, fontWeight: 'bold', color: '#003366', marginBottom: 8, textAlign: 'center' },
  subtextoWeb: { fontSize: 13, color: '#555', textAlign: 'center', maxWidth: 400 },
  textoCarregando: { marginTop: 10, color: '#666', fontSize: 14 },
  textoErro: { color: '#cc0000', fontSize: 16, textAlign: 'center', marginBottom: 15 },
  painelInferior: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tituloPainel: { fontSize: 18, fontWeight: 'bold', color: '#003366', marginBottom: 5 },
  coordTexto: { fontSize: 13, color: '#777' },
  botaoEntrada: {
    backgroundColor: '#003366',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  botaoSaida: {
    backgroundColor: '#d9534f',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoDesabilitado: { backgroundColor: '#888888' },
  textoBotao: { color: '#ffffff', fontWeight: 'bold', fontSize: 14 },
  botaoAtualizar: { marginTop: 10, alignItems: 'center', padding: 8 },
  textoBotaoAtualizar: { color: '#0066cc', fontWeight: '600', fontSize: 13 },
});