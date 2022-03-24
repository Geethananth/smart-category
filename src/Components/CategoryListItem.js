import React from "react";
import { ActivityIndicator, Button, Image, Text, View } from 'react-native';
import ExpandableView from '@pietile-native-kit/expandable-view';
import { customStyle } from '../../assets/styles/custom.style';
import { getSubCategories } from "../Services/Category.service";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { WithNavigator } from "./WithNavigator";
//import { withNavigation } from "react-navigation";


class CategoryListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      isError: "",
      subList: [],
    }
  }

  handleOpenClick = ()=> {
    
    const categoryId = this.props.category?.item?.categoryId;
    if (categoryId) {
      getSubCategories(categoryId).then((data)=> {
        this.setState({subList: data, isOpen: !this.state.isOpen})
      })
    }
  }


  buildListItem = (item)=> {
    return <Text style={{
      paddingLeft: wp('5%'),
      paddingRight: wp('5%'),
      paddingBottom: wp('5%'),
      paddingTop: wp('5%'),
      backgroundColor: "#f9f9f9",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#e4e4e4",
      
    }} key={Math.random()}> ❯  {item.name[0].value}</Text>
    
  }

  buildMainItem = (item)=> {
    return <View
      key={item.categoryId}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        padding: "1.5%", 
        marginBottom: 3,
      }}
    >
      <View
            style={{
              alignItems: "center",
              width: "20%",
              alignSelf: "center",
              
            }}
            resizeMode="center"
          >
            <Image
              style={{
                width: 60,
                height: 60,
                
              }}
              resizeMode="cover"
              source={
                item?.picture
                  ? { uri: item.picture }
                  : require("../../assets/images/thumbnail.png")
              }
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>

      <View
        style={{
          width: "80%",
          paddingLeft: "2.5%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
        onPress = {() => this.props.navigate.navigate('Category details', {id: item.categoryId})}
        >
          
        <Text
          style={{
            fontSize: 14,
            textTransform: "uppercase",
            fontWeight: 'bold',
            color: "#5F0322",
          }}
        > {item.categoryNumber}
          {(item.featured) && <Text style={customStyle.featuredText}>featured</Text>}
         
        </Text>        
        <Text
          style={{
            fontSize: 14,
            textTransform: "uppercase",
            color: "#5F0322",
          }}
        >
          {item.name[0].value}
          
        </Text>
        </TouchableOpacity>        
        <TouchableOpacity
        onPress={this.handleOpenClick}
         
        style={{
          alignItems: "center", 
          position: "relative", 
          left: 0, 
          right: 0, 
          bottom: -5, 
          
      }} >
          <Text style={{alignItems: "center", fontSize: hp('2.5%'), color: "#e4e4e4", transform: [{rotate: "90 deg"}]}}> ❯</Text>
          </TouchableOpacity>
      </View>
      {/* <TouchableOpacity style={{backgroundColor: 'red'}} onPress=>
      <Text style={{fontSize: 15, position: "absolute", right: 25, top: 25, color: "#e4e4e4",}}>❯</Text>
      </TouchableOpacity> */}
    </View>
  }


  render =  ()=> {
    const { isLoading, isError, subList } = this.state;
    const category = this.props.category?.item;
    return <View>    

      {/* Category view section */}
      {this.buildMainItem(category)}
      {/* End Category view section */}
    


    <ExpandableView show={this.state.isOpen}>
    {isLoading ? (
              <View style={{alignItems: 'center'}}>
                <Text>Loading...</Text>
              </View>
            ) : isError ? (
              <View style={{alignItems: 'center'}}>
                <Text>{isError}</Text>
              </View>
            ) : subList.length > 0 ? (
              <View>{subList.map((item) => this.buildListItem(item))}</View>
            ) : (
              <View style={{alignItems: 'center'}}>
                <Text>No sub categories found</Text>
                </View>)}
      </ExpandableView>
    </View>
  }
}


export default WithNavigator(CategoryListItem)