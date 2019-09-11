import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
// NavigationEvents won't show up on screen
// onWillFocus will be called when screen is about to be navigated into
// onDidFocus will be called once navigation is completed
// onWillBlur just like onWillFocus but when navigating AWAY from the screen
// onDidBlur use your imagination, Eduard

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

import { Context } from '../context/AuthContext';

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(Context);

  return (
    <View style={ styles.containerStyle }>
      <NavigationEvents
        onWillBlur={ clearErrorMessage }
      />
      <AuthForm
        headerText="Sign In to your Account"
        errorMessage={ state.errorMessage }
        submitButtonText="Sign In"
        onSubmit={ signin }
      />
      <NavLink
        routeName="Signup"
        text="Don't have an account? Sign up instead"
      />
    </View>
  )
};

SigninScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150
  }
});

export default SigninScreen;
