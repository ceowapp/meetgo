import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  SafeAreaView, 
  StatusBar,
  Dimensions,
  Platform,
  ScrollView
} from 'react-native';
import useToast from 'components/Toast/useToast';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FLAGS, LANGUAGE_NAMES } from 'constant/languageConstant';
import styles from './styles';

const { width, height } = Dimensions.get('window');

const LanguageSetting = ({ navigation }) => {
  const { i18n, t } = useTranslation();
  const insets = useSafeAreaInsets();
  
  const changeLanguage = async (lng) => {
    await i18n.changeLanguage(lng);
    await AsyncStorage.setItem('userLanguage', lng);
    /*if (Platform.OS === 'ios') {
      const Haptics = require('react-native-haptic-feedback').default;
      Haptics.trigger('impactMedium');
    } else {
      const ReactNativeHapticFeedback = require('react-native-haptic-feedback').default;
      ReactNativeHapticFeedback.trigger('impactMedium');
    }*/
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  const renderLanguageOption = (code) => {
    const isActive = i18n.language === code;
    return (
      <TouchableOpacity
        key={code}
        style={[
          styles.languageOption,
          isActive && styles.activeOption,
        ]}
        onPress={() => changeLanguage(code)}
        activeOpacity={0.7}
      >
        {/**<View style={styles.flagContainer}>
          <Image
            source={FLAGS[code]}
            style={styles.flagImage}
          />
        </View>**/}
        <View style={styles.languageTextContainer}>
          <Text style={[
            styles.languageName,
            isActive && styles.activeText
          ]}>
            {LANGUAGE_NAMES[code].native}
          </Text>
          {code !== i18n.language && (
            <Text style={styles.languageLocalName}>
              {LANGUAGE_NAMES[code].local}
            </Text>
          )}
        </View>
        {isActive && (
          <View style={styles.checkmarkContainer}>
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[
      styles.safeArea,
      { paddingTop: insets.top }
    ]}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{t('settings.selectLanguage')}</Text>
          <Text style={styles.subtitle}>{t('settings.languageDescription')}</Text>
          <View style={styles.optionsContainer}>
            {Object.keys(LANGUAGE_NAMES).map(code => renderLanguageOption(code))}
          </View>
          <Text style={styles.supportText}>
            {t('settings.moreLangComing')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LanguageSetting;