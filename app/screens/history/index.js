import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import {BLACK, GRAY_TEXT, BLUE, WHITE} from '@configs/style';
import Card from '@screens/history/Card';
import axios from 'axios';
import {API_ATTENDANCES} from '@configs/apiConfigs';
import {getLogin} from '@storage/login';

const History = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);

  const getHistory = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(API_ATTENDANCES, {
        headers: {
          Authorization: 'Bearer ' + (await getLogin()),
        },
      });
      console.log(response.data.data);
      setData(response.data.data);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      Alert.alert(
        'Informasi',
        'Terdapat Masalah silahkan coba beberapa saat lagi' + error,
      );
    }
  };

  useEffect(() => {
    const focus = props.navigation.addListener('focus', () => {
      getHistory();
    });

    return focus;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.attendanceText}>History</Text>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <Card data={item} hairLines navigation={props.navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          extraData={data}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    margin: 20,
  },
  attendanceText: {
    fontSize: 13,
    color: BLACK,
    marginBottom: 8,
    marginTop: 16,
  },
  picker: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: GRAY_TEXT,
    height: 40,
  },
  pickerText: {
    height: 40,
  },
  itemPicker: {
    fontSize: 11,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  loginButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: BLUE,
    borderRadius: 4,
  },
  spinnerContainer: {
    flex: 3,
    backgroundColor: BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
    flexDirection: 'row',
  },
  attendanceButton: {
    flex: 1,
    backgroundColor: BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
  },
});

export default History;
