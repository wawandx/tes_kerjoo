import React, {useEffect, useState} from 'react';
import {BackHandler, ToastAndroid, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faHistory, faUser} from '@fortawesome/free-solid-svg-icons';
import {GRAY_LIGHT, BLUE} from '@configs/style';
import HomeScreen from '@screens/home';
import ProfileScreen from '@screens/profile';
import HistoryScreen from '@screens/history';

const Tab = createBottomTabNavigator();

const Main = (props) => {
  const [exitApp, setExitApp] = useState(0);

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

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = faHome;
          } else if (route.name === 'History') {
            iconName = faHistory;
          } else if (route.name === 'Profile') {
            iconName = faUser;
          }

          return <FontAwesomeIcon color={color} size={size} icon={iconName} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: BLUE,
        inactiveTintColor: GRAY_LIGHT,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Main;
