import { ExternalAddressesAccordion } from 'components';
import { Container,ScrollView,Text } from 'native-base';
import React from 'react';

import { useSelector } from 'react-redux';
import { selectExternalAddresses } from 'store/ExternalAddresses';
import NavigationHeader from 'components/NavigationHeader'
import NavigationBackButton from 'components/NavigationBackButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const TermsOfShipping = () => {
  const { addresses } = useSelector(selectExternalAddresses);
  return (
    <SafeAreaView style={{flex:1}}>
    
      
    <NavigationHeader
        title={'Daşınma şərtləri'}
        headercolor={"white"}
        titleColor={"primary.900"}
        left={<NavigationBackButton color ={"primary.900"} />}
      />

    <ScrollView>

    <Text fontSize="xs" fontWeight="semibold" padding={5}>
    1. Mover şəxsi istifadə və kuryer yüklərinin Azərbaycana daşınmasını həyata keçirir. Hazırda şəxsi istifadə limiti Azərbaycanda bir təqvim ayı ərzində 300 (USD) (çatdırılma haqqı daxil olmaqla) ABŞ dolları təşkil edir. Şəxsi istifadə limitinə daxil olan məhsulların kommersiya məqsədli olmadığı və məhz şəxsi istifadə üçün olduğu əsaslandırıla bilməlidir. Fiziki şəxs şəxsi istifadə limitini keçdikdə və ya yükünün kommersiya məqsədli olduğu qənəati yarandıqda həmin yük gömrük orqanı tərəfindən gömrük rüsumuna və əlavə dəyər vergisinə tabe edilir. Ətraflı məlumat üçün aşağıdakı linkə daxil ola bilərsiniz: https://c2b.customs.gov.az/Tnved_public.aspx

2. Sifarişçinin yükü gömrük orqanı tərəfindən saxlandıqda “Daşıyıcı” bu barədə sifarişçiyə məlumat verir. Sifarişçi gömrükdə saxlanmış bağlamasını özü götürmək istədikdə, “Daşıyıcı”ya bağlamanın daşınma haqqını ödəyir. “Daşıyıcı” isə öz növbəsində sifarişçiyə bağlamanı təhvil alması üçün gömrük orqanı tərəfindən verilmiş barkod təqdim edir. Sifarişçi bu barkod əsasında bağlamasını Hava Nəqliyyatında Baş Gömrük İdarəsində rəsmiləşdirir və Bakı Karqo Terminalında saxlama xərclərini ödəyərək yükünü təhvil alır.

3. Sifarişçinin yükü gömrük orqanları tərəfindən saxlanıldıqda sifarişçi “Daşıyıcı”nın Gömrük Məsləhətçisi Xidmətindən də istifadə edə bilir. Gömrük Məsləhətçisi Xidməti əlavə ödənişli xidmətdir və sifarişçinin etibarnaməsi əsasında həyata keçirilir. Bu zaman “Daşıyıcı” sifarişçinin adından çıxış edərək, bütün rəsmiiləşdirmə əməliyyatlarını həyata keçirir və sifarişçinin yerinə gömrük ödənişlərini icra edir. Ödəniş edildikdən sonra sifariş imtinası qəbul edilmir. Sifarişçi bağlamaya görə “Daşıyıcı”nın ödədiyi gömrük rüsumu və daşınma haqqını tam şəkildə ödədikdən sonra bağlamasını təhvil alır. Gömrük Məsləhətçisi Xidmətinin qiyməti 1 (bir) bağlama üçün 30 (otuz) AZN-dir.

4. Sifariş edilən malların sığortalanması “Daşıyıcı” tərəfindən həyata keçirilmir və buna görə şirkət heç bir məsuliyyət daşımır. Bağlama "Daşıyıcı"nın xarici anbarında təhvil alınana qədər "Daşıyıcı" bağlama üzərində heç bir məsuliyyət daşımır.

5. Sifariş əsasında daşınan bağlamadakı əşyanın qüsurlu olmasına, məhsulun ölçüsünün, rənginin, çeşidinin və s. səhv gəlməsinə görə “Daşıyıcı” heç bir məsuliyyət daşımır. Bu kimi hallarda sifarişçi problemin aradan qaldırması üçün iradını ancaq satıcı mağazaya bildirə bilər.

6. Sifariş edilmiş bağlama “Daşıyıcı”nın ofisinə daxil olduqdan sonra “Daşıyıcı” tərəfindən sifarişçiyə bu barədə SMS, mobil tətbiq və ya e-mail vasitəsilə məlumat verilir. Sadalanan bu vasitələrdən (zəng, SMS, poçt, e-mail) hər hansı biri ilə sifarişçiyə məlumat verildikdə, sifarişçi “Daşıyıcı” tərəfindən rəsmi qaydada məlumatlandırılmış hesab edilir. Sifarişçi bağlamanı “Daşıyıcı”nın Bakı və Sumqayıt, anbarlarından və ya özünə ən yaxın Mover Məntəqəsindən təhvil alır. Əgər sifarişçi bağlamanın birbaşa ünvanına çatdırılmasını istəyərsə, bu zaman ödənişli kuryer xidmətindən istifadə edə bilər.

7. Sifariş olunan bağlamanın “Daşıyıcı”nın anbarına daxil olması barədə sifarişçiyə məlumat verildiyi andan etibarən 15 (on beş) təqvim günü ərzində sifarişçi bağlamanı təhvil almadığı təqdirdə, hər gün üçün 0,50 AZN (50 qəpik) saxlama haqqı hesablanır. Sifarişçi “Daşıyıcı” qarşısında bütün maddi öhdəliklərini ödəyənədək bağlamanı təhvil ala bilməz.

8. Sifariş olunan bağlamanın anbardan təhvil alınması barədə “Daşıyıcı” tərəfindən sifarişçiyə məlumat verildiyi andan etibarən, bağlama 2 (iki) ay ərzində təhvil alınmadığı təqdirdə, bağlamadakı əmlak “Daşıyıcı”nın mülkiyyətinə keçir.

9. Sifariş olunan mal sınan əşyadırsa, həmin bağlama təhvil alınarkən sifarişçi tərəfindən açılmalı və əşyanın salamatlılığı yoxlanılmalıdır. Sifarişçi bağlamanın açılmasını arzu etməzsə, o zaman gələcəkdə bu barədə yaranacaq problemlərə görə “Daşıyıcı” məsuliyyətdən azad ediləcək. “Daşıyıcı”nın ofisində və ya “Daşıyıcı”nın hər hansı rəsmi təmsilçisinin yanında açılıb yoxlanmamış məhsulda sonradan zədə və ya qüsur olduğu bildirilərsə, buna görə “Daşıyıcı” heç bir halda məsuliyyət daşımır.

10. Ölçüsü (en, uzun, hündürlük) 1 (bir) metrdən artıq olan bağlamaların daşınma haqqı HƏCMİ ÇƏKİ tarifləri ilə hesablanır.

11. Bağlamalar təhvil alınarkən çatdırılma haqqı ödənişi tam formada bütün bağlamalar üçün edilməlidir.

12. Sifariş edilmiş bağlamanın “Daşıyıcı”dan asılı olmayan səbəblərə görə gecikməsi hallarında (avia reyslərin gecikməsi, gömrük yoxlamaları və s.) “Daşıyıcı” heç bir məsuliyyət daşımır və bu hal sifarişdən imtina üçün əsas sayıla bilməz.

13. Sifarişçi ilə aparılan bütün yazışmaların, habelə sifarişçiyə aid “Daşıyıcı”ya bəlli olan məlumatların, “Daşıyıcı”nın Zəng mərkəzinə (Call center) olunan zənglərin arxivləşdirilməsi aparılır və konfidensiallıq “Mover” MMC tərəfindən qorunur.

14. “Daşıyıcı” xarici anbarlarında bağlamaları təhvil alarkən üzərində qırılabilən əşya olduğuna dair etiket (label) olan bağlamaların daxilindəki məhsulların zədələnib-zədələnmədiyini yoxlayır. Üzərində qırılabilən əşya olduğuna dair etiket (label) olmayan bağlamaların tərkibindəki məhsulların qırılması, əzilməsi, zədələnməsi kimi hallarda “Daşıyıcı” heç bir məsuliyyət daşımır.

15. “Daşıyıcı” yalnız Türkiyə və Amerikadan təhlükəli yüklərin (maye və batareya) sifarişini və çatdırılmasını həyata keçirir. Bu növ məhsulların Rusiya Birləşmiş Ərəb Əmirliklərindən sifarişi və daşınması icra edilmir. Maye və batareya tərkibli məhsulların müvafiq ölkələrdən göndərilmə reysləri ilə bağlı standard tarix mövcud deyil. Maye və batareya tərkibli məhsulların ABŞ və Türkiyədən Azərbaycana çatdırılması 7-15 gün ərzində həyata keçirilir.

16. Sifarişçi bağlamasını təhvil almağa gələrkən “Daşıyıcı”nın ofisində kassaya şəxsiyyətini təsdiq edən sənəd təqdim edərək, daşınma haqqını ödəyir və müvafiq çek alaraq, bağlamasını anbardan götürür.

17. Sifarişçi “Daşıyıcı”nın xaricdəki anbarına göndərilmiş məhsulu satıcı mağazaya geri qaytarmaq istədikdə bağlama “anbardadır” statusu almadan “Daşıyıcı”ya bu barədə məlumat verir. “Anbardadır” statusuna keçirilmiş bağlamaların satıcı mağazaya geri qaytarılması həyata keçirilmir. Geri qaytarma xidməti ödənişlidir.

18. Sifarişçinin məhsulu “Daşıyıcı”nın xaricdəki anbarında daxil olduqdan sonra sıxlıqdan asılı olaraq, maksimum 72 saat ərzində növbəli qaydada “anbardadır” statusuna keçirilir.

19. “Daşıyıcı” tərəfindən mobil telefonların sifarişi qəbul edilmir və daşınması həyata keçirilmir. Sui-istifadə edib, telefon sifariş etmiş fiziki şəxslərin bağlamasının daşınması icra edilmir, həmin bağlamaya görə “Daşıyıcı” üzərinə heç bir məsuliyyət götürmür.

20. “Daşıyıcı” tərəfindən dərman preparatlarının sifarişi qəbul edilmir və daşınması həyata keçirilmir.

21. “Daşıyıcı”nın anbarlarında itmiş bağlamaların araşdırma müddəti 14 gün davam edə bilər.
          </Text>

    </ScrollView>
    
    </SafeAreaView>
  );
};

export default TermsOfShipping;
