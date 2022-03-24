import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const customStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
  fabButtonTouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  fabButtonStyle: {
    resizeMode: "contain",
    width: 50,
    position: "relative",
    height: 50,
    //backgroundColor:'black'
  },
  filterContainer: {
    padding: wp("1.5%"),
    borderStyle: "solid",
    width: "25%",
    borderWidth: 1,
    borderColor: "#e4e4e4",
    borderRadius: 15,
    backgroundColor: "#0074cc",
    marginLeft: 5,
  },
  searchInput: {
    padding: wp("2%"),
    paddingLeft: wp("3.5%"),
    borderStyle: "solid",
    width: "75%",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#e4e4e4",
  },
  
  formInput: {
    padding: wp("2%"),
    paddingLeft: wp("3.5%"),
    borderStyle: "solid",
    width: "85%",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#e4e4e4",
  },
  topActionContainer: {
    padding: wp("5%"),
    paddingTop: 0,
    width: wp("100%"),
    display: "flex",
    flexDirection: "row",
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 22,
    height: hp("30%"),
    width: wp("75%"),
  },
  modalView: {
    margin: 20,

    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  labelContainer: {
    display: "flex",
    width: wp("100%"),
    flexDirection: "row",
    borderBottomColor: "#e4e4e4",
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingBottom: wp("2%"),
    marginBottom: wp("2%"),
  },
  radioButtonWrp: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0074cc',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  formErrorLabel: {
      fontSize: hp('1.4%'),
      color: "#ea4335"
  },
  featuredText: {
      fontSize: hp('1%'),
      color: "#34a853",
      padding: hp('3%'),
      textTransform: "lowercase",
      marginLeft: 10
  }
});
