import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  ToastAndroid,
  BackHandler,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {LOGO} from '@configs/imageConstants';
import {
  BLUE,
  WHITE,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  DEFAULT_FONT_FAMILY,
} from '@configs/style';
import {API_LOGIN} from '@configs/apiConfigs';
import axios from 'axios';
import {setLogin} from '@storage/login';
import {replace} from '@commons/common';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [exitApp, setExitApp] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const setBackhandlerListener = () => {
    setTimeout(() => {
      setExitApp(0);
    }, 2000);

    if (!props.navigation.canGoBack() && exitApp === 0) {
      setExitApp(exitApp + 1);

      ToastAndroid.show(
        'Tekan tombol kembali lagi untuk keluar',
        ToastAndroid.SHORT,
      );
    } else if (props.navigation.canGoBack()) {
      props.navigation.goBack();
      setExitApp(0);
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };

  useEffect(() => {
    if (!props.navigation.canGoBack()) {
      BackHandler.addEventListener('hardwareBackPress', setBackhandlerListener);
    }
  });

  const onLogin = async () => {
    setIsFetching(true);
    try {
      const dataForm = new FormData();
      dataForm.append('email', email);
      dataForm.append('password', password);
      const response = await axios.post(API_LOGIN, dataForm, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (
        response &&
        response.data &&
        response.data.message == 'Login Invalid'
      ) {
        Alert.alert('Informasi', 'Email atau password yang dimasukkan salah');
      } else {
        await setLogin(response && response.data && response.data.access_token);
        replace(props.navigation, 'MainScreen');
      }
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
      <View style={styles.topContainer}>
        <Image source={LOGO} resizeMode="contain" style={styles.logoImage} />
      </View>
      <View style={styles.topContainerTriangle} />
      <View style={styles.contentContainer}>
        <Text style={styles.Title}>Selamat datang di Kerjoo</Text>
        <Text style={styles.subtitle}>Aplikasi Absensi Online</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={{marginTop: 10}}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.loginContainer}>
          {isFetching ? (
            <View style={styles.spinnerContainer}>
              <Text>Masuk </Text>
              <ActivityIndicator size="small" color={WHITE} />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => onLogin()}>
              <Text>Masuk</Text>
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
  topContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 3,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: SCREEN_WIDTH,
    borderTopWidth: SCREEN_HEIGHT / 10,
    borderRightColor: 'transparent',
    borderTopColor: BLUE,
  },
  logoImage: {
    marginTop: 35,
    width: SCREEN_WIDTH / 2,
  },
  contentContainer: {
    padding: 25,
  },
  Title: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 26,
    paddingTop: 10,
    fontWeight: '300',
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
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
  loginText: {
    color: BLUE,
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 14,
  },
  textInputContainer: {
    marginTop: 30,
  },
  styleChildren: {
    height: SCREEN_HEIGHT,
  },
  subtitle: {
    color: BLUE,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  loginButton: {
    flex: 1,
    backgroundColor: BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
  },
});

export default Login;
