const profileEditValidations = {
  name: {required: {value: true, message: 'Ad məcburidir'}},
  surname: {required: {value: true, message: 'Soyad məcburidir'}},
  mobile: {required: {value: true, message: 'Telefon məcburidir'}},
  address: {required: {value: true, message: 'Ünvan məcburidir'}},
  id_card: {required: {value: true, message: 'Məcburidir'}},
  id_photo: {required: {value: true, message: 'Məcburidir'}},
  fin: {required: {value: true, message: 'Fin məcburidir'}},
  birthday: {required: {value: true, message: 'Təvəllüd məcburidir'}},
  office_id: {required: {value: true, message: 'Ofis məcburidir'}},
};

export default profileEditValidations;
