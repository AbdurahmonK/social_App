// import UserPermissions from '../utilities/UserPermissions'
// // const firebase = require('firebase')
// // require('firebase/firestore')

//     React.useEffect(() => {
//         UserPermissions.getPhotoPermission()
//     })

import React from 'react'
import Fire from '../Fire'
import Contants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import UserPermissions from '../utilities/UserPermissions'
import { 
    View,
    Text, 
    Image, 
    TextInput,
    StyleSheet, 
    TouchableOpacity, 
} from 'react-native'
const firebase = require('firebase')
require('firebase/firestore')

export default class PostScreen extends React.Component {
    state = {
        user: {},
        text: '',
        image: null,
    }

    unsubscribe = null 
    componentWillUnmount() {
        this.unsubscribe()
    }

    componentDidMount() {
        UserPermissions.getCameraPermission()
        const user = this.props.uid || Fire.shared.uid

        this.unsubscribe = Fire.shared.firestore.collection("users").doc(user).onSnapshot(doc => {
            this.setState({user: doc.data()})
        })
    }

    handlePost = () => {
        Fire.shared.addPost({ text: this.state.text.trim(), localUri: this.state.image}).then(ref => {
            this.setState({ text: '', image: null})
            this.props.navigation.goBack()
        }).catch(error => {
            alert(error)
        })
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })

        if(!result.cancelled) {
            this.setState({image: result.uri})
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name='md-arrow-back' size={24} color='#E9446A'></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlePost} style={{height: 30, width: 80, borderRadius: 4, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E9446A'}}>
                        <Text style={{fontWeight: '500', color: '#FFF'}}>Add Post</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Image source={this.state.user.avatar ? {uri: this.state.user.avatar} : require('../assets/avatar.jpg')} style={styles.avatar}></Image>
                    <TextInput 
                        autoFocus={true} 
                        multiline={true} 
                        numberOfLines={4} 
                        style={{flex: 1}} 
                        placeholder='Want to share something?'
                        onChangeText={text => this.setState({text})}
                        value={this.state.text}
                    ></TextInput>
                </View>

                <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                    <Ionicons name='md-camera' size={32} color='#E9446A'></Ionicons>
                </TouchableOpacity>

                <View style={{marginHorizontal: 32, marginTop: 32, height: 150}}>
                    <Image source={{ uri: this.state.image}} style={{width: '100%', height: '100%'}}></Image>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingVertical: 12,
        marginTop: 20,
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingHorizontal: 32,
        borderBottomColor: '#D8D9DB',
        justifyContent: 'space-between',
    },
    inputContainer: {
        margin: 32,
        flexDirection: 'row',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,

    },
    photo: {
        alignItems: 'flex-end',
        marginHorizontal: 32
    }

})