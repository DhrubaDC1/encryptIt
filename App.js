/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import {clear, getData, getNextKey, storeData} from './database/asyncDB';
import styles from './styles';

const App = () => {
  const [copied, setCopied] = useState(false);
  const [notSaved, setNotSaved] = useState(false);
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
  const fetchData = async () => {
    try {
      key = parseInt(await getNextKey());
      let arr = [];
      for (let i = 0; i < key; i++) {
        const storedData = await getData(String(i));
        if (storedData) {
          arr.push(JSON.parse(storedData));
        }
      }
      setData(arr);
    } catch (error) {}
  };
  const color = 'black';

  const copyToClipboard = password => {
    Clipboard.setString(password);
  };
  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  const noSave = () => {
    setNotSaved(true);
    setTimeout(() => setNotSaved(false), 1000);
  };

  const encryptor = async (text, shift) => {
    let encryptedText = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 'A' : 'a';
        const charCode = char.charCodeAt(0) - base.charCodeAt(0);
        const shiftedCharCode = (charCode + shift) % 26;
        const encryptedChar = String.fromCharCode(
          shiftedCharCode + base.charCodeAt(0),
        );

        encryptedText += encryptedChar;
      } else {
        encryptedText += char;
      }
    }

    return encryptedText;
  };
  const decryptor = async (encryptedText, shift) => {
    let decryptedText = '';

    for (let i = 0; i < encryptedText.length; i++) {
      const char = encryptedText[i];

      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 'A' : 'a';
        const charCode = char.charCodeAt(0) - base.charCodeAt(0);
        const shiftedCharCode = (charCode - shift + 26) % 26;
        const decryptedChar = String.fromCharCode(
          shiftedCharCode + base.charCodeAt(0),
        );

        decryptedText += decryptedChar;
      } else {
        decryptedText += char;
      }
    }

    return decryptedText;
  };
  const clearInput = () => {
    onChangeTextW('');
    onChangeTextE('');
    onChangeTextK('');
    onChangeTextP('');
    onChangeKeyUser('');
  };
  return (
    <View style={styles.dark}>
      <SafeAreaView>
        <View style={styles.centerify}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}>
            <View style={styles.centerify}>
              <View style={styles.modalView}>
                <Text style={[styles.title, {margin: 20}]}>
                  {notSaved ? 'Missing Fields' : 'Add New'}
                </Text>
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
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeTextP}
                  value={textP}
                  placeholder="Password"
                  keyboardType="default"
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeTextK}
                  value={textK}
                  placeholder="Encryption Key (10>Key<25)"
                  keyboardType="number-pad"
                />
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableOpacity
                    style={[styles.addButtonBg, {margin: 20}]}
                    onPress={async () => {
                      clearInput();
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.addButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.addButtonBg, {margin: 20}]}
                    onPress={async () => {
                      if (
                        textW.length > 0 &&
                        textE.length > 0 &&
                        textP.length > 0 &&
                        textK.length > 0
                      ) {
                        key = await getNextKey();
                        storeData(key, {
                          Website: textW,
                          Email: textE,
                          Password: await encryptor(textP, parseInt(textK)),
                        });
                        await fetchData();
                        clearInput();
                        setModalVisible(!modalVisible);
                      } else {
                        noSave();
                      }
                    }}>
                    <Text style={styles.addButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
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
                  {notSaved ? 'Missing Encryption Key' : 'Encryption Key'}
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeKeyUser}
                  value={keyUser}
                  placeholder="Your encryption key"
                  keyboardType="number-pad"
                />
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableOpacity
                    style={[styles.addButtonBg, {margin: 20}]}
                    onPress={async () => {
                      clearInput();
                      setEncVisible(!encVisible);
                    }}>
                    <Text style={styles.addButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.addButtonBg, {margin: 20}]}
                    onPress={async () => {
                      if (keyUser.length > 0) {
                        copyToClipboard(
                          await decryptor(val.Password, parseInt(keyUser)),
                        );
                        copy();
                        clearInput();
                        setEncVisible(!encVisible);
                      } else {
                        noSave();
                      }
                    }}>
                    <Text style={styles.addButtonText}>Copy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.centerify}>
            <Text
              style={styles.bigTitle}>
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
                {data.length > 0 ? (
                  data.map((item, index) => (
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
                  ))
                ) : (
                  <View>
                    <Text style={[styles.mail, {fontSize: 32}]}>
                      Add something to show up here
                    </Text>
                    <Text style={[styles.mail, {fontSize: 32}]}>
                      Don't forget your encryption key
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default App;
