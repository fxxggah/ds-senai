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
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import api from "../../service/api"

export default function ProfileScreen() {
  const [user, setUser] = useState([])

  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState("");
  const [nickname, setNickname] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("");
  const [bio, setBio] = useState("");

  const criarUsuarios = async () => {
    try {
      await api.post("/users", {nome})
      Alert.alert("Usuario criado com sucesso")
      setNome("")
      exibirUsuarios( )
    } catch (error) {
      console.log("Erro: ", error)
    }
  }

  const exibirUsuarios = async () => {
    try {
      const response = await api.get("/users")
      setUser(response.data)
    } catch (error) {
      console.log("Erro: ", error)
    }
  }

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "É necessária permissão",
        "É preciso ter permissão para acessar a biblioteca de mídia.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
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
      Alert.alert(
        "É necessária permissão",
        "É preciso ter permissão para acessar a Câmera.",
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
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

  const ProfileField = ({ label, value, onChange }) => (
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
        <Text style={styles.valueText}>{value}</Text>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
          <TouchableOpacity
            style={[styles.miniButton, isEditing && styles.miniButtonActive]}
            onPress={handlePress}
          >
            <Text style={styles.miniButtonText}>
              {isEditing ? "Salvar" : "Editar"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sessão do usuário */}
        <View style={styles.avatarWrapper}>
          <View style={styles.imageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.placeholderText}>SEM FOTO</Text>
            )}
          </View>

          {/* Botões de Ação para a Foto usando Pressable */}
          {isEditing && (
            <View style={styles.photoActionsContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.photoActionButton,
                  pressed && styles.photoActionButtonPressed,
                ]}
                onPress={pickImage}
              >
                <FontAwesome name="photo" size={20} color="#FFF" />
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.photoActionButton,
                  pressed && styles.photoActionButtonPressed,
                ]}
                onPress={pickPhoto}
              >
                <AntDesign name="camera" size={20} color="#FFF" />
              </Pressable>
            </View>
          )}
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          <ProfileField label="Nome Completo" value={nome} onChange={setNome} />
          <View style={styles.divider} />

          <ProfileField
            label="Nome de Exibição"
            value={nickname}
            onChange={setNickname}
          />
          <View style={styles.divider} />

          <ProfileField label="Idade" value={idade} onChange={setIdade} />
          <View style={styles.divider} />

          <ProfileField label="Gênero" value={sexo} onChange={setSexo} />
          <View style={styles.divider} />

          <ProfileField label="Biografia" value={bio} onChange={setBio} />
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
  photoActionText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
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
