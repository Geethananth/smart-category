import { Button, Modal, Text, View, TouchableOpacity } from "react-native"
import { customStyle } from "../../assets/styles/custom.style"

export const FilterModal = ({isVisible, filterValue, cancelAction, onSelectFilter, onSubmit, onClearFilter})=> {
    return <Modal
          animationType="fade"
          transparent={true}
          visible={isVisible}
          statusBarTranslucent={true}
          onRequestClose={cancelAction}
        >
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              backgroundColor: "rgba(21,19,19, 0.8)",
              padding: 20,
            }}
          >
            <View style={customStyle.modalCenteredView}>
            <View style={customStyle.modalView}>
              {/* Radio Button */}
              <TouchableOpacity
              onPress={()=> onSelectFilter('featured')}
              >
              <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
              <View style={{
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#0074cc',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
        
          
            {(filterValue == "featured") && <View style={{
              height: 12,
              width: 12,              
              borderRadius: 6,
              backgroundColor: '#0074cc',
            }}/>}
        
        
      </View>
      <Text style={{marginLeft:20}}>Featured</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity
              onPress={()=> onSelectFilter('not-featured')}
              >
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#0074cc',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
          
          {(filterValue == "not-featured") && <View style={{
              height: 12,
              width: 12,              
              borderRadius: 6,
              backgroundColor: '#0074cc',
            }}/>}       
      </View>
      <Text style={{marginLeft:10}}>Not Featured</Text>
      </View>
      </TouchableOpacity>
              {/* End Radio Button */}

              <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 20, width: '100%'}}>
              
              <Button color="orange" title="Clear filters" onPress={onClearFilter} />
              <Button  title="Submit" onPress={onSubmit} />
              </View>

            </View>
            </View>

            </View>
          

        </Modal>
}