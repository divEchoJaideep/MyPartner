import React from "react";
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const StatusModal = ({ visible, type, message, onClose }) => {
  const isSuccess = type === "success";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Close button */}
          {/* <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={{ fontSize: 18 }}>✕</Text>
          </TouchableOpacity> */}

          
          <Image
            source={
              isSuccess
                ? require('../../assets/images/check.png')
                : require('../../assets/images/no.png')
            }
            style={styles.icon}
          />

          <Text style={styles.title}>{isSuccess ? "Success!" : "Whoops!"}</Text>

          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity style={styles.btn} onPress={onClose}>
            <Text style={styles.btnText}>{isSuccess ? "Okay" : "Try Again"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#002D62",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default StatusModal;
