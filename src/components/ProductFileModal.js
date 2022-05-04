
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Modal,
  Spinner,
  Text,
} from 'native-base';
import { Pressable, StyleSheet, View } from 'react-native';

import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DocumentPicker from 'react-native-document-picker';


const ProductFileModal = ({ isOpen, onPress, onCancel }) => {
  
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);

  const onPressPay = useCallback(() => {
    onPress("image", "");

  }, []);


  const onPressFileOption = async () => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });
        const fileData = {
            uri: res.uri,
            name: res.name,
            size: res.size,
            type: res.type,
        };
        onPress("doc", fileData);
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
        } else {
            throw err;
        }
    }
};


  const renderContent = useCallback(() => {
    return (
      <>
        <Text fontSize="md" padding="3">
          Şəkli haradan seçmək istəyirsiz?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
          }}>
          <Button
            color={'white'}
            style={[styles.pic_style, { marginRight: '3%' }]}
            onPress={onPressPay}>
            <Text fontSize={12} color={'black'}>
              Şəkil seç
            </Text>
          </Button>

          <Button
            color={'white'}
            style={[styles.file_style, { marginLeft: '3%' }]}
            onPress={onPressFileOption}>
            <Text fontSize={12} color={'white'}>
              Fayl seç
            </Text>
          </Button>
        </View>
      </>
    );
  }, [error, isLoading, onCancel, onPressPay, paymentDetails,  t]);

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={onCancel}
      closeOnOverlayClick={false}>
      <Modal.Content
        borderRadius={10}
        backgroundColor="white"
        maxWidth="400px"
        p={5}>
        {renderContent()}
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({
  registerButton: {
    paddingVertical: 4,
    borderColor: '#37AAEA',
    borderRadius: 4,
  },
  dialogTitle: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  choose_image: {
    marginBottom: '5%',
    backgroundColor: 'white',
    borderColor: '#37AAEA',
    borderWidth: 1,
    padding: 5,
  },
  pic_style: {
    marginBottom: '5%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
  },
  file_style: {
    marginBottom: '5%',
    padding: 5,
  },
});
export default ProductFileModal;
