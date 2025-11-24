import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, FlatList, Dimensions } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'; // Added useDispatch
import { Container, Content, Header } from '../../components';
import CommanText from '../../components/CommanText';
import CommanHeading from '../../components/CommanHeading';
import styles from './Styles/OtherProfileStyle';
import { fullDetailProfile } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/Loading';
import Toast from 'react-native-toast-message';
import { getCasteByRelisionCaste, getCityListByStateId, getReligionCasteByRelisionId, getSubCasteByCaste } from '../../redux/actions/userDetailsActions';

const { width } = Dimensions.get('window');

const ProfileData = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const qualification = [
    { id: 1, name: 'Highest Qualification' },
    { id: 2, name: 'Professional Degree' },
    { id: 3, name: 'Other Achievements' }
  ];

  const searchingForOptions = [
    { id: 1, name: "Life Partner" },
    { id: 2, name: "True Friend" },
  ];

  const body_type = [
    { id: 1, name: "Physically Fit" },
    { id: 2, name: "Specially Abled" }
  ];

  const { religion_list, religionCaste, caste, subCaste, jobtype_list, country_list, state_list, city_list, maritial_status } = useSelector(state => state.preList);
  const tokenRedux = useSelector(state => state.auth.token);

  const { highest_education_list, onbehalf_list } = useSelector(state => state.preList);
  const { userId, document } = route.params || {};

  const [profile, setProfile] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  console.log('profileInfo :', profileInfo);
  console.log('religionCaste :', religionCaste);

  useFocusEffect(
    useCallback(() => {
      handleFullDetail();
    }, [userId])
  );

  const handleFullDetail = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('UserToken');

      const response = await fullDetailProfile(userId, token);
      console.log('fullDetailProfile :', response);

      if (response?.success) setProfile(response.data);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to fetch profile.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile?.present_address?.state_id) {
      dispatch(getCityListByStateId(profile.present_address.state_id, tokenRedux));
    }
  }, [profile?.present_address?.state_id, dispatch]);

  useEffect(() => {
    if (profile?.spiritual_backgrounds?.member_religion_id) {
      dispatch(getReligionCasteByRelisionId(profile.spiritual_backgrounds.member_religion_id, tokenRedux));
    }
    if (profile?.spiritual_backgrounds?.member_religion_caste_id) {
      dispatch(getCasteByRelisionCaste(profile.spiritual_backgrounds.member_religion_caste_id, tokenRedux));
    }

    if (profile?.spiritual_backgrounds?.member_caste_id) {
      dispatch(getSubCasteByCaste(profile.spiritual_backgrounds.member_caste_id, tokenRedux));
    }


  }, [profile, dispatch, tokenRedux]);



  useEffect(() => {
    if (!profile) return;

    const { present_address, spiritual_backgrounds, career, education } = profile;
    const categoryId = spiritual_backgrounds?.member_religion_caste_id;
    const religionId = spiritual_backgrounds?.member_religion_id;
    const casteId = spiritual_backgrounds?.member_caste_id;
    const subCasteId = spiritual_backgrounds?.member_sub_caste_id;
    const on_behalfId = profile?.basic_info?.on_behalf;

    const countryId = present_address?.country_id;
    const stateId = present_address?.state_id;
    const cityId = present_address?.city_id;

    const CategoryName = religionCaste?.find(r => r.id === categoryId)?.name || '';
    const religionName = religion_list?.find(r => r.id === religionId)?.name || '';
    const casteName = caste?.find(c => c.id === casteId)?.name || '';
    const subCasteName = subCaste?.find(s => s.id === subCasteId)?.name || '';
    const onBehalfName = onbehalf_list?.find(o => o.id === on_behalfId)?.name || '';
    const countryName = country_list?.find(c => c.id === countryId)?.name || '';
    const stateName = state_list?.find(s => s.id === stateId)?.name || '';
    const cityName = city_list?.find(c => c.id === cityId)?.name || '';

    const jobTypeId = career?.job_type;
    const jobTypeName = jobtype_list?.find(j => j.id === jobTypeId)?.name || '';

    const educationTypeId = Number(profile?.education?.education_type);
    const educationTypeTitle = qualification?.find(e => e.id === educationTypeId)?.name || 'N/A';

    let educationTitle = 'N/A';

    if (educationTypeId === 1) {
      educationTitle = highest_education_list?.find(h => h?.id === Number(profile?.education?.institution))?.title || 'N/A';
    } else if (educationTypeId === 2 || educationTypeId === 3) {
      educationTitle = profile?.education?.institution || 'N/A';
    }

    const Searching = searchingForOptions?.find(s => s.id === profile?.basic_info?.searching_for)?.name || 'Friend';

    const merriageStatus = maritial_status?.find(m => m.id === profile?.basic_info?.marital_status)?.name || 'N/A';
    const physicalAttributeId = Number(profile?.physical_attributes?.body_type);
    const physicalAttribute = body_type?.find(p => p.id === physicalAttributeId)?.name || 'N/A';

    setProfileInfo({
      category: CategoryName,
      religion: religionName,
      onBehalf: onBehalfName,
      caste: casteName,
      subCaste: subCasteName,
      country: countryName,
      state: stateName,
      city: cityName,
      jobType: jobTypeName,
      educationTypeTitle: educationTypeTitle,
      educationTitle: educationTitle,
      Searching: Searching,
      merriageStatus: merriageStatus,
      physicalAttribute: physicalAttribute,
    });
  }, [profile, religion_list, caste, subCaste, country_list, state_list, city_list, jobtype_list]);

  const renderPaginationDots = (imagesData) => (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
      {imagesData.map((_, i) => (
        <View
          key={i}
          style={{
            height: 8,
            width: activeIndex === i ? 20 : 8,
            borderRadius: 4,
            marginHorizontal: 4,
            backgroundColor: activeIndex === i ? '#333' : '#ccc',
          }}
        />
      ))}
    </View>
  );

  if (loading) {
    return <Loading loading={loading} />;
  }

  if (!profile) return <Loading />;

  const imagesData = [
    { type: 'profile', image_path: profile.basic_info?.photo },
    ...profile.photo_gallery,
  ];

  // Safe capitalization helper
  const capitalize = (str) => (str && str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : '');

  return (
    <Container statusBar safeAreaViewHeader={false} transparentStatusBar>
      <Header
        transparent
        absolute
        hasBackBtn
        // title=
        style={{ marginTop: 30 }}
        onBackPress={() => navigation.goBack()}
      />

      <Content contentContainerStyle={styles.container}>
        <FlatList
          data={imagesData}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
          renderItem={({ item }) => (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.image_path }} style={styles.profileImage} resizeMode="cover" />
            </View>
          )}
        />
        {renderPaginationDots(imagesData)}

        <View style={styles.bottomContainer} >
          <CommanHeading headingText heading={'Documents'} />
          <View style={styles.infoBox} >
            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Govt. ID Uploaded:`} commanTextstyle={[styles.infoText, { width: width / 2 }]} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={`${profile?.document_verified == true ? 'Yes' : 'No'}`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>
          </View>
        </View>
         <View style={styles.bottomContainer} >
          <CommanHeading headingText heading={'Manage By'} /> 
          <View style={styles.infoBox} >
            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Profile Handler:`} commanTextstyle={[styles.infoText, { width: width / 2 }]} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={`${profileInfo?.onBehalf  }`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <CommanHeading headingText heading="Basic Information" />
          <View style={styles.infoBox}>
            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Name:`} commanTextstyle={styles.infoText} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={` ${capitalize(profile?.basic_info?.first_name)}`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Married Status:`} commanTextstyle={styles.infoText} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={` ${capitalize(profileInfo.merriageStatus)}`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Year of Birth:`} commanTextstyle={styles.infoText} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={` ${profile?.basic_info?.birth_year}`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Searching For:`} commanTextstyle={styles.infoText} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={` ${capitalize(profileInfo.Searching)}`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Religion:`} commanTextstyle={styles.infoText} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={` ${capitalize(profileInfo.religion)}`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Category:`} commanTextstyle={styles.infoText} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={` ${capitalize(profileInfo.category)}`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Caste:`} commanTextstyle={styles.infoText} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={` ${capitalize(profileInfo.caste)} ( ${capitalize(profileInfo.subCaste)} )`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Address:`} commanTextstyle={styles.infoText} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={`${profileInfo.city} ${profileInfo.state} ${profileInfo.country}`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>

          </View>

          <CommanHeading headingText heading="Education & Career" />
          <View style={styles.infoBox}>
            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Education Type:`} commanTextstyle={styles.infoText} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={`${capitalize(profileInfo.educationTypeTitle)}`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`${profile?.education?.education_type === '1'
                  ? 'Qualification'
                  : profile?.education?.education_type === '2'
                    ? 'Professional Degree / Diploma'
                    : 'Achievements'
                  }:`} commanTextstyle={styles.infoText} />
              </View>

              <View style={styles.CardTextWrap}>
                <CommanText commanText={` ${capitalize(profileInfo.educationTitle)}`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Job:`} commanTextstyle={styles.infoText} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={`${capitalize(profileInfo.jobType)}`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Occupation:`} commanTextstyle={styles.infoText} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={`${profile.career?.occupation}`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Salary:`} commanTextstyle={styles.infoText} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={`${profile.career?.Income || 'N/A'}`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>


          </View>

          <CommanHeading headingText heading="Other Information" />
          <View style={styles.infoBox}>
            {/* <CommanText commanText={`Member Code: ${profile.basic_info?.user_id}`} commanTextstyle={styles.infoText} /> */}
            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Physical:`} commanTextstyle={styles.infoText} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={`${profileInfo?.physicalAttribute}`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Height:`} commanTextstyle={styles.infoText} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={`${profile?.physical_attributes?.height}`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.CardLableWrap}>
                <CommanText commanText={`Languages:`} commanTextstyle={styles.infoText} />
              </View>
              <View style={styles.CardTextWrap}>
                <CommanText commanText={`${profile.known_languages?.map(l => l.name).join(', ')}`} commanTextstyle={[styles.infoText, styles.infoTextAlign]} />
              </View>
            </View>
          </View>
        </View>
      </Content>

    </Container>
  );
};

export default ProfileData;
