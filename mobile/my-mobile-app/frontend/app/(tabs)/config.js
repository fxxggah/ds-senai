import { useState } from 'react'; // 1. Importado useState
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'; // 2. Importado Modal
import { useRouter } from 'expo-router';

export default function TelaConfig() {
  const [modalVisivel, setModalVisivel] = useState(false); // 3. Estado do modal
  const router = useRouter();

  const fazerLogout = () => {
    setModalVisivel(false);
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações da Conta</Text>
      
      {/* O botão agora apenas abre o Modal */}
      <TouchableOpacity style={styles.botaoSair} onPress={() => setModalVisivel(true)}>
        <Text style={styles.textoBotaoSair}>Sair do Sistema</Text>
      </TouchableOpacity>

      {/* 🚀 Modal de Confirmação */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Atenção</Text>
            <Text style={styles.modalTexto}>Deseja realmente encerrar a sessão?</Text>
            
            <View style={styles.botoesContainer}>
              <TouchableOpacity 
                style={styles.botaoCancelar} 
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.botaoConfirmar} 
                onPress={fazerLogout}
              >
                <Text style={styles.textoBotaoConfirmar}>Confirmar Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', justifyContent: 'center' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  botaoSair: { backgroundColor: '#cc0000', padding: 15, borderRadius: 8, alignItems: 'center' },
  textoBotaoSair: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  
  // Novos estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
    elevation: 5,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  modalTexto: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  botoesContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoCancelar: {
    color: '#333',
    fontWeight: 'bold',
  },
  botaoConfirmar: {
    flex: 1,
    backgroundColor: '#cc0000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoConfirmar: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});