import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Screen } from "./Shared";
import { useApp } from "../context/AppProvider";

export default function SettingsScreen() {
  const { categories, addCategory, clearAll } = useApp();
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");

  const add = () => {
    if (!name.trim() || !emoji.trim()) return;
    addCategory({ id: Date.now().toString(), name, emoji });
    setName("");
    setEmoji("");
  };

  return (
    <Screen title="⚙️ Settings">
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add New Category</Text>
        <View style={styles.inputRow}>
          <TextInput
            placeholder="Emoji (🍔)"
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            value={emoji}
            onChangeText={setEmoji}
          />
          <TextInput
            placeholder="Category name (Food)"
            style={[styles.input, { flex: 3 }]}
            value={name}
            onChangeText={setName}
          />
        </View>
        <TouchableOpacity style={styles.primaryBtn} onPress={add}>
          <Text style={styles.primaryBtnText}>+ Add Category</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Categories</Text>
        <FlatList
          data={categories}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.catChip, { backgroundColor: "#f3f4f6" }]}>
              <Text style={styles.catText}>
                {item.emoji} {item.name}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>✨ No categories yet. Add one above!</Text>
          }
        />
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.dangerBtn} onPress={clearAll}>
          <Text style={styles.dangerBtnText}>🗑 Clear All Data</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
    color: "#111827",
  },
  primaryBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  catChip: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 10,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  catText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1f2937",
  },
  empty: {
    color: "#6b7280",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 8,
  },
  dangerBtn: {
    backgroundColor: "#fee2e2",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  dangerBtnText: {
    color: "#dc2626",
    fontWeight: "700",
    fontSize: 16,
  },
});
