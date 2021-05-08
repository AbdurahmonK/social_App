import React from 'react'
import Fire from '../Fire'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

export default class ProfileScreen extends React.Component {
    state = {
        user: {}
    }

    unsubscribe = null 
    componentDidMount() {
        const user = this.props.uid || Fire.shared.uid

        this.unsubscribe = Fire.shared.firestore.collection("users").doc(user).onSnapshot(doc => {
            this.setState({user: doc.data()})
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{marginTop: 64, alignItems: 'center'}}>
                    <View style={styles.avatarContainer}>
                        <Image source={this.state.user.avatar ? {uri: this.state.user.avatar} : require('../assets/avatar.jpg')} style={styles.avatar}></Image>
                    </View>
                    <Text style={styles.name}>{this.state.user.name}</Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.statAmount}>21</Text>
                        <Text style={styles.statTitle}>Posts</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statAmount}>981</Text>
                        <Text style={styles.statTitle}>Followers</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statAmount}>63</Text>
                        <Text style={styles.statTitle}>Following</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => {Fire.shared.signOut()}}>
                    <Text style={{color: '#FFF', fontWeight: '500'}}>Log Out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    avatarContainer: {
        shadowRadius: 15,
        shadowOpacity: 0.4,
        shadowColor: '#151734',
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    name: {
        fontSize: 16,
        marginTop: 24,
        fontWeight: '600'
    },
    statsContainer: {
        margin: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stat: {
        flex: 1,
        alignItems: 'center',
    },
    statAmount: {
        fontSize: 18,
        color: '#4F566D',
        fontWeight: '300'
    },
    statTitle: {
        fontSize: 12,
        marginTop: 4,
        color: '#C3C5CD',
        fontWeight: '500',
    },
    button: {
        height: 52,
        borderRadius: 4,
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E9446A',
    }
})