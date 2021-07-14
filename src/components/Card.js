import React from "react"
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native"


const Card = ({ data ,navigation}) => {
    return (
        <View style={{ width: "100%" }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.cardContainer}
                keyExtractor={(item, index) => index.toString()}
                data={data}
                numColumns={1}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.card}>
                            <View style={styles.imgContainer}>
                                <Image 
                                style={styles.img}
                                 resizeMode="center"
                                  source={{ uri: `https://covers.openlibrary.org/b/id/${item?.cover_i}-L.jpg` }} />
                            </View>
                            <View style={styles.infoContainer}>
                                <Text>Title: {item.title}</Text>
                                <Text>Auther: {item.author_name}</Text>
                                <Text>Pages count: {item.edition_count}</Text>
                                <Text>Year: {item.first_publish_year}</Text>

                            </View>
                            <View style={styles.buttonContainer} >
                                <TouchableOpacity activeOpacity={.7} onPress={() => {
                                  navigation.navigate("BookDetails", {
                                        name: item.title,
                                        url: item.text[0]
                                    })
                                }} >
                                    <Text style={{ color: "#24b8e6", fontWeight: "700", fontSize: 20, textAlign: "center" }}>View Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}

            />
        </View>
    )
}

const styles = StyleSheet.create({
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
     width:"100%",
 
    },
    buttonContainer: {
        width: "100%",
        height: 50,
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "rgba(0,0,0,.2)"
    },
    img: {
        width: "100%",
        height: 200
    },
    imgContainer:{
         width: "40%", 
         height: 200 
        },
    infoContainer: {
        width: "60%",
        height: 200,
        padding: 10
    }
})
export default Card