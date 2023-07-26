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
  useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';

const data = [
  {website: 'Amazon', email: 'dhruba@gmail.com'},
  {website: 'Google', email: 'dhruba@gmail.com'},
  {website: 'Microsoft', email: 'dhruba@outlook.com'},
  {website: 'Apple', email: 'dhruba@icloud.com'},
  {website: 'LinkedIn', email: 'dhruba@gmail.com'},
  {website: 'GitHub', email: 'dhruba@gmail.com'},
];

const App = () => {
  const [copied, setCopied] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [textW, onChangeTextW] = useState();
  const [textE, onChangeTextE] = useState();
  const [textP, onChangeTextP] = useState();
  const [textK, onChangeTextK] = useState();

  const colorScheme = useColorScheme();
  const color = colorScheme === 'dark' ? 'white' : 'black';
  const notColor = colorScheme === 'dark' ? 'black' : 'white';

  const copyToClipboard = () => {
    Clipboard.setString('password');
  };
  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  const styles = StyleSheet.create({
    addButtonText: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
    addButtonBg: {
      backgroundColor: 'black',
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
      color: {color},
      fontWeight: 'bold',
    },
    mail: {
      fontSize: 25,
      color: {color},
    },
    group: {
      marginBottom: 10,
    },
    modalView: {
      width: '100%',
      margin: 50,
      justifyContent: 'center',
      backgroundColor: {notColor},
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 1,
    },
    input: {
      color: {color},
      width: '100%',
      height: 40,
      margin: 20,
      borderWidth: 0.8,
      borderRadius: 20,
      borderColor: {color},
      padding: 10,
    },
  });
  return (
    <SafeAreaView>
      <View style={styles.centerify}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.centerify}>
            <View style={styles.modalView}>
              <Text style={[styles.title, {margin: 20}]}>Add New</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeTextW}
                value={textW}
                placeholder="Website Name"
                keyboardType="default"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeTextE}
                value={textE}
                placeholder="Email Address"
                keyboardType="default"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeTextP}
                value={textP}
                placeholder="Password"
                keyboardType="default"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeTextK}
                value={textK}
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
              color: {color},
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
              {data.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.group}
                    onPress={() => {
                      copyToClipboard;
                      copy();
                    }}>
                    <Text style={styles.title}>{item.website}</Text>
                    <Text style={styles.mail}>{item.email}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
