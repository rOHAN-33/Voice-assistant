import { StyleSheet, Text, View,ScrollView, NativeSyntheticEvent, NativeScrollEvent, Dimensions ,Pressable} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import OnBoarding1 from '@/assets/svgs/onboarding1';
import { onBoardingData } from '@/config/constans';
import AntDesign from '@expo/vector-icons/AntDesign';
// import {  } from 'react-native-reanimated/lib/typescript/Animated';
import { useState , useRef} from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from 'expo-router';
export default function OnBoardingScreen() {

   const [activeIndex, setActiveIndex] = useState(0);
   const scrollViewRef = useRef<ScrollView>(null);

     const handleSkip = async () => {
    const nextIndex = activeIndex + 1;

    if(nextIndex < onBoardingData.length){
      scrollViewRef.current?.scrollTo({
        x: Dimensions.get("window").width * nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    } else {
      await AsyncStorage.setItem('onboarding','true');
      router.push('/(routes)/home')
    }
  }
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(
      contentOffsetX / event.nativeEvent.layoutMeasurement.width
    );
    setActiveIndex(currentIndex);
  };
  return (
    <LinearGradient
      colors={['#250152','#000000']}
      start={{x:0 , y:0}}
      end={{x:1 , y:1}}
      style = {styles.container}
    >
      <StatusBar style="light" />
      <Pressable
        style={styles.skipContainer}
        onPress={handleSkip}
      >
        <Text style={styles.skipText}>Skip</Text>
        <AntDesign name="arrowright" size={scale(18)} color="white" />
      </Pressable>
      {/* <OnBoarding1></OnBoarding1> */}
      <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator = {false}
      onScroll={handleScroll}
      ref ={scrollViewRef}
      >
        {onBoardingData.map((item:onBoardingDataType,index:number)=>(
        <View key={index} style = {styles.slide}>
          {item.image}
          <Text style = {styles.title}>{item.title}</Text>
          <Text style = {styles.subtitle}>{item.subtitle}</Text>
        </View>
      ))}
      </ScrollView>
      <View style = {styles.paginationContainer}>
        {onBoardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                opacity: activeIndex === index ? 1 : 0.3,
              },
            ]}
          />
        ))}
      </View>
        
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide : {
    width : Dimensions.get("window").width,
    justifyContent : "center",
    alignItems : "center",

  },
  title:{
    color:"#fff",
    fontSize: scale(25),
    textAlign :"center",
    // fontWeight : "500"
  },
  subtitle:{
    width:scale(250),
    marginHorizontal : "auto" ,
  color:"#9A9999",
    fontSize: scale(14),
    textAlign :"center",
    padding:verticalScale(10)
  },
  paginationContainer:{
     position: "absolute",
    bottom: verticalScale(70),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(8),
  },
   dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: 100,
    backgroundColor: "#fff",
    marginHorizontal: scale(2),
  },
  skipContainer:{
    position: "absolute",
    top: verticalScale(45),
    right: scale(30),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
    zIndex: 100,
  },
  skipText: {
    color: "#fff",
    fontSize: scale(16),
    fontFamily: "SegoeUI",
    fontWeight: "400",
  },
});