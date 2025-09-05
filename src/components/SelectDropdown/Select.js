import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import CommanText from '../CommanText';
import styles from './Styles/index';

const SelectDropdown = props => {
  const [value, setValue] = useState(props?.value || (props.MultiSelectDropdown ? [] : null));

  useEffect(() => {
    if (props?.value !== undefined && props?.value !== null) {
      setValue(props.value);
    }
  }, [props?.value]);
console.log(' props.data select :',props.data);

  return (
    <View style={styles.dropdownConteiner}>
      {props.label && (
        <CommanText
          commanText={props.label}
          commanTextstyle={[styles.textStyle, props.commonSelectTextStyle]}
        />
      )}

      {props.MultiSelectDropdown ? (
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={props.data}
          search
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder={props.placeholder}
          searchPlaceholder={props.searchPlaceholder}
          value={value}              
          onChange={item => {        
            setValue(item);
            props.onSelectChange && props.onSelectChange(item);
          }}
          renderItem={(item, selected) => (
            <View style={{ padding: 10 }}>
              <Text style={{ color: selected ? 'blue' : '#000', fontSize: 16 }}>
                {item.name}
              </Text>
            </View>
          )}
        />
      ) : (
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={props.data}
          multiple={props.multiple}
          search
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder={props.placeholder}
          searchPlaceholder={props.searchPlaceholder}
          value={value}
          dropdownPosition={props.dropdownPosition}
          onChange={item => {
            setValue(item.id);
            props.onSelectChange && props.onSelectChange(item.id);
          }}
          renderItem={(item, selected) => (
            <View style={{ padding: 10 }}>
              <Text style={{ color: '#000', fontSize: 16 }}>{item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default SelectDropdown;
