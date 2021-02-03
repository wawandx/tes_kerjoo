import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  GRAY_TEXT,
  WHITE,
  GRAY,
  RED,
  WARNING,
  GREEN,
  BLACK,
  DEFAULT_FONT_FAMILY,
  FONT_FAMILY_BOLD,
} from '@configs/style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faTimes,
  faCheck,
  faHourglassEnd,
} from '@fortawesome/free-solid-svg-icons';
import {navigateTo} from '@commons/common';

const Card = (props) => {
  const {data, navigation} = props;

  let type_name = '';
  if (data.type_id == 1) {
    type_name = 'Masuk';
  } else if (data.type_id == 2) {
    type_name = 'Keluar';
  } else if (data.type_id == 3) {
    type_name = 'Istirahat';
  } else if (data.type_id == 4) {
    type_name = 'Selesai Istirahat';
  } else if (data.type_id == 5) {
    type_name = 'Mulai lembur';
  } else if (data.type_id == 6) {
    type_name = 'Selesai Lembur';
  }

  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.cardContainer}>
        <View style={styles.leftContainer}>
          <Text style={[styles.textCard, styles.alignRight, styles.bold]}>
            #{type_name}
          </Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={[styles.textCard, styles.bold]}>{data.log_time}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={[styles.textCard, styles.bold]}>Map</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: GRAY_TEXT,
    marginTop: 16,
    backgroundColor: WHITE,
    padding: 8,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
  },
  textCard: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 12,
  },
  titleCard: {
    paddingBottom: 10,
    flexDirection: 'row',
  },
  bold: {
    fontFamily: FONT_FAMILY_BOLD,
  },
  contentCard: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  bottomCard: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  green: {
    color: GREEN,
  },
  red: {
    color: RED,
  },
  warning: {
    color: WARNING,
  },
});

export default Card;
