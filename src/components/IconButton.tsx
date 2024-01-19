import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type ButtonProps = {
  color: string;
  size: number;
  focused: boolean;
};

function IconButton({focused, color, size}: ButtonProps): React.JSX.Element {
  console.log(focused);
  return <MaterialCommunityIcons name="home" color={color} size={size} />;
}

export default IconButton;
