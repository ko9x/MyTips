// I created this component to get rid fo the warnings in BottomTabs located in the navigation folder.
// I was unable to resolve the warning about not defining a during render

import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type ButtonProps = {
  color: string;
  size: number;
  focused: boolean;
};

function IconButton({focused, color, size}: ButtonProps): React.JSX.Element {
  return <MaterialCommunityIcons name="home" color={color} size={size} />;
}

export default IconButton;
