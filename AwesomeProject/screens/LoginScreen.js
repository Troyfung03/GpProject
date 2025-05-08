import React, { useState } from 'react'

import {
    ImageBackground,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';

import { Input, Icon } from "@rneui/base";

export default function LoginScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);
    const [password2, setPassword2] = useState(''); 
    const [errorMessage, setErrorMessage] = useState(null);


    const secondPasswordField = (
        <Input
        placeholder="PASSWORD AGAIN"
        // secureTextEntry prop used to masked the input for password input
        secureTextEntry
        returnKeyType="done"
        textContentType="password"
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={setPassword2}
        value={password2}
        autoCapitalize="none"
        leftIcon={
            <Icon
                name='lock'
                size={24}
                color='black'
            />
        }
    />
    )

    const onPressSubmit = async () => {
        setIsLoading(true);

        if (isNewUser) {
            if (password != password2) {
                setErrorMessage("Password does not match")
                setIsLoading(false);
                return;
            }
            alert("Register");
            console.log(username, password, password2);
        } else {
            alert("Login");
            console.log(username, password);
        }
        setIsLoading(false);
    }

    const toggleLoginButton =() => {
        setUsername("")
        setPassword("")
        setPassword2("")
        setIsNewUser(!isNewUser)
    }


    return (
        <ImageBackground
            source={require("../assets/images/login_bg.jpeg")}
            style={styles.bgImage}
        >
             <KeyboardAvoidingView> 
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Image
                    source={require("../assets/images/logo.png")}
                    style={styles.logo}
                />

                <Input
                    placeholder="USERNAME"
                    returnKeyType="next"
                    textContentType="username"
                    containerStyle={styles.container}
                    inputContainerStyle={styles.input}
                    underlineColorAndroid="transparent"
                    onChangeText={setUsername}
                    value={username}
                    autoCapitalize="none"
                    leftIcon={
                        <Icon
                            name='person'
                            size={24}
                            color='black'
                        />
                    }
                />
                
                <Input
                    placeholder="PASSWORD"
                    // secureTextEntry prop used to masked the input for password input
                    secureTextEntry
                    returnKeyType="done"
                    textContentType="password"
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.input}
                    underlineColorAndroid="transparent"
                    onChangeText={setPassword}
                   value={password}
                    autoCapitalize="none"
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                />
                
                {isNewUser? secondPasswordField:null}

                {errorMessage == null? null:
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                }


                <TouchableOpacity
                    disabled={isLoading}
                    style={styles.submitButton}
                    onPress={onPressSubmit}
                >
                <Text style={styles.submitText}>{isNewUser ? "REGISTER" : "LOGIN"}</Text>
                
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={isLoading}
                    style={styles.alternativeButton}
                    onPress={() => toggleLoginButton()}
                >
                <Text style={styles.alternativeButtonText}>{isNewUser? "Already have account?" : "Register"}</Text>
                </TouchableOpacity>
            </ScrollView>
            </KeyboardAvoidingView> 
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        width: '100%',
        height: "100%"
    },
    scrollView: {
        marginTop: 40,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        resizeMode: 'contain',
        width: 200,
        height: 200,
        marginBottom: 100
    },
    input: {
        paddingHorizontal: 10,
        backgroundColor: "white",
        opacity: 0.7,
        borderRadius: 15
    },
    submitButton: {
        width: 300,
        padding: 10,
        backgroundColor: "#00acc1",
        borderRadius: 15,
        marginVertical: 5,
    },
    submitText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    alternativeButton: {
        padding: 10,
        marginVertical: 5,
    },
    alternativeButtonText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    errorMessage:{
        color: 'red',
        marginBottom:10,
    },
})
