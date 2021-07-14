
import React, { useState, useEffect } from "react"
import { Text, Button, View, TextInput, StyleSheet,ScrollView, ActivityIndicator, FlatList, Alert } from "react-native"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import uuid from 'react-native-uuid';
import Card from "../components/Card"
 
const queryClient = new QueryClient()

const getFilteredBooks = (books, searchList) => {
    if (searchList.length === 0) {
        return books
    }
    return books ?.filter(book => {
        return book ?.isbn ?.some(num => {
            return searchList ?.find(search => {
                return search.searchNumber == num
            })
        })
    })
}

const Books = (props) => {
    const [searchText, setSearchText] = useState("")
    const [searchList, setSearchList] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])


    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch("http://openlibrary.org/search.json?author=tolkien").then(res =>
            res.json()
        ).then(res => {
            return res.docs
        })
    )

    useEffect(() => {
        setFilteredBooks(getFilteredBooks(data, searchList))
    }, [data, searchList])



    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator color="blue" size="large" />
            </View>)
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>'An error has occurred: ' + {error.message}</Text>
            </View>
        )
    }


    const addSearchTextHandler = () => {
        if (searchText.length === 10 || searchText.length === 13) {
            setSearchList(prevList => [...prevList, {
                id: uuid.v4(),
                searchNumber: searchText
            }])
            setSearchText('')
        }else {
            Alert.alert("something Wrong", "ISBN must be 10 or 13 character", [{ text: "ok", style: "destructive" }])

    }
    }
    const searchTextHandler = (text) => {

        setSearchText(text);
    }
    const deleteHandller = (id) => {
        setSearchList(list => list.filter(item => item.id != id))
    }
    return (
        <ScrollView contentContainerStyle={styles.screen}>
            <View style={styles.searchContainer} >
                <View style={styles.searchBox}>
                    <TextInput
                        placeholder="Search By ISBN"
                        style={styles.input}
                        value={searchText}
                        onChangeText={searchTextHandler}
                        maxLength={13}
                     />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="ADD to List" onPress={addSearchTextHandler} />
                </View>
            </View>
            <View style={{ width: "100%" }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.tagContainer}
                    keyExtractor={(item, index) => index.toString()}
                    data={searchList}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.tag}>
                                <Text style={styles.text}>{item.searchNumber}</Text>
                                <Text style={styles.exit} onPress={() => deleteHandller(item.id)}>x</Text>
                            </View>
                        )
                    }}

                />
            </View>
            <View style={{ width: "100%", marginTop: 10, borderBottomWidth: 2, borderBottomColor: "black", padding: 5 }}>
                <Text >Books List</Text>
                <Text>{filteredBooks ?.length}</Text>
            </View>
            <Card data={filteredBooks} navigation={props.navigation} />
        </ScrollView>

    )
}

export default function booksWrapper(props) {
    return (
        <QueryClientProvider client={queryClient}>
            <Books {...props} />
        </QueryClientProvider>
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
})