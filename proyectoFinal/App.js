import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';

export default function App() {
  return (
    <View styles={style.container}>
      <StackNavigation/>
    </View>
  );
}

const style = StyleSheet.create({
  container:{
    flex: 1
  }
})

