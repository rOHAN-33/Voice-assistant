// import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
// import React, { useState } from 'react'
// import { LinearGradient } from 'expo-linear-gradient'
// import { StatusBar } from 'expo-status-bar'
// import { scale, verticalScale } from 'react-native-size-matters'
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import {Audio} from "expo-av"
// import axios from 'axios'
// import LottieView from 'lottie-react-native';
// export default function HomeScreen() {
//   const[text, setText] = useState('')
//   const[isRecording, setIsRecording] = useState(false)
//   const[loading, setLoading]=  useState(false)
//   const[recording, setRecording]= useState<Audio.Recording>()
//   const[AIResponse, setAIResponse] = useState(false)

//   const getMicrophonePermission = async()=>{
//     try {
//       const{granted} = await Audio.requestPermissionsAsync()

//       if(!granted){
//         Alert.alert("Permission", "Please grant the permission")
//         return false
//       }
//       return true
//     } catch (error) {
//         console.log(error)
//         return false
//     }
//   }

//   const recordingOptions:any = {
//     android:{
//       extension : ".wav",
//       outputFormat:Audio.AndroidOutputFormat.MPEG_4,
//       androidEncoder : Audio.AndroidAudioEncoder.AAC,
//       sampleRate:44100,
//       numberOfChannels:2,
//       bitrate:128000
//     },
//      ios: {
//       extension: ".wav",
//       audioQuality: Audio.IOSAudioQuality.HIGH,
//       sampleRate: 44100,
//       numberOfChannels: 2,
//       bitRate: 128000,
//       linearPCMBitDepth: 16,
//       linearPCMIsBigEndian: false,
//       linearPCMIsFloat: false,
//     },
//   }
//   const startRecording = async()=>{
//     const hasPermission  = await getMicrophonePermission()
//     if(!hasPermission) return;
//     try {
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       })
//       setIsRecording(true)
//       const {recording} = await Audio.Recording.createAsync(recordingOptions)
//       setRecording(recording)
//     } catch (error) {
//       console.log("failed to start recording, error")
//       Alert.alert("error","failed to start recording")
//     }
//   }
//   const stopRecording = async () => {
//     try {
//       setIsRecording(false);
//       setLoading(true);
//       await recording?.stopAndUnloadAsync();
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: false,
//       });

//       const uri = recording?.getURI();

//       // send audio to whisper API for transcription
//       const transcript = await sendAudioToWhisper(uri!);

//       setText(transcript);

//       // send the transcript to gpt-4 API for response
//       // await sendToGpt(transcript);
//     } catch (error) {
//       console.log("Failed to stop Recording", error);
//       Alert.alert("Error", "Failed to stop recording");
//     }
//   };
//     const sendAudioToWhisper = async (uri: string) => {
//     try {
//       const formData: any = new FormData();
//       formData.append("file", {
//         uri,
//         type: "audio/wav",
//         name: "recording.wav",
//       });
//       formData.append("model", "whisper-1");

//       const response = await axios.post(
//         "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_GEMINI_API_KEY}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       return response.data.text;
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//    <LinearGradient
//     colors = {["#250152", "#000"]}
//     start={{x:0, y:0}}
//     end ={{x:1, y:1}}
//     style = {styles.container}
//    >
//     <StatusBar style="light" />

//     {/* back shows */}
//     <Image
//       source = {require("@/assets/main/blur.png")}
//       style = {{
//         position: "absolute",
//         right: scale(-15),
//         top:0,
//         width:scale(240)
//       }}
//     />
//     <Image
//       source = {require("@/assets/main/purpleblur.png")}
//       style = {{
//         position: "absolute",
//         left: scale(-15),
//         bottom :verticalScale(0),
//         width:scale(210)
//       }}
//     />


//   {/* header */}
//   <View
//   style = {{marginTop :verticalScale(-40)}} >
//     {!isRecording ?(
//       <>
//       <TouchableOpacity
//       style = {{
//         width:scale(110),
//         height:scale(110),
//         backgroundColor:"#fff",
//         flexDirection:"row",
//         alignItems:"center",
//         justifyContent:"center",
//         borderRadius:scale(100),
//       }}
//       onPress={startRecording}
//     >
//       <FontAwesome name="microphone" size = {scale(50)}  color="#2b3356"></FontAwesome>
//     </TouchableOpacity>
//       </>
//     ):(
//       <TouchableOpacity
      
//       onPress={stopRecording}
//     >
//       <LottieView
//       source={require("@/assets/animation/animation.json")}
//       autoPlay
//       loop
//       speed={1.3}
//       style = {{width:scale(250), height:scale(250)}}
//       />
//     </TouchableOpacity>
//     )}
    
//   </View>
//   <View
//     style = {{
//       alignItems:"center",
//       width:scale(350),
//       position:"absolute",
//       bottom:verticalScale(90)
//     }}
//   >
//     <Text
//       style = {{
//         color:"#fff",
//         fontSize:scale(16),
//         width:scale(269),
//         textAlign:"center",
//         lineHeight:25
//       }}
//     >
//       Press the microphone to start recording!
//     </Text>
//   </View>
//    </LinearGradient>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#131313",
//   },
// })















import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { scale, verticalScale } from 'react-native-size-matters'
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import axios from 'axios'
import LottieView from 'lottie-react-native';

export default function HomeScreen() {
  const [text, setText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [loading, setLoading] = useState(false)
  const [AIResponse, setAIResponse] = useState('')
  const [recording, setRecording] = useState(null);

  useEffect(() => {
    // Request audio permissions when component mounts
    requestAudioPermissions();
    
    return () => {
      // Cleanup recording if it exists
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  const requestAudioPermissions = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Audio recording permission is required for voice recognition.');
        return false;
      }
      
      // Configure audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      
      return true;
    } catch (error) {
      console.log('Permission error:', error);
      return false;
    }
  };

  const startListening = async () => {
    const hasPermission = await requestAudioPermissions();
    if (!hasPermission) return;

    try {
      console.log('Starting recording...');
      setIsListening(true);
      setText('');
      setAIResponse('');

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      console.log('Recording started');
      
      // Auto-stop after 10 seconds (you can adjust this)
      setTimeout(() => {
        if (isListening) {
          stopListening();
        }
      }, 10000);
      
    } catch (error) {
      console.log('Failed to start recording:', error);
      setIsListening(false);
      Alert.alert('Error', 'Failed to start recording: ' + error.message);
    }
  };

  const stopListening = async () => {
    if (!recording) return;

    try {
      console.log('Stopping recording...');
      setIsListening(false);
      
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);
      
      setRecording(null);
      
      // Since we can't do speech-to-text directly in Expo managed workflow,
      // we'll simulate it or use a different approach
      const simulatedText = "Hello, how can I help you today?";
      setText(simulatedText);
      await sendToGemini(simulatedText);
      
    } catch (error) {
      console.log('Failed to stop recording:', error);
      Alert.alert('Error', 'Failed to stop recording: ' + error.message);
    }
  };

  // Alternative: Use a text input approach
  const handleTextInput = async (inputText) => {
    if (!inputText.trim()) return;
    
    setText(inputText);
    await sendToGemini(inputText);
  };

  const sendToGemini = async (transcript) => {
    if (!transcript.trim()) return;
    
    console.log('Sending to Gemini:', transcript);
    
    try {
      setLoading(true);
      
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.EXPO_PUBLIC_GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [{
              text: `You are a helpful voice assistant. Keep responses concise and conversational. User said: "${transcript}"`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 150,
            topP: 0.8,
            topK: 10
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      const aiResponse = response.data.candidates[0].content.parts[0].text;
      console.log('AI Response:', aiResponse);
      setAIResponse(aiResponse);
      
      // Speak the response
      Speech.speak(aiResponse, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.9
      });
      
    } catch (error) {
      console.log('Gemini API error:', error.response?.data || error.message);
      Alert.alert("Error", "Failed to get AI response. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleMicPress = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // For demonstration, let's add some quick test buttons
  const testPhrases = [
    "What's the weather like?",
    "Tell me a joke",
    "How are you today?",
    "What can you do?"
  ];

  return (
    <LinearGradient
      colors={["#250152", "#000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar style="light" />

      {/* Background images */}
      <Image
        source={require("@/assets/main/blur.png")}
        style={{
          position: "absolute",
          right: scale(-15),
          top: 0,
          width: scale(240)
        }}
      />
      <Image
        source={require("@/assets/main/purpleblur.png")}
        style={{
          position: "absolute",
          left: scale(-15),
          bottom: verticalScale(0),
          width: scale(210)
        }}
      />

      {/* Header */}
      <View style={{ marginTop: verticalScale(-40) }}>
        {!isListening ? (
          <>
            <TouchableOpacity
              style={{
                width: scale(110),
                height: scale(110),
                backgroundColor: "#fff",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(100),
              }}
              onPress={handleMicPress}
            >
              <FontAwesome name="microphone" size={scale(50)} color="#2b3356" />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={handleMicPress}>
            <LottieView
              source={require("@/assets/animation/animation.json")}
              autoPlay
              loop
              speed={1.3}
              style={{ width: scale(250), height: scale(250) }}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Test Buttons for now */}
      <View style={styles.testButtonsContainer}>
        <Text style={styles.testTitle}>Quick Test (Tap to try):</Text>
        {testPhrases.map((phrase, index) => (
          <TouchableOpacity
            key={index}
            style={styles.testButton}
            onPress={() => handleTextInput(phrase)}
          >
            <Text style={styles.testButtonText}>{phrase}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Text Display */}
      {text ? (
        <View style={styles.textContainer}>
          <Text style={styles.userText}>You said: {text}</Text>
        </View>
      ) : null}

      {/* AI Response Display */}
      {AIResponse ? (
        <View style={styles.textContainer}>
          <Text style={styles.aiText}>AI: {AIResponse}</Text>
        </View>
      ) : null}

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}

      {/* Bottom instruction */}
      <View
        style={{
          alignItems: "center",
          width: scale(350),
          position: "absolute",
          bottom: verticalScale(90)
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: scale(16),
            width: scale(269),
            textAlign: "center",
            lineHeight: 25
          }}
        >
          {isListening ? "Recording... Tap to stop" : "Press microphone to record or try quick tests above"}
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
  textContainer: {
    marginTop: verticalScale(20),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: scale(10),
    maxWidth: scale(300),
  },
  userText: {
    color: "#fff",
    fontSize: scale(14),
    textAlign: "center",
    marginBottom: verticalScale(5),
  },
  aiText: {
    color: "#00ff88",
    fontSize: scale(14),
    textAlign: "center",
    fontWeight: "bold",
  },
  loadingContainer: {
    marginTop: verticalScale(20),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
  },
  loadingText: {
    color: "#fff",
    fontSize: scale(14),
    textAlign: "center",
    opacity: 0.7,
  },
  testButtonsContainer: {
    marginTop: verticalScale(20),
    alignItems: 'center',
  },
  testTitle: {
    color: "#fff",
    fontSize: scale(12),
    marginBottom: verticalScale(10),
  },
  testButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(8),
    borderRadius: scale(15),
    marginVertical: verticalScale(3),
  },
  testButtonText: {
    color: "#fff",
    fontSize: scale(11),
  },
});