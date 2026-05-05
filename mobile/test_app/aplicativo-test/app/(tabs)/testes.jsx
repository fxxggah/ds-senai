import { StyleSheet, Text, View, Pressable, Switch, TextInput } from "react-native";
import React, { useState } from "react";

export default function Testes() {

    // View 1
    const[liked, setLiked] = useState(0)

    // View 2
    const[inscreva, setInscreva] = useState(false)

    // View 3
    const[comentario, setComentario] = useState("Sem Comentario")

    // Funcao de contar likes
    function contarLike() {
        setLiked(liked + 1)
    }

    // View 4
    const [inputComentario, setInputComentario] = useState("")
    const [mostrarComentario, setMostrarComentario] = useState("")
    const [visivel, setVisivel] = useState(false)

    function exibirComentario() {
        setVisivel(false)
        setMostrarComentario(inputComentario)
        setInputComentario("")
    }

    function excuirComentario() {
        setMostrarComentario("")
        setVisivel(false)
    }

    function cancelar() {
        setVisivel(false)
        setInputComentario("")
    }

  return (
    <View style={styles.container}>

        {/* View 1 */}
        <View style={styles.container1}>
            <Pressable onPress={contarLike} style={styles.btn}>
                <Text>Like</Text>
            </Pressable>
            <Text>{liked}</Text>
        </View>
        
        {/* View 2 */}
        <View style={styles.container2}>
            <Switch 
                value={inscreva}
                onValueChange={setInscreva}
            />
            <Text>{inscreva ? "Inscrito" : "Inscreva-se" }</Text>
        </View>
        
        {/* View 3 */}
        <View style={styles.container3}>
            <TextInput style={styles.input}/>
        </View>

        {/* View 4 */}
        <View>
            {!visivel ? (
                <Pressable style={styles.btn} onPress={() => setVisivel(true)}>
                    <Text>Comentar</Text>
                </Pressable>
            ):(
                <>
                <Text>Digite o seu comentario:</Text>
                <TextInput style={styles.input}
                    value={inputComentario}
                    onChangeText={setInputComentario}
                    placeholder="Insira aqui seu comentario"
                    autoFocus
                />
                <Pressable style={styles.btn} onPress={exibirComentario}>
                    <Text>Enviar</Text>
                </Pressable>
                <Pressable style={styles.btn}
                onPress={cancelar}>
                    <Text>Cancelar</Text>
                </Pressable>
                </>
            )}
            {mostrarComentario !== "" && (
                <>
                <Text>{mostrarComentario}</Text>
                <Pressable style={styles.btn} onPress={excuirComentario}>
                    <Text>Excluir comentario</Text>
                </Pressable>
                </>
            )}
        </View>
    </View>
  );
}

    const styles = StyleSheet.create({

        container: {
        flex: 1
        },

        container1: {
            flex: 0.25,
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10
        },

        container2: {
            flex: 0.25,
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10
        },

        container3: {
            flex: 0.25,
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10
        },

        container4: {
            flex: 0.25,
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10
        },

        btn: {
            backgroundColor: "red",
            paddingVertical: 12,
            paddingHorizontal: 25,
            borderRadius: 25,
            marginBottom: 15,

        },

        input: {
            borderWidth: 1,
            padding: 5,
            width: "80%",
            justifyContent: "center",
            alignItems: "center"
        }

    })