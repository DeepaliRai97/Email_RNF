import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet, FlatList } from 'react-native';
import firebase from 'react-native-firebase';
import AsyncStorage from "@react-native-community/async-storage"

export default class newPhoneSign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      otp: "",
      user: null,
      confirmResult: null,
    }
  }
  async UNSAFE_componentWillMount(){
    const confirmResult= await AsyncStorage.getItem("@confirmResult");
    const user= await AsyncStorage.getItem("@user");
    if(confirmResult!==null&&user!==null)
    { const jsonConfirmRes= JSON.parse(confirmResult);
      const jsonUser=JSON.parse(user)
      this.setState({confirmResult:jsonConfirmRes,user:jsonUser});
    }
  }
  getOtp = async mobile => {
    try {
      const confirmResult = await firebase.auth().signInWithPhoneNumber(mobile);
      this.setState({ confirmResult })
      await AsyncStorage.setItem("@confirmResult",JSON.stringify(confirmResult))
    }
    catch(error){
      alert(error)
    }
   
  }
  verifyOtp = async (confirmResult,otp) =>{
    try{
     const user= await confirmResult.confirm(otp);
     this.setState({user})
     await AsyncStorage.setItem("@user",JSON.stringify(user))
    }
    catch(error){
     alert(error)
    }
  } 
  signOut = async () => {
    try{
      await firebase.auth().signOut();
      await AsyncStorage.removeItem("@confirmResult");
      await AsyncStorage.removeItem("@user")
      this.setState({
        mobile: "",
        otp: "",
        user: null,
        confirmResult: null,
      })
    }
    catch(error){
     alert(error)
    }
  }
  render() {
    const {confirmResult,mobile,otp,user} =this.state;
    return (
      <View style={styles.container}>
      {!confirmResult &&<><TextInput placeholder="mobile no." style={styles.input} value={mobile} onChangeText={(value) => this.setState({ mobile: value })} /><Button title="get OTP" onPress={() => this.getOtp(mobile)} /></>}
      {confirmResult&&!user&&<><TextInput placeholder="otp" keyboardType="number-pad" style={styles.input} value={otp} onChangeText={(value) => this.setState({ otp: value })} /><Button title="Login" onPress={() => this.verifyOtp(confirmResult,otp)} /></>}
    {confirmResult&&user&&<>{console.log(user)}
      <Button title="signOut" onPress={()=>this.signOut()}/></>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "green"
  }
})