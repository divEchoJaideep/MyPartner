import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        
    },
    walletBox: {
        paddingHorizontal: 20

    },
    header: {
        alignItems: 'center',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
    },
    giftImage: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginVertical: 20,
    },
    infoText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#555',
    },
    rewardText: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    linkBox: {
        flexDirection: 'row',
        position:'absolute',
        alignSelf:"center",
        bottom:10,
        justifyContent: 'space-between',
        backgroundColor: '#f2f2f2',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#333',
        width:'75%',
    },
    copyButton: {
        backgroundColor: '#e6e6e6',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
        justifyContent:'center',
        alignItems:"center"
    },
    copyText: {
        fontSize: 12,
        color: '#000',
    },
    shareButton: {
        backgroundColor: '#007bff',
        paddingVertical: 14,
        borderRadius: 8,
        marginBottom: 20,
    },
    shareText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    earnBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingBottom: 8,
    },
    earnLabel: {
        fontSize: 14,
        color: '#444',
    },
    earnValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    referralBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    referralLabel: {
        fontSize: 14,
        color: '#444',
    },
    referralValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default styles;