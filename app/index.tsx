import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

export default function Index() {
  function navigateToCities() {
    router.navigate('/cities')
  }

  return (
    <LinearGradient
      colors={['#00457d', '#05051f']}
      style={styles.container}
    >
      <Image source={require('../assets/images/logo.png')} />
      <Image source={require('../assets/images/weather-home.png')} />
      <Text style={styles.title}>Boas-vindas!</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToCities}>
        <Text style={styles.buttonText}>Entrar</Text>
        <MaterialIcon name="arrow-forward" size={20} color={"#01080E"} />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 64,
    paddingVertical: 79,
    paddingHorizontal: 32
  },
  title: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'Montserrat_400Regular'
  },
  button: {
    height: 40,
    width: '100%',
    backgroundColor: '#7693ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    flexDirection: 'row',
    gap: 8
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#01080E',
    fontFamily: 'Montserrat_600SemiBold'
  }
})