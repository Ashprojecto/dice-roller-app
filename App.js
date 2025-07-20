import React,{useRef, useState} from "react";
import { StyleSheet,Image,View,Text,TouchableOpacity,Animated } from "react-native";

const diceImages = {
  1: require('./assets/Images/dice-one.png'),
  2: require('./assets/Images/dice-two.png'),
  3: require('./assets/Images/dice-three.png'),
  4: require('./assets/Images/dice-four.png'),
  5: require('./assets/Images/dice-five.png'),
  6: require('./assets/Images/dice-six.png'),
}

export default function App(){
  const [diceNumber, setDiceNumber] = useState(1)
  const spinValue = useRef(new Animated.Value(0)).current
  const rollDice = ()=>{
    const randomNumber = Math.floor(Math.random()*6)+1
    Animated.timing(spinValue,{
      toValue:1,
      duration:400,
      useNativeDriver:true,
    }).start(()=>{
      spinValue.setValue(0);
      setDiceNumber(randomNumber)
    })
  }
  const spin = spinValue.interpolate({
    inputRange:[0,1],
    outputRange:['0deg','360deg']
  })
  return(
    <View style={styles.container}>
      <Animated.Image source={diceImages[diceNumber]} style={[styles.diceImage,{transform:[{perspective:1000},{rotateX:spin},{rotateY:spin}]}]}/>
      <TouchableOpacity style={styles.button} onPress={rollDice}>
        <Text style={styles.buttonText}>Roll Dice 🎲</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#eef",
    alignItems:"center",
    justifyContent:"center"
  },
  diceImage:{
    width:150,
    height:150,
    marginBottom:20,
  },
  button:{
    backgroundColor:"#4CAF50",
    paddingVertical:14,
    paddingHorizontal:30,
    borderRadius:10,
  },
  buttonText:{
    color:"#fff",
    fontSize:18,
  }
})