import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

type Props = {
  onPress: () => void;
  includeText?: boolean;
};

const LanguageSelector: React.FC<Props> = ({ onPress, includeText = false }) => {
  const { i18n } = useTranslation();
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}
    >
      <Icon name="translate" size={22} color="#007AFF" style={styles.icon} />
      {includeText && (
        <Text style={styles.languageText}>{i18n.language.toUpperCase()}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  icon: {
    marginRight: 4,
  },
  languageText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
    letterSpacing: 0.5,
  }
});

export default LanguageSelector;