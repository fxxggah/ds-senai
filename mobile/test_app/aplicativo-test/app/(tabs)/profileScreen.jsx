import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import api from "../../service/api";

// 1. COMPONENTE EXTERNO PARA NÃO PERDER O FOCO
const ProfileField = ({ label, value, onChange, isEditing }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    {isEditing ? (
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholderTextColor="#444"
        selectionColor="#d32f2f"
      />
    ) : (
      <Text style={styles.valueText}>{value || "Não informado"}</Text>
    )}
  </View>
);

export default function ProfileScreen() {
  const [user, setUser] = useState([]);
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Estados do formulário
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [filhos, setIfilhos] = useState("");

  // useEffect com array de dependências vazio para rodar apenas UMA VEZ
  useEffect(() => {
    exibirUsuarios();
  }, []);

  const exibirUsuarios = async () => {
    try {
      const response = await api.get("/users");
      setUser(response.data);
    } catch (error) {
      console.log("Erro ao buscar usuários: ", error);
    }
  };

  const criarUsuarios = async () => {
    try {
      // Aqui você pode expandir o objeto para enviar todos os campos
      await api.post("/users", { nome, idade, filhos });
      Alert.alert("Sucesso", "Usuário criado com sucesso!");
      setIsEditing(false);
      exibirUsuarios();
    } catch (error) {
      Alert.alert("Erro", "Erro ao criar usuário.");
      console.error(error);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "Precisamos de acesso às suas fotos.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickPhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "Precisamos de acesso à câmera.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePress = () => {
    setIsEditing(!isEditing);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.mainContainer}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Meu Perfil</Text>
            <Text style={styles.subtitle}>Gerencie seus dados</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity
              style={[styles.miniButton, isEditing && styles.miniButtonActive]}
              onPress={handlePress}
            >
              <Text style={styles.miniButtonText}>
                {isEditing ? "Cancelar" : "Editar"}
              </Text>
            </TouchableOpacity>

            {isEditing && (
              <TouchableOpacity
                style={[styles.miniButton, styles.miniButtonActive]}
                onPress={criarUsuarios}
              >
                <Text style={styles.miniButtonText}>Salvar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Foto do Usuário */}
        <View style={styles.avatarWrapper}>
          <View style={styles.imageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.placeholderText}>SEM FOTO</Text>
            )}
          </View>

          {isEditing && (
            <View style={styles.photoActionsContainer}>
              <Pressable
                style={({ pressed }) => [styles.photoActionButton, pressed && styles.photoActionButtonPressed]}
                onPress={pickImage}
              >
                <FontAwesome name="photo" size={20} color="#FFF" />
              </Pressable>

              <Pressable
                style={({ pressed }) => [styles.photoActionButton, pressed && styles.photoActionButtonPressed]}
                onPress={pickPhoto}
              >
                <AntDesign name="camera" size={20} color="#FFF" />
              </Pressable>
            </View>
          )}
        </View>

        {/* Campos de Input */}
        <View style={styles.formCard}>

          <ProfileField label="Nome" value={nome} onChange={setNome} isEditing={isEditing} />
          <View style={styles.divider} />

          <ProfileField label="Idade" value={idade} onChange={setIdade} isEditing={isEditing} />
          <View style={styles.divider} />

          <ProfileField label="Filhos" value={filhos} onChange={setIfilhos} isEditing={isEditing} />
          <View style={styles.divider} />

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  miniButton: {
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  miniButtonActive: {
    backgroundColor: "#d32f2f",
    borderColor: "#ff4d4d",
  },
  miniButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
  avatarWrapper: {
    alignItems: "center",
    marginVertical: 32,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1A1A1A",
    borderWidth: 2,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderText: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  photoActionsContainer: {
    flexDirection: "row",
    marginTop: 16,
    gap: 12,
  },
  photoActionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1A1A1A",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  photoActionButtonPressed: {
    backgroundColor: "#2A2A2A",
    borderColor: "#555",
  },
  formCard: {
    backgroundColor: "#111",
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#222",
  },
  fieldContainer: {
    paddingVertical: 16,
  },
  label: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  valueText: {
    fontSize: 16,
    color: "#EEE",
    fontWeight: "500",
  },
  input: {
    fontSize: 16,
    color: "#FFF",
    backgroundColor: "#1A1A1A",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#222",
  },
});