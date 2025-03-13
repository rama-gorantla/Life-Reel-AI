import { Image,View, StyleSheet, Platform } from 'react-native';
import LandingScreen from './landingPage';
import OnboardingScreen from './onBoardingScreen';



export default function HomeScreen() {
  return (
     <View>
        <OnboardingScreen></OnboardingScreen>
     </View>
  );
}


