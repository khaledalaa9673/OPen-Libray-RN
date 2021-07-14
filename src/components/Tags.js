import React from "react"
import { Text, Button, View, TextInput, StyleSheet, ActivityIndicator, FlatList } from "react-native"
 
const Tags=(props)=>{
    return (
        <View style={{ width: "100%" }}>
        <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.tagContainer}
            keyExtractor={(item, index) => index.toString()}
            data={props.data}
            numColumns={2}
            renderItem={({ item }) => {
                return (
                    <View style={styles.tag}>
                        <Text style={styles.text}>{item.searchNumber}</Text>
                        <Text style={styles.exit} onPress={() => props.deleteHandller(item?.id)}>x</Text>
                    </View>
                )
            }}

        />
    </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        width: "100%",
        flexDirection: "row",
        flexWrap: 'wrap',
        backgroundColor: "#eeee",
        padding: 5,
    },
    searchBox: {
        width: "70%",
        height: 40,
        backgroundColor: "white",
        borderColor: "rgba(0,0,0,.5)",
        borderWidth: .5,
        borderRadius: 10,
        overflow: "hidden"
    },
    input: {
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    searchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonContainer: {
        height: 40,
        borderRadius: 10,
        overflow: "hidden",
    },
    tag: {
        width: "45%",
        minWidth: 150,
        height: 35,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,.4)",
        margin: 5,
        paddingHorizontal: 5,
        borderRadius: 5

    },
    tagContainer: {
        alignItems: "center",
        width: "100%",
    },
    text: {
        color: "white",
        fontSize: 14,
    },
    exit: {
        color: "red",
        fontSize: 22,
        marginRight: 5
    },
    card: {
        width: "100%",
        marginVertical: 15,
        backgroundColor: "white",
        color: "black",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5

    },
    cardContainer: {
        width: "100%",
        padding: 10

    }

})

export default  Tags