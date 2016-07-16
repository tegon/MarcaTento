import React, {
  Text,
  Component,
  TouchableHighlight,
} from 'react-native';

import baseStyles from '../baseStyles';

const Button = (props) => {
  return(
    <TouchableHighlight style={[baseStyles.button, props.buttonStyle]} onPress={props.onPress}  underlayColor='#FFE082'>
      <Text style={[baseStyles.buttonText, props.buttonTextStyle]}>{props.text}</Text>
    </TouchableHighlight>
  );
};

export default Button;
