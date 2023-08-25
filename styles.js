import {StyleSheet, Appearance} from 'react-native';

const colorScheme = Appearance.getColorScheme();
const color = colorScheme == 'dark' ? 'white' : 'black';
const inverseColor = colorScheme == 'dark' ? 'black' : 'white';
const styles = StyleSheet.create({
  dark: {backgroundColor: inverseColor},
  bigTitle: {
    fontFamily: 'Handjet-Light',
    color: {color},
    fontSize: 90,
    margin: 0,
    flexDirection: 'column',
  },
  addButtonText: {
    fontFamily: 'Handjet-Light',
    fontSize: 20,
    color: inverseColor,
  },
  addButtonBg: {
    backgroundColor: color,
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
    color: color,
  },
  mail: {
    fontFamily: 'Handjet-ExtraLight',
    fontSize: 25,
    color: color,
  },
  group: {
    marginBottom: 10,
  },
  modalView: {
    width: '100%',
    margin: 50,
    justifyContent: 'center',
    backgroundColor: inverseColor,
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
    backgroundColor: inverseColor,
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
    color: color,
    width: '100%',
    height: 40,
    margin: 20,
    borderWidth: 0.8,
    borderRadius: 20,
    borderColor: color,
    padding: 10,
  },
});
export default styles;
