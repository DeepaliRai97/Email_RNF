import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Button,Alert,ImageBackground } from 'react-native';
//const { Navigation } = require('react-native-navigation');
//import * as firebase from 'firebase';
import auth from '@react-native-firebase/auth';
const SignIn = ({navigation}) => {
    
    const [useremail, setUserEmail] = useState('');
    const [userpassword, setUserPassword] = useState('');
    
    
const userSignIn = (email,password) => {
 auth().signInWithEmailAndPassword(email, password).then(() => {
    console.log('User account created & signed in!');
    console.log(email,password)
    Alert.alert('SSS');
    navigation.navigate('Home')

  }).catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
      console.log(error)
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  })
}
    /*const userSignIn=(email,password) => {
        console.log(useremail)
        firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
            Navigation.push(props.componentId, {
                component: {
                  name: 'Home'
                }
              })
        }).catch(error=>{Alert.alert(error.message)})
     }*/

return (
    <View style={styles.container}>
    <View style={styles.header}>
    <Text style={styles.text_header}>Make <Image source={require('../assets/images/logo.jpg')} 
         style={{height: 80, width: 70,borderRadius:50,marginLeft:20}}/> Trip !</Text>
    </View>
    <View style={styles.footer}>
    <View style={styles.action}>
    <TextInput 
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => setUserEmail(email)} />
    </View>
    <View style={styles.action}>
       <TextInput 
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
          onChangeText={password => setUserPassword(password)} />
    </View>
    <View style={styles.button}>
        <TouchableOpacity  onPress={()=>userSignIn(useremail,userpassword)}
          style={styles.signIn}>
          <Text style={styles.textSign}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
        <Text style={styles.textSignUp}>Don't Have an Account? Let's Sign Up</Text>
        </TouchableOpacity>
    </View>
    </View>
  </View>
)
}

    
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#003366'
    },
    header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50,
    },
    footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    text_header: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    text_footer: {
      color: '#05375a',
      fontSize: 18,
      marginTop: 35
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a'
    },
    button: {
      alignItems: 'center',
      marginTop: 50,
    },
    signIn: {
      borderWidth: 40,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: '#003366',
      marginTop: 15
    },
    textSign: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#fff'
    },
    signUp:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    textSignUp:{
        color:'black',
        fontWeight:'bold',
        fontSize:15
    }
})

export default SignIn;

/*style={styles.signUp} onPress={()=>{ Navigation.push(props.componentId, {
                component: {
                  name: 'SignUp'
                }
              })}} */