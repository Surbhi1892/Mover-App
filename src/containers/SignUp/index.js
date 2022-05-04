import { useNavigation } from '@react-navigation/native';
import { Brand } from 'components';
import {
  Box,
  Text,
  Button,
  useDisclose,
  useToast,
  Flex,
  Radio,
  ChevronDownIcon,
  Input,
  VStack,
  Checkbox,
  ScrollView,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TouchableOpacity, Pressable, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, createRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'theme';
import { fetchPostOffices } from 'store/PostOffices';
import ActionSheet from "react-native-actions-sheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import StepIndicator from 'react-native-step-indicator';
import {
  selectAllPostOffices,
} from 'store/PostOffices';
import ActionSheetCom from 'components/ActionSheetCom';
import SerialNumberModal from 'components/SerialNumberModal';
import {registerRes, fetchRegister } from 'store/Register';


const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#E10600',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#E10600',
  stepStrokeUnFinishedColor: '#E10600',
  separatorFinishedColor: '#E10600',
  separatorUnFinishedColor: '#E10600',
  stepIndicatorFinishedColor: '#fff',
  stepIndicatorUnFinishedColor: '#fff',
  stepIndicatorCurrentColor: '#E10600',
  stepIndicatorLabelFontSize: 14,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#fff',
  stepIndicatorLabelFinishedColor: '#E10600',
  stepIndicatorLabelUnFinishedColor: '#E10600',
  labelColor: '#fff',
  labelSize: 15,
  currentStepLabelColor: '#fff',
};

const SERIAL_NUM = ["AZE", "AA", "DYI", "MYI"]


const SignUpContainer = () => {
  const labels = ['Sifariş et', 'Ödəniş et', 'Nəticə'];
  const PHONE_PREFIXES = ['050', '051', '055', '070', '077', '099', '010'];
  const SERIAL_NUM = ["AZE", "AA", "DYI", "MYI"]

  const actionSheetRef = createRef();
  const actionSheetDisclose = useDisclose();
  const serialSheetDisclose = useDisclose();
  const toast = useToast();
  const navigation = useNavigation();

  const { isLoading, payload} = useSelector(registerRes);


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { Colors } = useTheme();
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  
  const offices = useSelector(selectAllPostOffices);
  const [name, setName] = useState("")
  const [id_card_prefix,setIdCardPre]=useState("AZE")
  const [pin,setPin]=useState("")
  const [address,setAddress]=useState("")
  const [office_id,setOffice_id] = useState("")
  const [current_year,setcurrentYear] = useState(new Date().getFullYear())
  const [ month,setmonth ] =useState(new Date().getMonth())
  const [ day ,setday] =useState(new Date().getDate() )
  const [stepActive ,setstepActive] = useState(false)
  const [email,setEmail]=useState("")
  const [phone,setPhone]=useState("")
  const [password,setPasword]=useState("")
  const [cnfrmPassword,setCnfrmPassword]=useState("")
  const [sexy,SetSexy]=useState("0")
  const [phonePrefix, setPhonePrefix] = useState('050');
  const [serialNo, setSerialNo] = useState('');
  const [check,setCheck]=useState(false)
  
  const [date, setDate] = useState("")
  const [office, setoffice] = React.useState('');

  // console.log("load",JSON.stringify(payload))



  const handleConfirm = (datee) => {
    console.warn("A date has been picked: ", datee);
    setDate(moment(datee).format('DD-MM-YYYY').toString())
    setDatePickerVisibility(false);
  };

  const showMessage =(message)=>{
    toast.show({
      status: "warning",
      title: message,
    });

  }

  const onPress = (name, id) => {
    console.log('onPress', name + "  " + id);
    actionSheetDisclose.onClose()
    setoffice(name)
    setOffice_id(id)

  };

  const onPressSerial = (name, id) => {
    console.log('onPress', name + "  " + id);
    serialSheetDisclose.onClose()
    setIdCardPre(name)

  };

  const onCancel = () => {
    actionSheetDisclose.onClose()
    serialSheetDisclose.onClose()
    // console.log('onCancel');
  };




  const PhoneInputLeft = (
    <Button
      onPress={() => { actionSheetRef.current?.setModalVisible() }}
      variant="ghost"
      size="xs"
      m="1"
      mr="0"
      p={0}
      pl="1"
      rightIcon={<ChevronDownIcon size={4} />}>
      {phonePrefix}
    </Button>
  );


  const SerialInputLeft = (
    <Button
      onPress={() => { serialSheetDisclose.onOpen() }}
      variant="ghost"
      size="xs"
      m="1"
      mr="0"
      p={0}
      pl="1"
      rightIcon={<ChevronDownIcon size={4} />}>
      {id_card_prefix}
    </Button>
  );


  const onSubmit =() => {


    if(active==0){
      valideateProfile()
    }else if(active == 1){
      validateAddress()
    }else if(active ==2){
      validateCardInfo()
    }
    // setActive(0)
    };


    const isEmailValid = (text) => {
      let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(String(text).toLowerCase())
 }
    

 useEffect(() => {

  console.log("payload=============>", JSON.stringify(payload))
if(payload != undefined)
  CheckResp(payload)

}, [payload]);


const CheckResp =(response)=>{

  if(response.status){

    toast.show({
      title: "uğurla qeydiyyatdan keçib",
      status: "success",
      description: response.message,
    })
    navigation.goBack();

  }else{
    toast.show({
      title: "Error",
      status: "error",
      description:response.message
    })

  }

}

  useEffect(() => {
    console.log("date", new Date().getFullYear())
    dispatch(fetchPostOffices());
  }, [dispatch]);

  const valideateProfile =()=>{

    var check = moment(date, 'DD-MM-YYYY');
    console.log("check",check.format("Y")+ "  "+date)
   

    if(name === ""){
        showMessage("Ad Məcburidir")
    }else if(name.trim().indexOf(" ") == -1){
      showMessage("Soyad Məcburidir")
    }else if(email === ""){
      showMessage("e-poçt Məcburi")
    }else if(!isEmailValid(email)){
      showMessage("Düzgün email ünvanı daxil edin")
    }else if(phone.length!=12){
      showMessage("Minimum 9 simvol olmalıdır")
    }else if(date === ""){
      showMessage("Doğum tarixi Məcburi")
    }else if (password === ""){
      showMessage("Şifrə Məcburi")
    }else if (password.length!=6){
      showMessage("Minimum 6 simvol olmalıdır")
    }else if (cnfrmPassword != password){
      showMessage("Təkrar şifrə düzgün deyil")
    }else{
      setActive(1)
    }
  }

  const validateAddress=()=>{

    if(address=== ""){
      showMessage("Ünvan Məcburi")
    }else if (office === ""){
      showMessage("Çatdırılma ofisi Məcburi")
    }else{
      setActive(2)
    }
  }

  const validateCardInfo =()=>{

    setstepActive(true)
    if(serialNo === ""){
      showMessage("Seriya nömrəsi Məcburi ")
    }else if (pin.length != 7){
      showMessage("Fin kodu Məcburi ")
    }else{
        register()
    }
  }

  const register=()=>{
    const splitName = name.split(' ');
    let terms = 0
    if(active){ terms = 1} else terms =0

    var check = moment(date, 'DD-MM-YYYY');


    const formData = new FormData();
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("phone_prefix", phonePrefix)
    formData.append("password", password)
    formData.append("password_confirmation", cnfrmPassword)
    formData.append("name",splitName[0] )
    formData.append("surname", splitName[1])
    formData.append("sexy", sexy)
    formData.append("id_card_prefix",id_card_prefix )
    formData.append("id_card", serialNo)
    formData.append("fin", pin)
    formData.append("address", address)
    formData.append("terms", terms)
    formData.append("points", office_id)
    formData.append("day", check.format('D'))
    formData.append("month", check.format('M'))
    formData.append("year", check.format('Y'))

    console.log("formDarta",JSON.stringify(formData))

    dispatch(fetchRegister({ data: formData }))

  }

  return (
    <>

      <VStack p={6} safeArea flex={1} alignItems="center" >
        <Flex flex={1} justifyContent="space-between" width="100%">
          <Box alignItems="center">
            <Brand width={152} height={21} color={Colors.primaryRed} />
            <Text fontWeight={600} fontSize={24} mt={25}>
              {t('common.signUp')}
            </Text>
          </Box>
          <View style={{}}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={active}
              labels={labels}
              stepCount={3}
              onPress={(position)=>{stepActive? setActive(position):null}}
            />
         <Text fontWeight={600} fontSize={13}  textAlign={"center"}>
             {active==0 ?t('signUp.profile'):active==1?t('signUp.delivery_info'):t('signUp.id_card_info')} 
            </Text>

          </View>
          <View style={{ height: "60%" }}>

            {active == 0 ?

              <ScrollView>
                <Box width="100%">
                  <Input
                    height={50}
                    name="Ad Soyad"
                    placeholder="Ad Soyad"
                    autoCompleteType="off"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    mb={3}
                    onChangeText={(text) => setName(text) }
                    value={name}
                  />

                  <Input
                    height={50}
                    name="email"
                    placeholder="Email"
                    autoCompleteType="off"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    mb={3}
                    onChangeText={(text) => setEmail(text) }
                    value={email}

                  />

                  <Input
                    height={50}
                    name="phone"
                    placeholder="Telefon"
                    maxLength={12}
                    keyboardType="number-pad"
                    InputLeftElement={PhoneInputLeft}
                    mb={3}
                    onChangeText={(text) => setPhone(text) }
                    value={phone}
                  />


                  <Pressable
                    onPress={() => setDatePickerVisibility(true)}>
                    <Text
                      borderWidth={0.5}
                      p={3}
                      borderRadius={4}
                      mb={3}
                      color={date !== "" ? "trueGray.900" : "gray.900"}
                      borderColor={"gray.500"}
                      fontSize="sm"
                    ><Icon
                        name='calendar-outline'
                        size={16}
                        style={{ color: "#B4B4B4", marginRight: 12 }}
                      />
                      {"  "}{date !== "" ? date : "Doğum tarixi"}</Text>

                  </Pressable>


                  <Radio.Group
                    m={2}
                    defaultValue={sexy}
                    name="exampleGroup"
                    flexDirection={"row"}
                    onChange={(value) => {
                      SetSexy(value)
                      }}
          
                  >
                    <Radio colorScheme="primary" value="0" my={1} size="sm">
                      Qadın
                    </Radio>
                    <Radio colorScheme="primary" value="1" my={1} size="sm" ml={5}>
                      Kişi
                    </Radio>
                  </Radio.Group>

                  <Input
                    height={50}
                    name="password"
                    placeholder="Şifrə"
                    secureTextEntry
                    mb={3}
                    onChangeText={(text) => setPasword(text) }
                    value={password}
                  />
                  <Input
                    height={50}
                    name="password"
                    placeholder="Şifrənin təkrarı"
                    secureTextEntry
                    mb={3}
                    onChangeText={(text) => setCnfrmPassword(text) }
                    value={cnfrmPassword}
                  />


                </Box>
              </ScrollView>
              :
              <View>
                {active == 1 ?
                  <Box width="100%">

                    <Input
                      height={50}
                      name="address"
                      placeholder="Ünvan"
                      autoCompleteType="off"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      mb={6}
                      onChangeText={(text) => setAddress(text) }
                      value={address}
  
                    />

                    <Pressable
                      onPress={actionSheetDisclose.onOpen}>
                      <View style={styles.input_layout}>
                        <Text
                          color={office !== "" ? "trueGray.900" : "gray.900"}
                          fontSize="xs"
                          width={"90%"}
                        > {office !== "" ? office : " Çatdırılma ofisi"}
                        </Text>

                        <Icon
                          name='chevron-down'
                          size={20}
                          style={{ color: "#B4B4B4", marginRight: 12 }}
                        />

                      </View>

                    </Pressable>

                  </Box>
                  :
                  <Box width="100%">

                    <Input
                      height={50}
                      name="Serial_number"
                      placeholder="Seriya nömrəsi"
                      autoCompleteType="off"
                      autoCapitalize="none"
                      keyboardType="number-pad"
                      mb={6}
                      maxLength={12}
                      InputLeftElement={SerialInputLeft}
                      onChangeText={(text) => setSerialNo(text) }
                      value={serialNo}
  
                    />

                    <Input
                      height={50}
                      name="fin_code"
                      placeholder="Fin kod"
                      autoCompleteType="off"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      mb={6}
                      maxLength={7}
                      onChangeText={(text) => setPin(text) }
                      value={pin}
  
                    />
                    <View style={{flexDirection:'row'}}>
                    <MaterialCommunityIcons 
                      size={20}
                      color={check?"red":"gray"}
                      name={check?"checkbox-marked":"checkbox-blank-outline"}
                      onPress={()=>setCheck(!check)}
                    />
                          <Text fontWeight={600} 
                              fontSize={12} 
                              ml={2} 
                              underline 
                              borderBottomColor={"red.500"} 
                              color={"red.500"}
                              onPress={()=>setCheck(!check)}
                              >
                        İstifadəçi qaydaları ilə razıyam
                      </Text>
                    </View>
                  
                  </Box>
                }
              </View>

            }

          </View>
          <Box width="100%">
            <Button
              onPress={() => {onSubmit()}}
              colorScheme="black"
              variant="outline">
              {active !== 2 ? t('signUp.next') : t('signUp.confirmSignUp')}
            </Button>
          </Box>
        </Flex>
      </VStack>


      <ActionSheet
        initialOffsetFromBottom={1}
        ref={actionSheetRef}
        bounceOnOpen={true}
        drawUnderStatusBar={true}
        bounciness={4}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <View
          style={{ paddingHorizontal: 12, paddingBottom: 50 }}>
          {PHONE_PREFIXES.map(phone => (
            <TouchableOpacity
              onPress={() => {
                actionSheetRef.current?.hide();
                setPhonePrefix(phone)
              }}
              key={phone} >
              <Text fontWeight={600} fontSize={12} mt={5}>
                {phone}
              </Text>
            </TouchableOpacity>
          ))}

        </View>
      </ActionSheet>

      <ActionSheetCom
        isOpen={actionSheetDisclose}
        data={offices}
        onPress={(name, id) => onPress(name, id)}
        onCancel={() => onCancel()}
      />

      <SerialNumberModal
        isOpen={serialSheetDisclose}
        data={SERIAL_NUM}
        onPress={(name) => onPressSerial(name)}
        onCancel={() => onCancel()}
      />


      {isDatePickerVisible &&
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={new Date(current_year-13, month, day)}
          maximumDate={new Date(current_year-13, month, day)}
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
      }


    </>


  );
};

const styles = StyleSheet.create({
  input_layout: {
    borderWidth: 0.5,
    padding: 3,
    borderRadius: 4,
    borderColor: 'rgba(180, 180, 180, 0.6)',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
})

export default SignUpContainer;
