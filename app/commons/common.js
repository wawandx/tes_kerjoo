import {useEffect, useRef} from 'react';
import {Platform} from 'react-native';
import {StackActions} from '@react-navigation/native';

export const isPlatformAndroid = () => {
  return Platform.OS === 'android';
};
export const isPlatformIos = () => {
  return Platform.OS === 'ios';
};

export const thousandSeparator = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const useComponentDidMount = (func) => useEffect(func, []);

export const useComponentWillMount = (func) => {
  const willMount = useRef(true);

  if (willMount.current) {
    func();
  }

  willMount.current = false;
};

// NAVIGATION
export const replace = (navigation, screen, param = {}) => {
  navigation.dispatch(StackActions.replace(screen, param));
};

export const navigateTo = (navigation, screen, param = {}) => {
  navigation.navigate(screen, param);
};

// NUMBER
export function sanitizeMobilePhoneNumber(inputValue) {
  let str = numbersOnly(inputValue);
  if (str && str.length >= 2 && str.slice(0, 2) == '62') {
    str = `0${str.slice(2)}`;
  }
  return str;
}

export function numbersOnly(inputValue) {
  if (inputValue == undefined) return;
  return inputValue.replace(/[^0-9]/g, '');
}
