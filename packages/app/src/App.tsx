// 3. React Native needs crypto.getRandomValues polyfill and sha512
import 'react-native-get-random-values';
import { StatusBar } from 'expo-status-bar';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamsList, RootTabsParamsList } from './navigation/types';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import { trpc, getRpcLinks } from './lib/trpc';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { triggerHapticFeedback } from './lib/utils';
import ErrorBoundary from './components/ErrorBoundary';
import useTypedNavigation from './hooks/useTypedNavigation';
import colors from './lib/styles/colors';
import useAutoUpdate from './hooks/useAutoUpdate';
import Dev from './screens/Dev';
import Settings from './screens/Settings';
import Advanced from './screens/Advanced';
import Home from './screens/Home';
import * as Notifications from 'expo-notifications';
import Welcome from './screens/Welcome';
import EnableNotification from './screens/EnableNotification';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Show banner in foreground
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const linking = {
  prefixes: [
    'com.boilerplate.app://',
    'com.boilerplate.staging://',
    'com.boilerplate.dev://',
  ],
  config: {
    screens: {
      Join: 'join', // This maps to com.onegri.app://join?targetLocationId=...
    },
  },
};

const Tab = createBottomTabNavigator<RootTabsParamsList>();
const RootStack = createNativeStackNavigator<RootStackParamsList>();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarButton: props => (
          <TouchableWithoutFeedback
            onPress={e => {
              triggerHapticFeedback();
              props.onPress?.(e);
            }}
          >
            <View style={{ flex: 1 }}>{props.children}</View>
          </TouchableWithoutFeedback>
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const Screens = () => {
  const navigation = useTypedNavigation();

  return (
    <ErrorBoundary navigation={navigation}>
      <TouchableWithoutFeedback
        accessible={false}
        style={{ flex: 1, backgroundColor: 'blue' }}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <RootStack.Navigator
              screenOptions={{
                headerBackTitle: '戻る',
              }}
            >
              <RootStack.Screen
                name="Tabs"
                component={Tabs}
                options={{
                  headerShown: false,
                }}
              ></RootStack.Screen>
              <RootStack.Screen
                name="Dev"
                component={Dev}
                options={{}}
              ></RootStack.Screen>
              <RootStack.Screen
                name="Advanced"
                component={Advanced}
                options={{
                  title: 'Advanced',
                }}
              ></RootStack.Screen>
              <RootStack.Screen
                name="Welcome"
                component={Welcome}
                options={{
                  title: 'Welcome',
                  headerShown: false,
                }}
              ></RootStack.Screen>
              <RootStack.Screen
                name="EnableNotification"
                component={EnableNotification}
                options={{
                  title: 'Enable Notification',
                }}
              ></RootStack.Screen>
            </RootStack.Navigator>
          </BottomSheetModalProvider>
          <Toast></Toast>
        </GestureHandlerRootView>
      </TouchableWithoutFeedback>
    </ErrorBoundary>
  );
};

const NavigationTheme = {
  dark: false,
  colors,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: process.env.NODE_ENV === 'development',
      // throwOnError: false,
      retry: 3,
      // retry: 3,
      gcTime: 1000 * 60 * 60 * 24,
    },
    mutations: {
      throwOnError: process.env.NODE_ENV === 'development',
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const App = () => {
  const [loaded, error] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    'Nunito-Regular': require('../assets/Nunito-Regular.ttf'),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    'Nunito-Bold': require('../assets/Nunito-Bold.ttf'),
  });

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  const { isUpdating } = useAutoUpdate();

  if (!loaded) {
    return null;
  }

  if (isUpdating === null || isUpdating) {
    return null;
  }

  const trpcClient = trpc.createClient({
    links: getRpcLinks(),
  });

  return (
    <NavigationContainer linking={linking}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{
            persister: asyncStoragePersister,
            buster: '40',
          }}
        >
          <ThemeProvider value={NavigationTheme}>
            <SafeAreaProvider>
              <Screens></Screens>
              <StatusBar style="light" />
            </SafeAreaProvider>
          </ThemeProvider>
        </PersistQueryClientProvider>
      </trpc.Provider>
    </NavigationContainer>
  );
};

export default App;
