import { useNavigation } from '@react-navigation/native';
import { Error } from 'components';
import { PAYMENT_TYPES } from 'containers/Main/AzericardPayment';
import { DOLLAR_UTF, MANAT_UTF } from 'helpers/Constants';
import { safeAwait } from 'helpers/safeAwait';
import {
  Modal,
  Button,
  Input,
  VStack,
  Text,
  FormControl,
  Center,
  NativeBaseProvider,
} from "native-base"
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CameraRoll from './CameraRoll';
import { selectAuth } from 'store/Auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Portal } from 'react-native-paper';

const BottomFileModel = ({ isOpen, onPress, onCancel }) => {
  const { bottom } = useSafeAreaInsets();

  const containerStyle = {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 100,
  };

  const { t } = useTranslation();
  const { profile } = useSelector(selectAuth);

  const [isLoading, setIsLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false)

  const onPressPay = useCallback(() => {
    onClose();
  }, []);

  const onSelectImage = (asset) => {
    const { filename, fileSize, uri } = asset.node.image;
    const parsedFilename = filename || uri.replace(/^.*[\\\/]/, '');
    // setgalleryModal(false)
    const imageData = {
      name: parsedFilename,
      size: fileSize || 0,
      uri,
      type: 'image/jpg',
    };
    // onChangeImage(imageData);
    onPress(imageData)
    console.log("image",imageData)
  };


  return (
    // <Modal
    //     visible={isOpen}
    //     onDismiss={onCancel}
    //     contentContainerStyle={containerStyle}>
    //     <TouchableWithoutFeedback>
    //         <CameraRoll onSelectImage={onSelectImage} />
    //     </TouchableWithoutFeedback>
    //     <Button
    //         // style={ImageInputStyles.closeModal}
    //         onPress={onCancel}>
    //         Bağla
    //     </Button>
    // </Modal>

    <Modal
      flex={1}
      mt={250}
      animationPreset='slide'
      size="full"
      isOpen={isOpen}
      onClose={onCancel}
      closeOnOverlayClick={false}>
      <Modal.Content
        borderRadius={10}
        backgroundColor="white"
        flex={1}
        >
         <TouchableWithoutFeedback>
             <CameraRoll onSelectImage={onSelectImage} />
         </TouchableWithoutFeedback>
              <Button
          style={[styles.choose_image, { backgroundColor: 'white' }]}
          onPress={onCancel}>
                      <Text fontSize={12} color={'grey'}>
                      Bağla
                                </Text>

             
         </Button>

      </Modal.Content>
    </Modal>

  );
};

const styles = StyleSheet.create({
  top: {
    marginBottom: "auto",
    marginTop: 0,
  },
  bottom: {
    marginBottom: 0,
    marginTop: "auto",
  },
  left: {
    marginLeft: 0,
    marginRight: "auto",
  },
  right: {
    marginLeft: "auto",
    marginRight: 0,
  },
  center: {},
  choose_image: {
    margin: '5%',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,

  },

});
export default BottomFileModel;
