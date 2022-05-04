const validation = {
  name: {required: {value: true, message: 'Ad məcburidir'}},
  email: {
    required: {value: true, message: 'Email məcburidir'},
    pattern: {
      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Yalnış email formatı',
    },
  },
  password: {
    required: {value: true, message: 'Şifrə məcburidir'},
  },
};

export default validation;
