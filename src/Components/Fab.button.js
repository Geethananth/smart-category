import { FloatingAction } from "react-native-floating-action";


export const FabButton = ({onPress}) => (
    <FloatingAction
    actions={[{
      text: "Add Category",
      icon: require("../../assets/images/plus.png"),
      name: "add_category",
      position: 1
    }]}
    distanceToEdge={30}
    overrideWithAction={true}
    position={'center'}

    onPressItem={name => {
        onPress();
    }}
  />
)