import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { CustomBackdrop, SheetBlurBackground } from 'components';
import {
  Button,
  ChevronDownIcon,
  Input,
  NativeBaseProvider,
  useControllableState,
  useDisclose,
  usePropsResolution,
} from 'native-base';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Pressable, Text, View } from 'react-native';

export const SelectContext = React.createContext({
  onValueChange: () => {},
  selectedValue: null,
  _selectedItem: {},
  _item: {},
});

const Select = props => {
  const {
    sheetName,
    isDisabled,
    onValueChange,
    selectedValue,
    children,
    dropdownIcon,
    dropdownCloseIcon,
    dropdownOpenIcon,
    placeholder,
    accessibilityLabel,
    defaultValue,
    data,
    keyExtractor,
    renderItem,
    _item,
    _selectedItem,
    size,
    ...resolvedProps
  } = usePropsResolution('Input', props, {
    isDisabled,
  });

  const [value, setValue] = useControllableState({
    value: selectedValue,
    defaultValue,
    onChange: newValue => {
      onValueChange && onValueChange(newValue);
      onClose();
    },
  });

  const { isOpen, onOpen, onClose } = useDisclose();

  // refs
  const bottomSheetRef = useRef();

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  // effects
  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  // callbacks
  const handlePresentPress = useCallback(() => {
    onOpen();
  }, [onOpen]);

  // renders
  const renderBackdrop = useCallback(
    backdropProps => <CustomBackdrop {...backdropProps} name={sheetName} />,
    [sheetName]
  );

  //   const itemsList = React.Children.map(children, child => {
  //     return {
  //       label: child.props.label,
  //       value: child.props.value,
  //     };
  //   });

  //   const selectedItemArray = itemsList.filter(item => item.value === value);

  //   const selectedItem =
  // selectedItemArray && selectedItemArray.length ? selectedItemArray[0] : null;

  const { variant, customDropdownIconProps, _actionSheetContent, ...newProps } =
    usePropsResolution('Select', props);

  const rightIcon =
    isOpen && dropdownOpenIcon ? (
      dropdownOpenIcon
    ) : !isOpen && dropdownCloseIcon ? (
      dropdownCloseIcon
    ) : dropdownIcon ? (
      dropdownIcon
    ) : (
      <ChevronDownIcon {...customDropdownIconProps} />
    );

  const commonInput = (
    <Input
      aria-hidden={true}
      importantForAccessibility="no"
      value={selectedValue}
      placeholder={placeholder}
      editable={false}
      focusable={false}
      size={size}
      variant={variant}
      InputRightElement={rightIcon}
      isDisabled={isDisabled}
    />
  );

  return (
    <>
      <Pressable accessibilityRole="button" onPress={handlePresentPress}>
        <View pointerEvents="none">{commonInput}</View>
      </Pressable>
      <BottomSheetModal
        name={sheetName}
        index={0}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundComponent={SheetBlurBackground}
        onDismiss={onClose}>
        <NativeBaseProvider>
          <SelectContext.Provider
            value={{
              onValueChange: setValue,
              selectedValue: value,
              _selectedItem: _selectedItem ?? {},
              _item: _item ?? {},
            }}>
            <BottomSheetFlatList
              renderItem={renderItem}
              data={data}
              keyExtractor={keyExtractor}
            />
          </SelectContext.Provider>
        </NativeBaseProvider>
      </BottomSheetModal>
    </>
  );
};

export default Select;
