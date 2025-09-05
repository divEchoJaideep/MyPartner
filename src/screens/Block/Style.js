import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const styles = StyleSheet.create({
    container: {
        width: '95%',
        flex: 1,
        // backgroundColor: "#F8FAFF",
        padding: 16,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#111",
    },
    card: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
    },
    username: {
        fontSize: 13,
        color: "#777",
    },
    unblockBtn: {
        backgroundColor: "#4C8CFF",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    unblockText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
})

export default  styles
