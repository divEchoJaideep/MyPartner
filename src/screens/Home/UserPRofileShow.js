import { View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Container } from "../../components";
import SnapScrolling from "../../components/SnapScrolling/SnapScrolling";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getCasteByRelisionCaste } from "../../redux/actions/userDetailsActions";
import Toast from "react-native-toast-message";

const UserProfileShow = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userDetails = useSelector((state) => state.userDetails);
  const { maritial_status, jobtype_list, caste, state_list, city_list } = useSelector(
    (state) => state.preList
  );
  console.log('userDetails :', userDetails);

  const loading = useSelector((state) => state.userDetails.loading);
  const [dashboardData, setDashboardData] = useState({});

  const searchingForOptions = [
    { id: 1, name: "Life Partner" },
    { id: 2, name: "True Friend" },
  ];

  // ----------------------------
  // Fetch caste only once on focus
  // ----------------------------
  useFocusEffect(
    useCallback(() => {
      if (userDetails?.userReligion?.member_religion_caste_id) {
        dispatch(
          getCasteByRelisionCaste(
            userDetails.userReligion.member_religion_caste_id,
            token
          )
        );
      }
    }, [userDetails, token])
  );

  // -----------------------------------------
  // Compute dashboard data when all data is ready
  // -----------------------------------------
  useEffect(() => {
    if (
      userDetails?.userBasicInfo &&
      maritial_status?.length > 0 &&
      jobtype_list?.length > 0 &&
      caste?.length > 0
    ) {
      const maritalStatusId = userDetails.userBasicInfo.marital_status;
      const maritalStatusName =
        maritial_status.find((item) => item.id === maritalStatusId)?.name || "N/A";

      const jobId = userDetails?.userCareerInfo?.job_type;
      const jobName = jobtype_list.find((item) => item.id === jobId)?.name || "N/A";

      const searchId = userDetails.userBasicInfo.searching_for;
      const searchingName =
        searchingForOptions.find((item) => item.id === searchId)?.name || "N/A";

      const casteId = userDetails?.userReligion?.member_caste_id;
      const casteName = caste.find((item) => item.id === casteId)?.name || "N/A";

      const districtId = userDetails?.userAddress?.city_id;
      const districtName = city_list.find((item) => item.id === districtId)?.name || "N/A";

      const stateId = userDetails?.userAddress?.state_id;
      const stateName = state_list.find((item) => item.id === stateId)?.name || "N/A";

      const mergedData = {
        ...userDetails.userBasicInfo,
        name: userDetails.userBasicInfo.first_name,
        user_id: userDetails?.userBasicInfo.user_id,
        marital_status: maritalStatusName,
        searching_for: searchingName,
        caste: casteName,
        job_type: jobName,
        salary: userDetails.userCareerInfo?.Income || "-",
        degree: userDetails.userEducation?.education_type || "-",
        documents: userDetails.userVerification?.document_type ? true : false || "-",
        height: userDetails.userPhysicalAttributes?.height || "-",
        city_name: userDetails.userAddress?.address || "-",
        city: userDetails.userAddress?.city_name || "-",
        district_name: districtName,
        state_name: stateName,
        age: userDetails.userBasicInfo.birth_year
          ? new Date().getFullYear() - userDetails.userBasicInfo.birth_year
          : "-",

      };

      setDashboardData(mergedData);
    } else {
      setDashboardData({});
    }
  }, [userDetails, caste, maritial_status, jobtype_list]);

  // ----------------------------
  // Handlers for preview actions
  // ----------------------------
  const handleFavRequest = () => {
    Toast.show({
      type: 'info',
      text1: 'Preview',
      text2: 'You’re viewing your profile as others see it. Actions are disabled here.',
      position: 'top',
    });
  };

  const handleCancelFavRequest = () => {
    Toast.show({
      type: 'info',
      text1: 'Preview',
      text2: 'This is just a preview. You can’t perform actions on your own profile.',
      position: 'top',
    });
  };

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <Container transparentStatusBar={true} lightContent>
      <SnapScrolling
        data={[dashboardData]}
        fullHeight
        handleRequest={handleCancelFavRequest}
        handleCancelRequest={() => { }}
        handleFavRequest={handleFavRequest}
        handleCancelFavRequest={() => { }}
      />
    </Container>
  );
};

export default UserProfileShow;
