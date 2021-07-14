
import React, { useEffect } from "react"
import { Text, View, Button, ActivityIndicator, Image } from "react-native"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

const BookDetails = ({ route }) => {
    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch(`https://openlibrary.org${route.params.url}.json`).then(res => res.json()).then(res => {
            console.log(res.description)
            return res
        })
    )



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

    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: "100%", height: 300, }}>
                <Image style={{ width: "100%", height: "100%" }} resizeMode="contain" source={{ uri: `https://covers.openlibrary.org/b/id/${data?.covers[0]}-M.jpg` }} />
            </View>

            <Text style={{ padding: 15 }}>{data ?.description.toString()}</Text>

        </View>
    )
}


export default function booksDetailsWrapper(props) {
    return (
        <QueryClientProvider client={queryClient}>
            <BookDetails {...props} />
        </QueryClientProvider>
    )
}