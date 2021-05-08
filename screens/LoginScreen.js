//

//         <View style={styles.container}>
//             <StatusBar barStyle='light-content'></StatusBar>
//             <Image source={require('../assets/auth1.png')} style={{position: 'absolute', bottom: 325, right: -425}}></Image>
//             <Image source={require('../assets/auth1.png')} style={{position: 'absolute', bottom: -555, right: -525}}></Image>
//             <Image source={require('../assets/logo.png')} style={{alignSelf: 'center', width: 70, height: 70}}></Image>
//         </View>

import React from 'react'
import * as firebase from 'firebase'
import { 
    View, 
    Text, 
    Image, 
    StatusBar, 
    TextInput, 
    StyleSheet, 
    LayoutAnimation, 
    TouchableOpacity 
} from 'react-native'

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    state = {
        email: '',
        password: '',
        errorMessage: null
    }

    handleLogin = () => {
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => this.setState({errorMessage: error.message}))
    }

    render () {
        LayoutAnimation.easeInEaseOut()
        
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content'></StatusBar>
                <Image source={require('../assets/auth1.png')} style={{marginTop: -470, marginLeft: -50}}></Image>
                {/* <Image source={require('../assets/auth1.png')} style={{position: 'absolute', bottom: -500, right: -350}}></Image> */}
                <Image source={require('../assets/logo.png')} style={{alignSelf: 'center', width: 70, height: 70}}></Image>
                <Text style={styles.greeting}>
                    {`Hello again.\nWelcome back.`}
                </Text>

                <View style={styles.errorMessage}>
                    <Text>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </Text>
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize='none'
                            value={this.state.email}
                            onChangeText={email => this.setState({email})}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput 
                            secureTextEntry 
                            style={styles.input} 
                            autoCapitalize='none'
                            value={this.state.password}
                            onChangeText={password => this.setState({password})}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{color: '#FFF', fontWeight: '500'}}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf: 'center', marginTop: 22}} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={{color: '#414959', fontSize: 13}}>
                        New to SocialApp? <Text style={{color: '#E9446A', fontWeight: '500'}}>Sign Up</Text>
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
        // marginTop: -32,
        fontWeight: "400",
        textAlign: 'center',
    },
    errorMessage: {
        height: 72,
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
        marginBottom: 40,
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
    }

})