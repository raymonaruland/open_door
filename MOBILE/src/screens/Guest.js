import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getRequest,putRequest } from '../../ApiServices/index';

const GuestScreen = () => {
  const [items, setItems] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [updatedItems, setUpdatedItems] = useState(items);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getRequest(`api/v1/items`);
      setItems(response.data.data);
      // Extract and set the distinct types from the items
      const distinctTypes = [...new Set(response.data.data.map(item => item.type))];
      setTypes(distinctTypes);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const toggleStatus = async (itemId, currentStatus) => {
    const updatedStatus = currentStatus === 'Open' ? 'Booked' : 'Open';
    try {
      const response = await putRequest(`api/v1/items/${itemId}`, { item_status: updatedStatus });
      console.log(">>>>>>>>>",)
      if (response.status === 200) {
        fetchItems();
        const updatedList = updatedItems.map(item =>
          item.id === itemId ? { ...item, item_status: updatedStatus } : item
        );
        setUpdatedItems(updatedList);
      } else {
        console.error("Failed to update status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const renderItem = ({ item }) => (
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
      <TouchableOpacity
        style={[styles.itemStatus, { backgroundColor: item.item_status === 'Open' ? '#4caf50' : item.item_status === 'Booked' ? '#f44336' : '#ffeb3b' }]}
        onPress={() => toggleStatus(item.id, item.item_status)}
      >
        <Text style={styles.itemStatusText}>{item.item_status === 'Open' ? 'Book' : item.item_status === 'Booked' ? 'Cancel' : item.item_status}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Type:</Text>
        <Picker
          selectedValue={selectedType}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedType(itemValue)}
        >
          <Picker.Item label="All" value="" />
          {types.map((type, index) => (
            <Picker.Item key={index} label={type} value={type} />
          ))}
        </Picker>
      </View>
      <FlatList
        data={selectedType ? items.filter(item => item.type === selectedType) : items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 50,
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
    flex: 1,
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
    width: 100,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  itemStatusText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
});

export default GuestScreen;
