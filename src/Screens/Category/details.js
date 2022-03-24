import React from "react";
import { View, Text, Button, Image, ActivityIndicator, SafeAreaView, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { customStyle } from "../../../assets/styles/custom.style";
import CategoryListItem from "../../Components/CategoryListItem";
import { getCategory } from "../../Services/Category.service";

class CategoryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: false,
      isError: "",
    };
  }

  componentDidMount = () => {
    if (this.props.route.params.id) {
      this.getData();
    }
  };

  getData = () => {
    const categoryId = this.props.route.params.id;
    if (categoryId) {
      this.setState({ isLoading: true }, () => {
        getCategory(categoryId)
          .then((data) => {
            this.setState({ data: data });
          })
          .catch((e) => this.setState({ isError: e.toString() }))
          .finally((_) =>
            this.setState({
              isLoading: false,
            })
          );
      });
    }
  };


  

  render = () => {
    const { isLoading, isError, data } = this.state;
    return (
      <SafeAreaView>
      <ScrollView style={{paddingBottom: wp('35%')}} >
        <View style={{ padding: wp("5%"), backgroundColor: "#ffffff" }}>

        {isLoading ? (
              <View style={{alignItems: 'center'}}>
                <Text>Loading...</Text>
              </View>
            ) : isError ? (
              <View style={{alignItems: 'center'}}>
                <Text>{isError}</Text>
              </View>
            ) : data !== null ? (
              <View>{this.buildCategoryView()}</View>
            ) : (
              <View style={{alignItems: 'center'}}>
                <Text>Category found</Text>                
              </View>
            )}          
          
        </View>

        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </ScrollView>
      </SafeAreaView>
    );
  };

  buildCategoryView = ()=> {
    const { data } = this.state;
    return <View>
        <Image
            style={{
              width: 150,
              height: 150,
              paddingBottom: wp("2%"),
              marginBottom: wp("5%"),
            }}
            resizeMode="cover"
            source={(data.picture) ? { uri: data.picture } :require("../../../assets/images/thumbnail.png")}
            PlaceholderContent={<ActivityIndicator />}
          />
          {/* Category id */}
          <View style={customStyle.labelContainer}>
            <Text style={{ width: "25%" }}>Category id</Text>
            <Text style={{ width: "75%" }}> {data.categoryId}</Text>
          </View>
          {/* End category id */}
          
          {/* Category name english */}
          <View style={customStyle.labelContainer}>
            <Text style={{ width: "40%" }}>Category name (English)</Text>
            <Text style={{ width: "60%" }}> {data.name[0]?.value}</Text>
          </View>
          {/* End Category name english */}

          {/* Category name hindi */}
          <View style={customStyle.labelContainer}>
            <Text style={{ width: "40%" }}>Category name (Hindi)</Text>
            <Text style={{ width: "60%" }}> {data.name[1]?.value}</Text>
          </View>
          {/* End Category name Hindi */}

            {/* Category description */}
          <View style={customStyle.labelContainer}>
            <Text style={{ width: "40%" }}>Description</Text>
            <Text style={{ width: "60%" }}> {data.description}</Text>
          </View>
          {/* End Category Description */}

            {/* Category featured */}
          <View style={customStyle.labelContainer}>
            <Text style={{ width: "40%" }}>Featured</Text>
            <Text style={{ width: "60%" }}> {data.featured.toString()}</Text>
          </View>
          {/* End Category featured*/} 
          
          {/* Category featured */}
          <View style={customStyle.labelContainer}>
            <Text style={{ width: "40%" }}>Created At</Text>
            <Text style={{ width: "60%" }}> {new Date(data.create_date).toDateString()}</Text>
          </View>
          {/* End Category featured*/}
          {(data) && <CategoryListItem category={{item: data}} key={Math.random()} />}


    </View>
  }
}

export default CategoryDetails;
