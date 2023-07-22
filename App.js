/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const App = () => {
  const [copied, setCopied] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState(['', '', '', '']);

  const copyToClipboard = () => {
    Clipboard.setString('password');
  };
  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <SafeAreaView>
      <View style={styles.centerify}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.centerify}>
            <View style={styles.modalView}>
              <Text style={[styles.title, {margin: 20}]}>Add New</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText[0]}
                value={text[0]}
                placeholder="Website Name"
                keyboardType="default"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeText[1]}
                value={text[1]}
                placeholder="Email Address"
                keyboardType="default"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeText[2]}
                value={text[2]}
                placeholder="Password"
                keyboardType="default"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeText[3]}
                value={text[3]}
                placeholder="Encryption Key (10>Key<25)"
                keyboardType="number-pad"
              />
              <TouchableOpacity
                style={[styles.addButtonBg, {margin: 20}]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.addButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.centerify}>
          <Text
            style={{
              color: copied === true ? 'green' : 'white',
              fontSize: 50,
              fontWeight: 'bold',
              margin: 30,
            }}>
            {copied === true ? 'Copied' : 'encryptIt'}
          </Text>
          <View style={(styles.centerify, {margin: 40})}>
            <TouchableOpacity
              style={styles.addButtonBg}
              onPress={() => setModalVisible(true)}>
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
  modalView: {
    width: '100%',
    margin: 50,
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    color: 'white',
    width: '100%',
    height: 40,
    margin: 20,
    borderWidth: 0.8,
    borderRadius: 20,
    borderColor: 'white',
    padding: 10,
  },
});

export default App;
