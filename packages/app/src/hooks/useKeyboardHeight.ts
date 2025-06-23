import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';

const useKeyboardHeight = () => {
  const [kbHeight, setKbHeight] = useState(0);
  const bottomTabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    // Choose the “will” events on iOS for smoother timing
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = (e: any) => {
      if (Platform.OS === 'ios') {
        setKbHeight(Math.round(e.endCoordinates.height - bottomTabBarHeight));
      } else {
        setKbHeight(0);
      }
    };

    const onHide = () => {
      setKbHeight(0);
    };

    const showSub = Keyboard.addListener(showEvent, onShow);
    const hideSub = Keyboard.addListener(hideEvent, onHide);
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return kbHeight;
};

export default useKeyboardHeight;
