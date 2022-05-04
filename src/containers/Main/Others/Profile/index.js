import { ScrollView, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddressForm from './components/AddressForm';
import PersonalInformationForm from './components/PersonalInformationForm';
import SectionHeader from './components/SectionHeader';
import NavigationHeader from 'components/NavigationHeader'
import NavigationBackButton from 'components/NavigationBackButton';

import { SafeAreaView } from 'react-native-safe-area-context';
const ProfileContainer = () => {
  const { t } = useTranslation();

  const [isEditingGeneralInfo, setIsEditingGeneralInfo] = useState(false);
  const [isEditingAddresses, setIsEditingAddresses] = useState(false);

  const onPressEditGeneralInfo = useCallback(() => {
    setIsEditingGeneralInfo(prevIsEditing => !prevIsEditing);
  }, []);

  const onPressEditAddresses = useCallback(() => {
    setIsEditingAddresses(prevIsEditing => !prevIsEditing);
  }, []);

  return (
    <SafeAreaView flex={1}>
    <NavigationHeader
    title={'Profil'}
    headercolor={"white"}
    titleColor={"primary.900"}
    left={<NavigationBackButton color ={"primary.900"}/>}
  />
    <ScrollView mx={5} flex={1} my={1}>
      <VStack mt={7}>
        <SectionHeader
          onPress={onPressEditGeneralInfo}
          title={t('profile.generalInfoSectionHeader')}
          rightButtonTitle={
            isEditingGeneralInfo ? t('common.done') : t('common.edit')
          }
        />
        <PersonalInformationForm isEditing={isEditingGeneralInfo} />
      </VStack>
      <VStack mt={7}>
        <SectionHeader
          onPress={onPressEditAddresses}
          title={t('profile.addressesSectionHeader')}
          rightButtonTitle={isEditingAddresses ? '' : t('common.edit')}
        />
        <AddressForm isEditing={isEditingAddresses} />
      </VStack>
    </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileContainer;
