import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Svg, { Path } from 'react-native-svg';

const PunchInOutScreen = ({ navigation }) => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [history, setHistory] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPunchedIn) {
      setStartTime(new Date());
      intervalRef.current = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      setElapsedTime(0);
      setHistory((prevHistory) => [
        ...prevHistory,
        { punchType: 'Out', timestamp: new Date() },
      ]);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPunchedIn]);

  const handlePunch = () => {
    setIsPunchedIn(!isPunchedIn);
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isPunchedIn ? 'Punched In' : 'Punched Out'}</Text>
      <Text style={styles.time}>{formatTime(elapsedTime)}</Text>
      <TouchableOpacity style={[ styles.button ,styles.PunchInButton ]} onPress={handlePunch}>
        <Svg height="30" width="30" viewBox="0 0 24 24">
          <Path
            fill={isPunchedIn ? '#e74c3c' : '#2ecc71'}
            
            d={isPunchedIn ? 'M9 16.17L4.83 12l-1.41 1.41L9 18 21 6l-1.41-1.41L9 16.17z' : 'M21 12l-8.61-8.61L9 5.83 16.17 13 9 20.17l1.41 1.41L21 12z'}
          />
        </Svg>
        <Text style={styles.buttonText}>{isPunchedIn ? 'Punch Out' : 'Punch In'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => navigation.navigate('History', { history })}
      >
        <Svg height="30" width="30" viewBox="0 0 24 24">
          <Path fill="#fff" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-6h2v6zm0-8h-2V7h2v1z" />
        </Svg>
        <Text style={styles.historyButtonText}>View History</Text>
      </TouchableOpacity>
    </View>
  );
};

const HistoryScreen = ({ route }) => {
  const { history } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.historyTitle}>Punch History</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={{
              fontSize:18,
              padding:10
            }}>{`${item.punchType} - ${item.timestamp.toLocaleString()}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="PunchInOut">
        <Stack.Screen name="PunchInOut" component={PunchInOutScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  time: {
    fontSize: 40,
    marginBottom: 20,
  },
  button: {
    flexDirection:'column',
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent:'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 10,
    fontWeight:'bold'
  },
  historyButton: {
    flexDirection: 'row',
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  historyButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  historyTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  PunchInButton:{
    borderRadius:100,
    height:120,
    borderColor:'#333',
    borderWidth:10,
    width:120
  }
});

export default App;
