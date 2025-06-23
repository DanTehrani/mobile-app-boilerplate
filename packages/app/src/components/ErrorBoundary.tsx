import { View } from 'react-native';
import { Component, ReactNode } from 'react';
import StyledText from './StyledText';
import * as Sentry from '@sentry/react-native';
//import StyledButton from '../StyledButton/StyledButton';
import { NavigationProp } from '@react-navigation/native';

// Define Props and State Types
interface ErrorBoundaryProps {
  children: ReactNode;
  navigation: NavigationProp<any>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    Sentry.captureException(error);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            rowGap: 16,
          }}
        >
          <StyledText>{`Something went wrong`}</StyledText>
          {/*
            <View style={{ width: '100%', paddingHorizontal: 16 }}>
              <StyledButton title="Reload" onPress={this.handleReset} />
            </View>
            */}
        </View>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
