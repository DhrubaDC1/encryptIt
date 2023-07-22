/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const App = () => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    Clipboard.setString('password');
  };
  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 250);
  };
  return (
    <SafeAreaView>
      <View style={styles.centerify}>
        <View style={styles.centerify}>
          <Text
            style={{
              color: copied === true ? 'green' : 'white',
              fontSize: 50,
              fontWeight: 'bold',
              margin: 30,
            }}>
            encryptIt
          </Text>
          <View style={(styles.centerify, {margin: 40})}>
            <TouchableOpacity style={styles.addButtonBg}>
              <Text style={styles.addButtonText}>Add new</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, width: Dimensions.get('window').width}}>
            <ScrollView
              style={styles.container}
              automaticallyAdjustsScrollIndicatorInsets={false}>
              <TouchableOpacity
                style={styles.group}
                onPress={() => {
                  copyToClipboard();
                  copy();
                }}>
                <Text style={styles.title}>Amazon</Text>
                <Text style={styles.mail}>dhruba@gmail.com</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.group}
                onPress={() => {
                  copyToClipboard;
                  copy();
                }}>
                <Text style={styles.title}>Google</Text>
                <Text style={styles.mail}>dhruba@gmail.com</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.group}
                onPress={() => {
                  copyToClipboard;
                  copy();
                }}>
                <Text style={styles.title}>Microsoft</Text>
                <Text style={styles.mail}>dhruba@outlook.com</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.group}
                onPress={() => {
                  copyToClipboard;
                  copy();
                }}>
                <Text style={styles.title}>Apple</Text>
                <Text style={styles.mail}>dhruba@icloud.com</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.group}
                onPress={() => {
                  copyToClipboard;
                  copy();
                }}>
                <Text style={styles.title}>LinkedIn</Text>
                <Text style={styles.mail}>dhruba@gmail.com</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.group}
                onPress={() => {
                  copyToClipboard;
                  copy();
                }}>
                <Text style={styles.title}>GitHub</Text>
                <Text style={styles.mail}>dhruba@gmail.com</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.group}
                onPress={() => {
                  copyToClipboard;
                  copy();
                }}>
                <Text style={styles.title}>Spotify</Text>
                <Text style={styles.mail}>dhruba@gmail.com</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.group}
                onPress={() => {
                  copyToClipboard;
                  copy();
                }}>
                <Text style={styles.title}>Discord</Text>
                <Text style={styles.mail}>dhruba@gmail.com</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.group}
                onPress={() => {
                  copyToClipboard;
                  copy();
                }}>
                <Text style={styles.title}>Aliexpress</Text>
                <Text style={styles.mail}>dhruba@gmail.com</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  appName: {
    fontSize: 50,
    // color: 'white',
    fontWeight: 'bold',
    margin: 30,
  },
  addButtonText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  addButtonBg: {
    backgroundColor: 'white',
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  centerify: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  mail: {
    fontSize: 25,
    color: 'white',
  },
  group: {
    marginBottom: 10,
  },
});

export default App;
