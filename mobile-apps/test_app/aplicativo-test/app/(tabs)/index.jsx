import { StyleSheet, Text, View, FlatList, Pressable, Switch } from "react-native";
import { Image } from 'expo-image';
import React, { useState } from "react";

const DATA = [
  { id: "1", title: "Athletico-PR", founded: 1924, logo: "https://cdn.freebiesupply.com/logos/large/2x/clube-atletico-paranaense-de-curitiba-pr-logo-svg-vector.svg" },
  { id: "2", title: "Atlético-MG", founded: 1908, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Atletico_mineiro_galo.png/500px-Atletico_mineiro_galo.png" },
  { id: "3", title: "Bahia", founded: 1931, logo: "https://cdn.freebiesupply.com/logos/large/2x/esporte-clube-bahia-de-salvador-ba-logo-svg-vector.svg" },
  { id: "4", title: "Botafogo", founded: 1894, logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Escudo_Botafogo.png" },
  { id: "5", title: "Chapecoense", founded: 1914, logo: "https://logodownload.org/wp-content/uploads/2016/09/chapecoense-logo-escudo-shield-1.png" },
  { id: "6", title: "Corinthians", founded: 1910, logo: "https://i0.wp.com/dreamleaguesoccer.com.br/wp-content/uploads/2016/11/escudo-Corinthians.png?fit=512%2C512&ssl=1" },
  { id: "7", title: "Cruzeiro", founded: 1921, logo: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Logo_Cruzeiro_1996.png" },
  { id: "8", title: "Coritiba", founded: 2001, logo: "https://logodetimes.com/times/coritiba/logo-coritiba-4096.png" },
  { id: "9", title: "Flamengo", founded: 1895, logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Logo_Flamengo_crest_1980-2018.png" },
  { id: "10", title: "Fluminense", founded: 1902, logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Fluminense_FC_escudo.png" },
  { id: "11", title: "Fortaleza", founded: 1918, logo: "https://upload.wikimedia.org/wikipedia/commons/5/5a/FortalezaEsporteClube.png" },
  { id: "12", title: "Grêmio", founded: 1903, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Gremio_logo.svg/1280px-Gremio_logo.svg.png" },
  { id: "13", title: "Internacional", founded: 1909, logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Escudo_do_Sport_Club_Internacional.svg" },
  { id: "14", title: "Remo", founded: 1913, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Clube_do_Remo.svg/1280px-Clube_do_Remo.svg.png" },
  { id: "15", title: "Mirassol", founded: 1925, logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Mirassol_FC_logo.png" },
  { id: "16", title: "Palmeiras", founded: 1914, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/3840px-Palmeiras_logo.svg.png" },
  { id: "17", title: "RB Bragantino", founded: 1928, logo: "https://assets.football-logos.cc/logos/brazil/700x700/rb-bragantino.f30e620c.png" },
  { id: "18", title: "Santos", founded: 1912, logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/LogoSantosFC.png" },
  { id: "19", title: "São Paulo", founded: 1930, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/960px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png" },
  { id: "20", title: "Vitória", founded: 1899, logo: "https://cdn.freebiesupply.com/logos/thumbs/2x/esporte-clube-vitoria-de-salvador-ba-logo.png" }
];

// Componente que representa cada card do time
const Item = ({ title, founded, logo }) => {
  const [inscreva, setInscreva] = useState(false);
  const [like, setLike] = useState(0);

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: logo }}
          contentFit="contain"
        />
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <Text style={styles.founded}>
        Fundado em {founded}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statText}>
            {inscreva ? "✅" : "➕"}
          </Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statText}>
            🎉 {like}
          </Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <View style={styles.switchContainer}>
          <Switch
            value={inscreva}
            onValueChange={setInscreva}
            // Cores do Switch para combinar com o novo tema
            trackColor={{ false: "#CBD5E1", true: "#10B981" }}
            thumbColor={"#FFF"}
          />
          <Text style={styles.switchText}>
            {inscreva ? "Seguindo" : "Seguir"}
          </Text>
        </View>

        <Pressable
          onPress={() => setLike(like + 1)}
          style={({ pressed }) => [
            styles.btn,
            styles.btnLike,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.btnTextSmall}>Torcer</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default function Index() {
  return (
    <View style={styles.container}>
        <Text style={styles.headerTitle}>Brasileirão Série A</Text>
      <FlatList   
        data={DATA}
        numColumns={2}
        key={"grid-2"}
        renderItem={({ item }) => <Item title={item.title} founded={item.founded} logo={item.logo} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A', // mainContainer background
    paddingTop: 60,
  },

  headerTitle: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    color: '#FFFFFF', // title color
    marginBottom: 20,
    letterSpacing: -1,
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: '#111', // formCard background
    flex: 1,
    margin: 10,
    borderRadius: 24,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#222', // formCard border
    // Sombras adaptadas para o modo escuro (mais sutis)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },

  imageContainer: {
    backgroundColor: '#1A1A1A', // imageContainer/miniButton background
    padding: 14,
    borderRadius: 100,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#333', // imageContainer border
  },

  image: {
    width: 80,
    height: 80,
  },

  title: {
    fontSize: 17,
    fontWeight: "800",
    color: '#FFFFFF', // title color
    textAlign: "center",
  },

  founded: {
    fontSize: 12,
    color: '#666', // subtitle color
    marginBottom: 14,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 14,
  },

  statBox: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#1A1A1A', // input/miniButton background
    borderRadius: 12,
    paddingVertical: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#333',
  },

  statText: {
    fontSize: 13,
    fontWeight: "800",
    color: '#EEE', // valueText color
  },

  buttonRow: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
  },

  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  btnLike: {
    backgroundColor: '#1A1A1A', // miniButton background
    borderColor: '#333', // miniButton border
  },

  btnTextSmall: {
    color: '#FFF', // miniButtonText color
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  pressed: {
    opacity: 0.85,
    backgroundColor: '#d32f2f', // miniButtonActive background
    borderColor: '#ff4d4d', // miniButtonActive border
  },

  switchContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  switchText: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "700",
    color: '#888', // label color
  },
});