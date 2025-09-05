import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { currency } from "../Utils/format";

export default function ExpenseItem({ item, catEmoji, catName, onDelete }) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={styles.emoji}>{catEmoji(item.categoryId)}</Text>
        <View>
          <Text style={styles.cat}>{catName(item.categoryId)}</Text>
          {item.note ? (
            <Text style={styles.note}>{item.note}</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{currency(item.amount)}</Text>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Ionicons name="trash-outline" size={22} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  emoji: { fontSize: 22 },
  cat: { fontSize: 15, fontWeight: "600", color: "#111" },
  note: { fontSize: 13, color: "#666", marginTop: 2 },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  amount: { fontSize: 16, fontWeight: "700", color: "#2563eb" },
});
