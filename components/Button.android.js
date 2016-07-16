import React, {
  Text,
  Component,
  TouchableNativeFeedback,
  View
} from 'react-native';

import baseStyles from '../baseStyles';

const Button = (props) => {
  return(
    <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={props.onPress}>
      <View style={[baseStyles.button, props.buttonStyle]}>
        <Text style={[baseStyles.buttonText, props.buttonTextStyle]}>{props.text}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Button;
