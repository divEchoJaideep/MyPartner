import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Container, Header } from "../../components";
import { useNavigation } from "@react-navigation/native";
import styles from "./Style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { blockedUsers, blockedUsersUnblock } from "../../api/api";
import Loading from "../../components/Loading";

const BlockedUser = () => {
    const navigation = useNavigation();

    const [blockedUsersList, setBlockedUsersList] = useState([]);
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        getBlockedUsers();
    }, []);

    const getBlockedUsers = async () => {
        try {
            setLoading(true); 
            const token = await AsyncStorage.getItem("UserToken");
            const res = await blockedUsers(token);
            console.log("res blocked :", res);

            if (res?.result) {
                setBlockedUsersList(res?.data);
                console.log("Blocked users fetched successfully:", res?.data);
            } else {
                Alert.alert("Error", res?.message || "Failed to fetch blocked users.");
            }
        } catch (err) {
            console.log("API error:", err);
        } finally {
            setLoading(false); 
        }
    };

    const handleUnblock = async (user_id) => {
        const data = { user_id: user_id };
        try {
            setLoading(true); 
            const token = await AsyncStorage.getItem("UserToken");
            const res = await blockedUsersUnblock(data, token);
            console.log('Unblock response:', res);

            if (res?.success === true) {
                Alert.alert('Alert',res.message || "User unblocked successfully!");
                getBlockedUsers(); 
            } else {
                Alert.alert('Alert',res?.message || "Something went wrong");
            }
        } catch (err) {
            Alert.alert("Error", "Try again later!");
        } finally {
            setLoading(false); 
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.row}>
                <Image source={{ uri: item.photo }} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}{item.sub_caste}</Text>
                    {/* <Text style={styles.name}>{item.user_id}</Text> */}
                    <Text style={styles.username}>{item.city_name} , {item.searching_for}</Text>
                </View>
                <TouchableOpacity
                    style={styles.unblockBtn}
                    onPress={() => handleUnblock(item.user_id)}
                >
                    <Text style={styles.unblockText}>Unlock</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <Container>
            <Header
                transparent
                title="Block List"
                hasBackBtn
                onBackPress={() => navigation.goBack()}
            />
            <View style={styles.container}>
                <FlatList
                    data={blockedUsersList}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={
                        !loading && (
                            <Text style={{ textAlign: "center", marginTop: 20 }}>
                                No blocked users found
                            </Text>
                        )
                    }
                />
            </View>
            <Loading loading={loading} /> 
        </Container>
    );
};

export default BlockedUser;
