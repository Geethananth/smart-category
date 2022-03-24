import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from 'react-native-virtualized-view';
import { SafeAreaView } from "react-native-safe-area-context";
import { withNavigation } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FabButton } from "../../Components/Fab.button";
import CategoryListItem from "../../Components/CategoryListItem";
import { getMainCategories } from "../../Services/Category.service";
import { customStyle } from "../../../assets/styles/custom.style";
import { FilterModal } from "../../Components/Filter.modal";

class CategoryListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowFilterModal: false,
      filterValue : "",
      isLoading: false, // to handle the loading state
      isError: "", // to handle error
      dataArr: [], // The data
    };
  }

  componentDidMount = () => {
    this.getData();
    
  };

  getData = (searchText = "")=> {
    this.setState({
      isLoading: true
    }, () => getMainCategories(searchText, this.state.filterValue).then((data) => { 
      this.setState({ dataArr: data });
    }).catch((e)=>this.setState({isError: e.toString()})
    ).finally((_)=> this.setState({isLoading: false})));
  }  

  getCategoryListing = () => {
    const categories = this.state.dataArr;
    return (
      <FlatList
        key={Math.random()}      
        data={categories}
        renderItem={(item)=> <CategoryListItem category={item} key={Math.random()} />}
        keyExtractor={(item) => item.categoryId + Math.random().toString()}
      />
    );
  };

  render = () => {
    const { isLoading, isError, dataArr } = this.state;
    return (
      <SafeAreaView style={{height: hp('95%')}}>
        
        {/* Top Action bar */}
        <View 
            style={customStyle.topActionContainer}
          >
            <TextInput
            onChangeText={(text)=> this.getData(text)}

            placeholder='search'
            style={customStyle.searchInput}

            />
            <TouchableOpacity
            onPress={()=>this.setState({isShowFilterModal: true})}
             style={customStyle.filterContainer}>
              <Text style={{textAlign: 'center',
              paddingTop: 8, color: "#ffffff"}}>Filter {(this.state.filterValue) && <Text>*</Text>}</Text>
              </TouchableOpacity>

              {/* FilterModal */}
              <FilterModal 
                isVisible={this.state.isShowFilterModal}
                filterValue={this.state.filterValue}
                onSelectFilter={(selectedFilter) => this.setState({filterValue: selectedFilter})}
                onClearFilter={() => this.setState({filterValue: "", isShowFilterModal: false}, this.getData)}
                cancelAction={()=> this.setState({isShowFilterModal: false})}
                onSubmit={()=> this.setState({isShowFilterModal: false}, this.getData)}
               />
              {/* End FilterModal */}
            </View>

            {/* End Top action bar */}
        
        <ScrollView contentContainerStyle={{paddingBottom: '30%' }}>            
            
            {isLoading ? (
              <View style={{alignItems: 'center'}}>
                <Text>Loading...</Text>
              </View>
            ) : isError ? (
              <View style={{alignItems: 'center'}}>
                <Text>{isError}</Text>
              </View>
            ) : dataArr.length > 0 ? (
              <View>{this.getCategoryListing()}</View>
            ) : (
              <View style={{alignItems: 'center'}}>
                <Text>No Categories found</Text>
                <Button
                  title={"Add a category"}
                  onPress={() => this.props.navigation.push("Add category")}
                />
              </View>
            )}
          </ScrollView>          
          <FabButton onPress={()=> this.props.navigation.push("Add category")}/>

      </SafeAreaView>
    );
  };
}

export default withNavigation(CategoryListing);
