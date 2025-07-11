import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { scale, verticalScale } from 'react-native-size-matters'
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Audio} from "expo-av"
export default function HomeScreen() {
  const[text, settext] = useState('')
  const[isRecording, setIsRecording] = useState(false)
  const[loading, setLoading]=  useState(false)
  const[recording, setrecording]= useState()
  const[AIResponse, setAIResponse] = useState(false)

  const getMicrophonePermission = async()=>{
    try {
      const{granted} = await Audio.requestPermissionsAsync()

      if(!granted){
        Alert.alert("Permission", "Please grant the permission")
        return false
      }
      return true
    } catch (error) {
        console.log(error)
        return false
    }
  }

  const requestOptions = {
    android:{
      extension : ".wav",
      outputFormat:""
    }
  }
  const startRecording = async()=>{
    const hasPermission  = await getMicrophonePermission()
    if(!hasPermission) return;
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
      setIsRecording(true)
      const {recording} = await Audio.Recording.createAsync()
    } catch (error) {
      
    }
  }
  return (
   <LinearGradient
    colors = {["#250152", "#000"]}
    start={{x:0, y:0}}
    end ={{x:1, y:1}}
    style = {styles.container}
   >
    <StatusBar style="light" />

    {/* back shows */}
    <Image
      source = {require("@/assets/main/blur.png")}
      style = {{
        position: "absolute",
        right: scale(-15),
        top:0,
        width:scale(240)
      }}
    />
    <Image
      source = {require("@/assets/main/purpleblur.png")}
      style = {{
        position: "absolute",
        left: scale(-15),
        bottom :verticalScale(0),
        width:scale(210)
      }}
    />


  {/* header */}
  <View
  style = {{marginTop :verticalScale(-40)}} >
    <TouchableOpacity
      style = {{
        width:scale(110),
        height:scale(110),
        backgroundColor:"#fff",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:scale(100),
      }}
    >
      <FontAwesome name="microphone" size = {scale(50)}  color="#2b3356"></FontAwesome>
    </TouchableOpacity>
  </View>
  <View
    style = {{
      alignItems:"center",
      width:scale(350),
      position:"absolute",
      bottom:verticalScale(90)
    }}
  >
    <Text
      style = {{
        color:"#fff",
        fontSize:scale(16),
        width:scale(269),
        textAlign:"center",
        lineHeight:25
      }}
    >
      Press the microphone to start recording!
    </Text>
  </View>
   </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#131313",
  },
})