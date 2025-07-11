import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function index() {
  const[isOnboarding, setIsOnboarding] = useState(true)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkOnboarding = async () => {
      const isOnboarding = await AsyncStorage.getItem("onboarding");
      if (isOnboarding) {
        setIsOnboarding(false);
      }
      setLoading(false);
    };
    checkOnboarding();
  }, []);

  if (loading) return null;
  return <Redirect href={isOnboarding ? "/(routes)/onboarding" : "/(routes)/home"}/>
}