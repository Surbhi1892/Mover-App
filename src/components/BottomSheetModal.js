import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal as GorhomBSM,
} from '@gorhom/bottom-sheet';
import { Alert } from 'react-native';

const BottomSheetModal = ({ children }) => {
  // state
  const [backdropPressBehavior, setBackdropPressBehavior] =
    useState('collapse');

  // refs
  const bottomSheetRef = useRef();

  // variables
  const snapPoints = useMemo(() => ['50%', '100%'], []);

  //#region callbacks
  const handleDismiss = useCallback(() => {
    Alert.alert('Modal Been Dismissed');
  }, []);
  const handlePresentPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handleTogglePressBehavior = useCallback(() => {
    setBackdropPressBehavior(state => {
      switch (state) {
        case 'none':
          return 'close';
        case 'close':
          return 'collapse';
        case 'collapse':
          return 'none';
      }
    });
  }, []);
  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  const handleCollapsePress = useCallback(() => {
    bottomSheetRef.current?.collapse();
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);
  //#end region

  // renders
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop {...props} pressBehavior={backdropPressBehavior} />
    ),
    [backdropPressBehavior]
  );

  return (
    <GorhomBSM
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onDismiss={handleDismiss}>
      {children}
    </GorhomBSM>
  );
};

export default BottomSheetModal;
