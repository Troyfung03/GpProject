import React, {useContext, useState} from 'react'
import { Input, Icon } from "@rneui/base";
import { AuthContext } from '../navigation/context';

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
// need to import these functions to make the return section available (light green color words)

export default function LoginScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // for register
    const [isNewUser, setIsNewUser] = useState(false);
    const [password2, setPassword2] = useState('');
    // for error messsage
    const [errorMessage, setErrorMessage] = useState(null);
    // Context Hook
    const { signIn, signUp } = useContext(AuthContext)

    const secondPasswordField = (
        <Input
            placeholder="Password Again"
            secureTextEntry
            returnKeyType="done"
            textContentType="password"
            containerStyle={styles.container}
            inputContainerStyle={styles.input}
            onChangeText={setPassword2}
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
        var created = false;
       
        if (isNewUser && password != password2) {
          // when register, check 2 password match
          setErrorMessage("Password does not match");
          setIsLoading(false);
          return; // if not match, return message to user and do nothing
        }
       
        if (isNewUser) {
          // Register
          // username and 2 passwords to server
          const response = await signUp({ username, password, password2 });
          created = response.created
          if (!created) {
            // display any errors from server
            setErrorMessage("Username may used, please try again");
            setIsLoading(false);
          }
        }
      
        if (!isNewUser || created){
          // Sign In
          const response = await signIn({ username, password });
          if (response) {
            setErrorMessage(response);
          }
          setIsLoading(false);
        }
    };      

    const toggleLoginButton = () => {
        setUsername("")
        setPassword("")
        setPassword2("")
        setIsNewUser(!isNewUser)
    }
   
    return (
        <ImageBackground
            source={require("../assets/images/login_bg.jpeg")}
            style={styles.bgImage}
            // defin the style of your background image
        >
          <KeyboardAvoidingView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              
              <Image
                  source={require("../assets/images/logo.png")}
                  style={styles.logo} 
              />
              
              <Input 
                  placeholder="Username"
                  returnKeyType="next"
                  textContentType="username"
                  containerStyle={styles.container}
                  inputContainerStyle={styles.input}
                  onChangeText={setUsername}
                  // when user type something, this value will be saved in the onChangeText 
                  defaultValue={username}
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
                  placeholder="Password"
                  secureTextEntry
                  returnKeyType="done"
                  textContentType="password"
                  containerStyle={styles.container}
                  inputContainerStyle={styles.input}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                  leftIcon={
                    <Icon
                      name='lock'
                      size={24}
                      color='black'
                    />  
                  }
              />
              
              {isNewUser ? secondPasswordField : null}

              {errorMessage == null ? null:
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
                  <Text style={styles.alternativeText}>{isNewUser ? "Already have account?" : "Register"}</Text>
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
    bgImage:{
      width:'100%',
      height:'100%'
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
      marginBottom: 10
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
    errorMessage: {
      color: 'red',
      marginBottom: 10,
    },
})
    
