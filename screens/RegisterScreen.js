import React from 'react'
import Fire from '../Fire'
// import * as firebase from 'firebase'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import UserPermissions from '../utilities/UserPermissions'
import { 
    View, 
    Text, 
    Image, 
    StatusBar, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity 
} from 'react-native'

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    state = {
        user: {
            name: '',
            email: '',
            avatar: null,
            password: '',
        },
        errorMessage: null
    }

    handlePickAvatar = async () => {
        UserPermissions.getCameraPermission()
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })

        if(!result.cancelled) {
            this.setState({user: {...this.state.user, avatar: result.uri}})
        }
    } 

    handleSignUp = () => {
        // const { email, password, name } = this.state
        Fire.shared.createUser(this.state.user)
        // firebase
        //     .auth()
        //     .signInWithEmailAndPassword(email, password)
        //     .then(userCredentials => {
        //         return userCredentials.user.updateProfile({
        //             displayName: name
        //         })
        //     })
        //     .catch(error => this.setState({errorMessage: error.message}))
    }

    render () {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content'></StatusBar>
                <Image source={require('../assets/auth1.png')} style={{marginTop: -480, marginLeft: -50}}></Image>
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name='ios-arrow-round-back' size={32} color='#FFF'></Ionicons>
                </TouchableOpacity>

                <View style={{position: 'absolute', alignItems: 'center', width: '100%'}}>
                    <Text style={styles.greeting}>{`Hi.\nSign Up to get started!`}</Text>
                    <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                        <Image source={{ uri: this.state.user.avatar}} style={styles.avatar}></Image>
                        <Ionicons name='ios-add' size={30} color='#FFF'></Ionicons>
                    </TouchableOpacity>
                </View>

                <View style={styles.errorMessage}>
                    <Text>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </Text>
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full name</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize='none'
                            value={this.state.user.name}
                            onChangeText={name => this.setState({user: {...this.state.user, name}})}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize='none'
                            value={this.state.user.email}
                            onChangeText={email => this.setState({user: {...this.state.user, email}})}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput 
                            secureTextEntry 
                            style={styles.input} 
                            autoCapitalize='none'
                            value={this.state.user.password}
                            onChangeText={password => this.setState({user: {...this.state.user, password}})}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{color: '#FFF', fontWeight: '500'}}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf: 'center', marginTop: 32}} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={{color: '#414959', fontSize: 13}}>
                        Already have an Account? <Text style={{color: '#E9446A', fontWeight: '500'}}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        fontSize: 18,
        marginTop: 12,
        color: '#FFF',
        fontWeight: "400",
        textAlign: 'center',
    },
    errorMessage: {
        height: 45,
        marginTop: 60,
        alignItems: 'center',
        marginHorizontal: 30,
        justifyContent: 'center',
    },
    error: {
        fontSize: 13,
        color: '#E9446A',
        fontWeight: '600',
        textAlign: 'center',
    },
    form: {
        marginBottom: 50,
        marginHorizontal: 30
    },
    inputTitle: {
        fontSize: 10,
        color: '#BABF9E',
        textTransform: 'uppercase'
    },
    input: {
        height: 40,
        fontSize: 15,
        color: '#161F3D',
        borderBottomColor: '#BABF9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    button: {
        height: 52,
        borderRadius: 4,
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E9446A',
    },
    back: {
        top: 32,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E9446A',
        // backgroundColor: 'rgba(21, 22, 48, 0.1)'
    },
    avatar: {
        width: 70,
        height: 70,
        marginTop: 18,
        borderRadius: 35,
        position: 'absolute',
    },
    avatarPlaceholder: {
        width: 70,
        height: 70,
        marginTop: 18,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E9446A',
    }

})