import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {API_ATTENDANCES} from '@configs/apiConfigs';
import {getLogin} from '@storage/login';
import {Picker} from '@react-native-picker/picker';
import {useComponentWillMount, replace} from '@commons/common';
import axios from 'axios';
import {BLACK, GRAY_TEXT, BLUE, WHITE} from '@configs/style';
import GetLocation from 'react-native-get-location';

const Home = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [attendance, setAttendance] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useComponentWillMount(async () => {
    if ((await getLogin()) === null) {
      replace(props.navigation, 'LoginScreen');
    }
  });

  const onAttendance = async () => {
    setIsFetching(true);
    try {
      //console.log(await getLogin());
      let dateObj = new Date();
      let month = dateObj.getMonth() + 1; //months from 1-12
      let day = dateObj.getDate();
      let year = dateObj.getFullYear();

      let newdate = year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2);
      let time =
        dateObj.getHours() +
        ':' +
        dateObj.getMinutes() +
        ':' +
        dateObj.getSeconds();

      await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then((location) => {
          setLatitude(location.latitude);
          setLongitude(location.longitude);
          console.log(location.latitude);
        })
        .catch((error) => {
          const {code, message} = error;
          console.warn(code, message);
        });

      const dataForm = new FormData();
      dataForm.append('type_id', attendance);
      dataForm.append('log_date', newdate);
      dataForm.append('log_time', time);
      dataForm.append('longitude', longitude);
      dataForm.append('latitude', latitude);

      console.log(dataForm);
      const response = await axios.post(API_ATTENDANCES, dataForm, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + (await getLogin()),
        },
      });
      Alert.alert('Informasi', 'Absen Berhasil');
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      Alert.alert(
        'Informasi',
        'Terdapat Masalah silahkan coba beberapa saat lagi' + error,
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.attendanceText}>Pilih Absen</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={attendance}
            style={styles.pickerText}
            onValueChange={(itemValue, itemIndex) => setAttendance(itemValue)}
            itemStyle={styles.itemPicker}>
            <Picker.Item label="Pilih Absen" value="0" />
            <Picker.Item label="Absen Masuk" value="1" />
            <Picker.Item label="Absen Keluar" value="2" />
            <Picker.Item label="Absen Istirahat" value="3" />
            <Picker.Item label="Absen Selesai Istirahat" value="4" />
            <Picker.Item label="Absen Mulai Lembur" value="5" />
            <Picker.Item label="Absen Selesai Lembur" value="6" />
          </Picker>
        </View>
        <View style={styles.loginContainer}>
          {isFetching ? (
            <View style={styles.spinnerContainer}>
              <Text>Absen</Text>
              <ActivityIndicator size="small" color={WHITE} />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.attendanceButton}
              onPress={() => onAttendance()}>
              <Text>Absen</Text>
            </TouchableOpacity>
          )}
        </View>
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

export default Home;
