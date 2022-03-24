import { useNavigation } from '@react-navigation/native';

export function WithNavigator(Component) {
  return (props) => (
   <Component {...props}  navigate={useNavigation()} />
);
}