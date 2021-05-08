import React from 'react'
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'

let posts = [
    {
        id: 1,
        name: 'Joe McKai',
        text: 'Building JavaScript bundle: finished in 88ms. Building JavaScript bundle: finished in 88ms.',
        timestamp: 1569109273726,
        avatar: require('../assets/avatar.jpg'),
        image: require('../assets/image1.jpg')
    },
    {
        id: 2,
        name: 'John Smith',
        text: 'Building JavaScript bundle: finished in 88ms. Building JavaScript bundle: finished in 88ms.',
        timestamp: 1569109273726,
        avatar: require('../assets/avatar2.jpg'),
        image: require('../assets/image2.jpg')
    },
    {
        id: 3,
        name: 'Mack Donals',
        text: 'Building JavaScript bundle: finished in 88ms. Building JavaScript bundle: finished in 88ms.',
        timestamp: 1569109273726,
        avatar: require('../assets/avatar3.jpg'),
        image: require('../assets/image3.jpg')
    },
    {
        id: 4,
        name: 'Adam',
        text: 'Building JavaScript bundle: finished in 88ms. Building JavaScript bundle: finished in 88ms.',
        timestamp: 1569109273726,
        avatar: require('../assets/avatar.jpg'),
        image: require('../assets/image4.jpg')
    },
    {
        id: 5,
        name: 'Pak Chi Mun',
        text: 'Building JavaScript bundle: finished in 88ms. Building JavaScript bundle: finished in 88ms.',
        timestamp: 1569109273726,
        avatar: require('../assets/avatar2.jpg'),
        image: require('../assets/image5.jpg')
    },
    {
        id: 6,
        name: 'Mr Bin',
        text: 'Building JavaScript bundle: finished in 88ms. Building JavaScript bundle: finished in 88ms.',
        timestamp: 1569109273726,
        avatar: require('../assets/avatar3.jpg'),
        image: require('../assets/image6.jpg')
    },
    {
        id: 7,
        name: 'Boris Johnson',
        text: 'Building JavaScript bundle: finished in 88ms. Building JavaScript bundle: finished in 88ms.',
        timestamp: 1569109273726,
        avatar: require('../assets/avatar.jpg'),
        image: require('../assets/image7.jpg')
    },
    {
        id: 8,
        name: 'Khan',
        text: 'Building JavaScript bundle: finished in 88ms. Building JavaScript bundle: finished in 88ms.',
        timestamp: 1569109273726,
        avatar: require('../assets/avatar2.jpg'),
        image: require('../assets/image8.jpg')
    },
    {
        id: 9,
        name: 'Joe McKai',
        text: 'Building JavaScript bundle: finished in 88ms. Building JavaScript bundle: finished in 88ms.',
        timestamp: 1569109273726,
        avatar: require('../assets/avatar3.jpg'),
        image: require('../assets/image9.jpg')
    },
]

export default class HomeScreen extends React.Component {
    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <Image source={post.avatar} style={styles.avatar}></Image>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View>
                            <Text style={styles.name}>{post.name}</Text>
                            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                        </View>
                        <Ionicons name='ios-more' size={24} color='#73788B'></Ionicons>
                    </View>

                    <Text style={styles.post}>{post.text}</Text>
                    <Image source={post.image} style={styles.postImage} resizeMode='cover'/>
                    <View style={{flexDirection: 'row'}}>
                        <Ionicons name='ios-heart-empty' size={24} color='#73788B' style={{marginRight: 16}}></Ionicons>
                        <Ionicons name='ios-chatboxes' size={24} color='#73788B'></Ionicons>
                    </View>
                </View>
            </View>
        )
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Feed</Text>
                </View>

                <FlatList 
                    style={styles.feed}
                    data={posts} 
                    renderItem={({item}) => this.renderPost(item)} 
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFECF4'
    },
    header: {
        zIndex: 10,
        paddingTop: 64,
        shadowRadius: 15,
        paddingBottom: 16,
        shadowOpacity: 0.2,
        alignItems: 'center',
        borderBottomWidth: 1,
        shadowColor: '#454D65',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        shadowOffset: {height: 5},
        borderBottomColor: '#EBECF4',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        padding: 8,
        borderRadius: 5,
        marginVertical: 8,
        flexDirection: 'row',
        backgroundColor: '#FFF',
    },
    avatar: {
        width: 36,
        height: 36,
        marginRight: 16,
        borderRadius: 18,
    },
    name: {
        fontSize: 15,
        color: '#454D65',
        fontWeight: '500',
    },
    timestamp: {
        fontSize: 11,
        marginTop: 4,
        color: '#C4C6CE',
    },
    post: {
        fontSize: 14,
        marginTop: 16,
        color: '#838889'
    },
    postImage: {
        height: 150,
        borderRadius: 5,
        width: undefined,
        marginVertical: 16
    }
})