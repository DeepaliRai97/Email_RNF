import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';


const Home = ({navigation}) => {
 const userSignOut=()=>{
  auth().signOut()
  .then(() => console.log('User signed out!'));
  navigation.navigate('SignIn')
  }
return (
        <View style={styles.container}>
        <Text>Offers</Text>
        <TouchableOpacity  onPress={()=>userSignOut()}
          style={styles.signIn}>
          <Text style={styles.textSign}>Sign OUT</Text>
        </TouchableOpacity>
        </View>
        
      );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
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
  });

  export default Home;

  