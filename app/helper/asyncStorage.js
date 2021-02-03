import AsyncStorage from '@react-native-community/async-storage';

const asyncStorage = {
  setItem: async (key, data) => {
    await AsyncStorage.setItem(key, data);
  },
  getItem: async (key) => {
    const getData = await AsyncStorage.getItem(key);
    if (getData) {
      return getData;
    } else {
      return null;
    }
  },
  removeItem: async (key) => {
    await AsyncStorage.removeItem(key);
  },
};

export default asyncStorage;
