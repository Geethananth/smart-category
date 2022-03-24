import React from "react";
import { Button, Image, Text, View, TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native";
import { customStyle } from "../../../assets/styles/custom.style";
import * as ImagePicker from "expo-image-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { WithNavigator } from "../../Components/WithNavigator";
import { addCategory, getAllCategories } from "../../Services/Category.service";
import DropDownPicker from "react-native-dropdown-picker";

class AddCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      isError: false,
      isLoading: false,
      isShowDropdown: false,
      categories: [],
      parentId: "",
      formData: {
        nameEn: "",
        nameHi: "",
        description: "",
        image: "",
        featured: false,
      },
    };
  }

  componentDidMount = () => {
    this.getCategories();
  };

  getCategories = () => {
    this.setState({ isLoading: true }, () => {
      getAllCategories()
        .then((data) => {
          this.setState({
            categories: data.map((item) => {
              return {
                label: item.name[0].value,
                value: item.categoryId,
              };
            }),
          });
        })
        .catch((e) => this.setState({ isError: true }))
        .finally((_) => this.setState({ isLoading: false }));
    });
  };

  handleChange = (value, key) => {
    const formData = this.state.formData;
    formData[key] = value;
    this.setState({ formData: formData });
  };

  handleSubmit = () => {
    this.validateFormData().then((result) => {
      if (result) {
        this.submitForm();
      } else {
        this.setState({ isError: true });
      }
    });
  };

  validateFormData = async () => {
    const formData = this.state.formData;
    const isValid = Object.values(formData).every((val) => {
      if (typeof val === "string") {
        return val !== "";
      } else {
        return true;
      }
    });

    return isValid;
  };

  submitForm = () => {
    const formData = this.state.formData;
    const randomArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].sort(
      () => 0.5 - Math.random()
    );
    let code = randomArray.slice(0, 4).join("");

    const data = {
      categoryId: new Date().getMilliseconds().toString(),
      name: [
        {
          _id: "6128ea4cc162761c5a2bd970",
          language: "en",
          value: formData.nameEn,
        },
        {
          _id: "6128ea4cc162761c5a2bd96f",
          language: "hi",
          value: formData.nameHi,
        },
      ],
      slug: `${formData.nameEn}-${code}`,
      description: formData.description,
      parentID: "0",
      type: 2,
      attributeSet: "6128e8ebc162761c5a2bd969",
      categoryNumber: code,
      level: 1,
      featured: formData.featured,
      icon: "category-icons/1630071372264-ico.jpg",
      picture: formData.image,
      image: [],
      status: true,
      create_date: new Date(),
    };

    addCategory(data).then((data) => {
      this.props.navigation.push("Category listing");
    });
  };

  selectImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const formData = this.state.formData;
      formData.image = result.uri;
      this.setState({ formData: formData });
    }
  };

  render() {
    const { formData, isError } = this.state;
    return (
      <View
        style={{
          padding: wp("5%"),
          backgroundColor: "#ffffff",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Name english */}
        <View
          style={{ ...customStyle.labelContainer, flexDirection: "column" }}
        >
          <Text style={{ width: "25%", padding: 10, fontWeight: "bold" }}>
            Name(English)
          </Text>
          <TextInput
            onChangeText={(text) => this.handleChange(text, "nameEn")}
            placeholder="Enter name in english"
            style={customStyle.formInput}
          />
          {isError && formData.nameEn === "" && (
            <Text style={customStyle.formErrorLabel}>
              Please enter name in english
            </Text>
          )}
        </View>

        {/* End Name English */}

        {/* Name Hindi */}
        <View
          style={{ ...customStyle.labelContainer, flexDirection: "column" }}
        >
          <Text style={{ width: "25%", padding: 10, fontWeight: "bold" }}>
            Name(Hindi)
          </Text>
          <TextInput
            onChangeText={(text) => this.handleChange(text, "nameHi")}
            placeholder="Enter name in hindi"
            style={customStyle.formInput}
          />
          {isError && formData.nameHi === "" && (
            <Text style={customStyle.formErrorLabel}>
              Please enter name in Hindi
            </Text>
          )}
        </View>
        {/* End name hindi */}

        {/* Description */}
        <View
          style={{ ...customStyle.labelContainer, flexDirection: "column" }}
        >
          <Text style={{ width: "25%", padding: 10, fontWeight: "bold" }}>
            Description
          </Text>
          <TextInput
            numberOfLines={4}
            onChangeText={(text) => this.handleChange(text, "description")}
            placeholder="Enter description"
            style={customStyle.formInput}
          />
          {isError && formData.description === "" && (
            <Text style={customStyle.formErrorLabel}>
              Please enter description
            </Text>
          )}
        </View>
        {/* End Description */}

        {/* Select parent */}
        {/* <View
          style={{ ...customStyle.labelContainer, flexDirection: "column" }}
        >
          <Text style={{ width: "25%", padding: 10, fontWeight: "bold" }}>
            Description
          </Text>
          <DropDownPicker
            open={this.state.isShowDropdown}
            value={this.state.parentId}
            items={this.state.categories}
            zIndexInverse={10000}
            setOpen={() =>
              this.setState({ isShowDropdown: !this.state.isShowDropdown })
            }
            setValue={(val) => this.setState({ parentId: val })}
          />
        </View> */}
        {/* End select parent */}

        {/* Featured */}
        <View
          style={{ ...customStyle.labelContainer, flexDirection: "column" }}
        >
          <TouchableOpacity
            onPress={() => this.handleChange(!formData.featured, "featured")}
          >
            <View
              style={{
                width: wp("25%"),
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={customStyle.radioButtonWrp}>
                {formData.featured && (
                  <View
                    style={{
                      height: 12,
                      width: 12,
                      borderRadius: 6,
                      backgroundColor: "#0074cc",
                    }}
                  />
                )}
              </View>

              <Text style={{ marginLeft: 10 }}>Featured</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* End Featured */}

        {/* Image picker */}
        <View
          style={{ ...customStyle.labelContainer, flexDirection: "column" }}
        >
          <Text style={{ width: "25%", padding: 10, fontWeight: "bold" }}>
            Image
          </Text>
          <View style={{ marginBottom: hp("2%") }}>
            {formData.image !== "" ? (
              <Image
                source={{ uri: formData.image }}
                style={{
                  width: hp("20%"),
                  height: hp("20%"),
                  padding: hp("2%"),
                }}
              />
            ) : null}
          </View>
          <View style={{ width: wp("100%"), alignItems: "center" }}>
            <Button title="Pick an image" onPress={this.selectImage} />
          </View>
          {isError && formData.image === "" && (
            <Text style={customStyle.formErrorLabel}>Please pick an image</Text>
          )}
        </View>
        {/* End image picker */}

        {/* Save Button */}
        <View
          style={{
            flexDirection: "column",
            width: wp("50%"),
            alignSelf: "center",
          }}
        >
          <Button title="Save" onPress={this.handleSubmit} />
        </View>
        {/* End Save Button */}
      </View>
    );
  }
}

export default WithNavigator(AddCategoryForm);
