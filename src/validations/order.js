const orderValidations = {
  shop: {required: {value: true, message: 'Mağaza məcburidir'}},
  date: {required: {value: true, message: 'Tarix məcburidir'}},
  type: {required: {value: true, message: 'Tip məcburidir'}},
  shop_order_id: {
    required: {value: true, message: 'Məcburidir'},
  },
  productname:{required:{value:true,message:'məhsulun adı məcburidir'}},
  orderNumber:{required:{value:true,message:'sifariş nömrəsi məcburidir'}},
  productType:{required:{value:true,message:"məhsul növü məcburidir"}},
  note:{required:{value:true,message:"qeyd məcburidir"}},
  order_date:{required:{value : true, message:'sifariş tarixi məcburidir'}},
  tracking: {required: {value: true, message: 'Tracking məcburidir'}},
  price: {required: {value: true, message: 'Qiymət məcburidir'}},
  currency: {required: {value: true, message: 'Valyuta məcburidir'}},
  comment: {required: {value: true, message: 'Qeyd məcburidir'}},
  file: {required: {value: true, message: 'Fayl məcburidir'}},
};


export default orderValidations;
