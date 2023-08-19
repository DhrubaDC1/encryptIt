/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
import {clear, getData, getNextKey, storeData} from './database/asyncDB';

const App = () => {
  const [copied, setCopied] = useState(false);
  const [notCopied, setNotCopied] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [encVisible, setEncVisible] = useState(false);
  const [textW, onChangeTextW] = useState();
  const [textE, onChangeTextE] = useState();
  const [textP, onChangeTextP] = useState();
  const [textK, onChangeTextK] = useState();
  const [keyUser, onChangeKeyUser] = useState();
  const [data, setData] = useState([]);
  const [val, setVal] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        key = parseInt(await getNextKey());
        let arr = [];
        console.log(key);
        for (let i = 0; i < key; i++) {
          const storedData = await getData(String(i));
          if (storedData) {
            arr.push(JSON.parse(storedData));
          }
        }
        setData(arr);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const colorScheme = useColorScheme();
  // const color = colorScheme === 'dark' ? 'white' : 'black';
  // const notColor = colorScheme === 'dark' ? 'black' : 'white';
  const color = 'black';

  const copyToClipboard = password => {
    Clipboard.setString(password);
  };
  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  const noCopy = () => {
    setNotCopied(true);
    setTimeout(() => setNotCopied(false), 1000);
  };
  const styles = StyleSheet.create({
    addButtonText: {
      fontFamily: 'Handjet-Light',
      fontSize: 20,
      color: 'white',
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
      fontFamily: 'Handjet-Light',
      fontSize: 40,
      color: {color},
    },
    mail: {
      fontFamily: 'Handjet-ExtraLight',
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
      backgroundColor: 'white',
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
    encView: {
      width: '100%',
      margin: 50,
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
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
      fontFamily: 'Handjet-Light',
      fontSize: 20,
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
                onPress={async () => {
                  key = await getNextKey();
                  console.log(key);
                  if (key >= 0) {
                    console.log('n');
                  } else {
                    key = '0';
                  }
                  storeData(key, {
                    Website: textW,
                    Email: textE,
                    Password: textP,
                    EncKey: textK,
                  });
                  // getData(key);
                  // fetchData();
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.addButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={encVisible}
          onRequestClose={() => setEncVisible(!modalVisible)}>
          <View style={styles.centerify}>
            <View style={styles.encView}>
              <Text style={[styles.title, {margin: 20}]}>
                {notCopied ? 'Wrong Key' : 'Encryption Key'}
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeKeyUser}
                value={keyUser}
                placeholder="Your encryption key"
                keyboardType="number-pad"
              />
              <TouchableOpacity
                style={[styles.addButtonBg, {margin: 20}]}
                onPress={() => {
                  console.log(val);
                  if (val.EncKey == keyUser) {
                    copyToClipboard(val.Password);
                    copy();
                    setEncVisible(!encVisible);
                  } else {
                    noCopy();
                  }
                }}>
                <Text style={styles.addButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.centerify}>
          <Text
            style={{
              fontFamily: 'Handjet-Light',
              color: {color},
              fontSize: 90,
              margin: 30,
            }}>
            {copied ? 'Copied' : 'encryptIt'}
          </Text>
          <View style={(styles.centerify, {margin: 40})}>
            <TouchableOpacity
              style={styles.addButtonBg}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.addButtonText}>Add new</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, width: Dimensions.get('window').width}}>
            {/* <TouchableOpacity onPress={clear}>
              <Text>Touch</Text>
            </TouchableOpacity> */}
            <ScrollView
              style={styles.container}
              automaticallyAdjustsScrollIndicatorInsets={false}>
              {data.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.group}
                    onPress={() => {
                      setVal(item);
                      setEncVisible(true);
                    }}>
                    <Text style={styles.title}>{item.Website}</Text>
                    <Text style={styles.mail}>{item.Email}</Text>
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
