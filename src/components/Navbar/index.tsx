import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Platform, 
  StatusBar, 
  Animated,
  SafeAreaView
} from 'react-native';
import { navigateScreen } from 'navigation/RootNavigation';
import { STACK_NAVIGATOR } from 'navigation/types';
import LanguageSelector from '../LanguageSelector';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [scrollY] = useState(new Animated.Value(0));
  const [isVisible, setIsVisible] = useState(true);
  
  const onLanguagePress = () => {
    navigateScreen(STACK_NAVIGATOR.LANGUAGE_SETTING);
  };
  
  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      setIsVisible(value < 50);
    });
    
    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY]);
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });
  
  const headerElevation = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 5],
    extrapolate: 'clamp',
  });
  
  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />
      <Animated.View 
        style={[
          styles.container,
          { 
            paddingTop: Platform.OS === 'ios' ? 10 : 16,
            opacity: headerOpacity,
            elevation: headerElevation,
            shadowOpacity: headerElevation.interpolate({
              inputRange: [0, 5],
              outputRange: [0, 0.15],
            }),
          }
        ]}
      >
        <View style={styles.leftSection}>
          <Text style={styles.title}>MeetGo</Text>
        </View>
        <View style={styles.rightSection}>
          {/* Make sure LanguageSelector is properly imported and getting required props */}
          <LanguageSelector onPress={onLanguagePress} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    letterSpacing: 0.3,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginRight: 10,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FF3B30',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  }
});

export default Navbar;