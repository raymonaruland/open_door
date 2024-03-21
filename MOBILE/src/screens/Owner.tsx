import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, Button, FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { getRequest,putRequest, postRequest } from "../../ApiServices/index";

const OwnerScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState('');
  const [broughtYear, setBroughtYear] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [items, setItems] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenPopup = (item) => {
    setPopupVisible(true); // Set the state to show the popup
    setSelectedItem(item); // Set the selected item to be updated
  };

  const fetchItems = async () => {
    try {
      const response = await getRequest(`api/v1/items`);
      setItems(response.data.data); // Assuming your API response contains an array of items
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const Popup = () => {
    const [newStatus, setNewStatus] = useState(selectedItem.item_status);
    const params = {
      item_status:newStatus,
    };
  
    const handleUpdateStatus = async () => {
      try {
        // Make a PUT request to update the status
        await putRequest(`api/v1/items/${selectedItem.id}`, params);
        // Close the popup after successful update
        setPopupVisible(false);
        // Fetch updated items
        fetchItems();
      } catch (error) {
        console.error("Error updating status:", error);
      }
    };
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={popupVisible}
        onRequestClose={() => setPopupVisible(false)}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popupContent}>
            <Text style={styles.popupTitle}>Update Status</Text>
            <Picker
              selectedValue={newStatus}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) => setNewStatus(itemValue)}
            >
              <Picker.Item label="Open" value="Open" />
              <Picker.Item label="Booked" value="Booked" />
              <Picker.Item label="Sold" value="Sold" />
            </Picker>
            <Button title="Update" onPress={handleUpdateStatus} />
          </View>
        </View>
      </Modal>
    );
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOpenPopup(item)}>
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemLabel}>Name:</Text>
        <Text style={styles.itemValue}>{item.name}</Text>

        <Text style={styles.itemLabel}>Owner:</Text>
        <Text style={styles.itemValue}>{item.owner_name}</Text>

        <Text style={styles.itemLabel}>Type:</Text>
        <Text style={styles.itemValue}>{item.type}</Text>

        <Text style={styles.itemLabel}>Purchase Date:</Text>
        <Text style={styles.itemValue}>{item.purchase_date}</Text>

        <Text style={styles.itemLabel}>Phone:</Text>
        <Text style={styles.itemValue}>{item.phone}</Text>

        <Text style={styles.itemLabel}>Address:</Text>
        <Text style={styles.itemValue}>{item.address}</Text>

        <Text style={styles.itemLabel}>Post Date:</Text>
        <Text style={styles.itemValue}>{item.post_date}</Text>
      </View>
      <View style={[styles.itemStatus, { backgroundColor: item.item_status === 'Open' ? 'green' : 'yellow' }]}>
        <Text style={styles.itemStatusText}>{item.item_status}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );

  const CreateItem = async () => {
    const params = {
      name: itemName,
      owner_name: ownerName,
      purchase_date: broughtYear,
      phone: phoneNumber,
      address: address,
      post_date: new Date().toLocaleString(),
      type: type,
      item_status: 'Open',
    };

    try {
      let response = await postRequest(`api/v1/items`, params);
      setModalVisible(false);
      fetchItems(); // Refresh items after creating a new one
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" type="material" color="#517fa4" size={40} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add New Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={itemName}
              onChangeText={text => setItemName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Purchase Date"
              value={broughtYear}
              onChangeText={text => setBroughtYear(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Owner Name"
              value={ownerName}
              onChangeText={text => setOwnerName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={text => setAddress(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Type"
              value={type}
              onChangeText={text => setType(text)}
            />
            {/* Other input fields */}
            <Button title="Add Item" onPress={CreateItem} />
          </View>
        </View>
      </Modal>

      {/* Add Item Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="add-circle" type="material" color="#517fa4" size={50} />
      </TouchableOpacity>

      {/* FlatList to display items */}
      <View style={{ flex: 1 }}>
    {/* Render items list */}
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
    {/* Render popup */}
    {popupVisible && <Popup />}
  </View>
    </View>
  );
};

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Ensure the Add icon stays on top
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemDetails: {
    width: '70%', // Adjust as needed
    padding: 16,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  itemValue: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  itemStatus: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  itemStatusText: {
    color: 'rgba(0,0,0,0.5)',
    fontWeight: 'bold',
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
};


export default OwnerScreen;
