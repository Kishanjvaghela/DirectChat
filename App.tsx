/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, useState } from 'react';
import {
  Alert,
  Button,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

// import {Colors} from 'react-native/Libraries/NewAppScreen';
// const isSmallDevice = Dimensions.get('window').width < 768;
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [number, setNumber] = useState<string>();

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onChangeNumber = (text: string) => {
    console.log(text);
    setNumber(text);
  };

  const handlePress = useCallback(async () => {
    try {
      const formattedNumber = number
        ?.trim()
        .replace('+', '')
        .replace('-', '')
        .replace('(', '')
        .replace(')', '');
      const url = `https://wa.me/${formattedNumber}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    } catch (error) {
      // Alert.alert(error?.message);
    }
    // Checking if the link is supported for links with custom URL scheme.
  }, [number]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.sectionContainer}>
        <Text>DirectChat</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Enter whatsapp number"
          keyboardType="phone-pad"
        />
        <Button
          onPress={handlePress}
          title="Chat"
          accessibilityLabel="Open whatsapp"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    padding: 24,
    // maxWidth: isSmallDevice ? '100%' : '50%',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    borderColor: '#767676',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginVertical: 12,
  },
});

export default App;
