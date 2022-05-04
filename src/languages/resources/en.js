export default {
  name: 'English',
  common: {
    email: 'Email',
    password: 'Şifrə',
    signUp: 'Qeydiyyat',
    signIn: 'Daxil ol',
    signout:'Çıxış et',
    details: 'Ətraflı',
    price: 'Qiymət',
    weightAndShipping: 'Çəki və çatdırılma',
    weight: 'Çəki',
    kg: 'kq',
    bundle: 'Bağlama',
    tracking: 'Tracking',
    delivery: 'Çatdırılma',
    paid: 'Ödənilib',
    notPaid: 'Ödənilməyib',
    pay: 'Ödə',
    description: 'Qeyd',
    enterDescription: 'Qeyd daxil edin',
    cancel: 'Ləğv et',
    confirm: 'Təsdiq et',
    edit: 'Düzəliş et',
    name: 'Ad',
    surname: 'Soyad',
    phone: 'Telefon',
    idCardNo: 'Ş/V seriya nömrəsi',
    finCode: 'FIN',
    birthday: 'Doğum tarixi',
    address: 'Adres',
    balance: 'Balansı',
    retry: 'Yenidən cəhd et',
    successPayment: 'Ödənişiniz uğurlu oldu',
    errorPayment: 'Ödəniş zamanı xəta baş verdi',
    goBack: 'Geri qayıt',
    loadingPaymentPage: 'Ödəniş səhifəsi yüklənir',
    forgot_password:'Şifrəni unutmuşam'
  },
  validation: {
    required: 'Bu xana boş qoyula bilməz.',
  },
  // SCREENS
  signIn: {
    name: 'Giriş',
  },
  signUp: {
    name: 'Qeydiyyat',
    confirmSignUp: 'Qeydiyyatı təsdiqlə',
    next:'növbəti',
    profile:'Profil məlumatları',
    delivery_info:'Çatdırılma məlumatları',
    id_card_info:'Şəxsiyyət vəsiqəsi məlumatları'   
  },
  dashboard: {
    name: 'Əsas',
    customerCode: 'Müştəri kodu',
    secretCode: 'Giriş kodu',
    weightWidgetTitle: 'Çəki balansı ilə ödəniş',
    weightWidgetDescription: 'Uyğun paket seç, sərfəli sifariş et!',
  },
  dashboardDetail: {
    limitDesc: 'Aylıq limit',
    tryBalance: 'TRY balansı',
    usdBalance: 'USD balansı',
    activeMyOrders: `Aktiv \nSifarişlər`,
    activeOrders: `Aktiv \nBağlamalar`,
  },
  orders: {
    name: 'Bağlamalarım',
  },
  newOrder:{
    order:"Sifariş",
    productLink:"Məhsulun linki*",
    size:"Ölçü*",
    color:"Rəng*",
    note:"Qeyd* ( Məhsulun adı və s.)",
    price:"Qiymət*",
    cargo:"Türkiyə daxili kargo",
    commission:"+5% Komissiya",
    urgentOrder:"Təcili sifariş olsun? (2$)",
    newLink:"+ Yeni link əlavə et",
    productType: 'Məhsulun növü*',

  },
  createOrder: {
    name: 'Bəyan et',
    shopName: 'Mağaza adı*',
    trackingId: 'Tracking ID (İzləmə kodu)*',
    orderNumber: 'Sifariş nömrəsi*',
    orderDate: 'Sifariş tarixi*',
    productType: 'Məhsulun növü*',
    note:"Qeyd",
    price: 'Qiymət*',
    comment: 'Qeyd*',
    addInvoice: 'İnvoys faylı əlavə etmək üçün bura vurun',
  },
  
  orderDetail: {
    name: 'Bağlama #{{id}}',
    insurance: 'Zəmanət var',
    noInsurance: 'Zəmanət yoxdur',
    noOrderImages: 'Bağlamaya aid şəkil yoxdur',
    buyInsurance: 'Zəmanət al',
    buyInsuranceContent:
      '“Zəmanət al” xidməti ilə bağlamanız tərəfimizdən sığortalanır. Bağlamanızda hər hansı prablem çıxdığı və ya hər hansı səbəbdən imtina etdiyiniz halda Məhsulu bakı anbarımızdan satıcıya geri qaytara bilərsiniz. ”Zəmanər al” xidmətindən istifadə ha2qqı məhsulun dəyərinə görə mavafiq qaydada hesablanır.',
    orderIsNotMine: 'Mənə aid deyil',
    orderIsNotMineContent:
      'Seçdiyiniz bağlamanın sizə aid olmadığını bildirdiniz. Müraciət araşdırmaya götürüləcək. Araşdırma 3 iş günü ərzində həllini tapacaq və sizə aid bağlama profilinizə əlavə ediləcək. əməliyyatı etmək istədiyinizdən əminsiniz?',
    orderReturnToSeller: 'Satıcıya qaytar',
    orderReturnToSellerContent:
      'Xidmətdən istifadə etdiyiniz üçün seçdiyiniz bağlamanı satıcı firmaya geri qaytaracağıq. “Satıcıya qaytar” xidmətindən istifadə haqqı 1 (bir) bağlama üçün {{amount}} USD hesablanır.',
    orderRequestImagePackage: 'Şəkil tələb et',
    returnToSellerCode: 'İadə kodu',
    enterReturnToSellerCode: 'İadə kodunu daxil edin',
    buyWithAmount: 'Al: {{amount}} {{currency}}',
    reason: 'Səbəb',
    enterReason: 'Səbəb daxil edin',
  },
  myOrders: {
    name: 'Sifarişlərim',
  },
  externalAddresses: {
    name: 'Xaricdəki ünvanlarım',
  },
  weightBalance: {
    infoText: `Balansınıza əlavə etdiyiniz daşınma həcmini sifariş etdiyiniz gündən növbəti 30 gün ərzində istifadə edə bilərsiniz. Kampaniya dövründə sifariş etdiyiniz bütün bağlamalar QRAMA-QRAM tariflə hesablanacaq və hesabınızdakı çəki balansından çıxılacaq. "Çəki paketi" yalnız paketi aldıqdan sonra Türkiyə anbarımıza daxil olmuş bağlamalara şamil edilir. ZƏRURİ QEYD: “Çəki balansı”nız 30 günlük istifadə müddətinin sonunda sıfırlanacaq.`,
  },
  profile: {
    name: 'Profil',
    generalInfoSectionHeader: 'Profil məlumatları',
    addressesSectionHeader: 'Ünvan məlumatları',
  },
  courierOrder: {
    name: 'Kuriyer sifarişi',
  },
  balance: {
    name: 'Balans və sifarişlər',
  },
  customerSupport: {
    name: 'Sorğular',
  },
  news: {
    name: 'Xəbərlər',
  },
  shippingTerms: {
    name: 'Daşınma şərtləri',
  },
  azericardPayment: {
    name: 'Ödəniş',
  },
  orderPaymentModal: {
    loading: 'Ödəniş məlumatları yüklənir',
    title: 'Ödəniş üçün balansdan çıxarılacaq məbləğlər',
  },
};
