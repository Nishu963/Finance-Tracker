import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  SectionList,
  Alert,
  RefreshControl,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { Screen } from "./Shared";
import ExpenseItem from "../components/ExpenseItem";
import { useApp } from "../context/AppProvider";
import { currency } from "../Utils/format";
import {
  dateKey,
  prettyDate,
  isToday,
  isThisWeek,
  isThisMonth,
} from "../Utils/date";

export default function HomeScreen() {
  const { expenses, categories, removeExpense } = useApp();

  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  const filtered = useMemo(() => {
    let list = [...expenses];

    if (filterCat !== "all") list = list.filter((e) => e.categoryId === filterCat);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((e) => {
        const noteMatch = (e.note || "").toLowerCase().includes(q);
        const catMatch =
          categories.find((c) => c.id === e.categoryId)?.name
            .toLowerCase()
            .includes(q) || false;
        return noteMatch || catMatch;
      });
    }

    switch (sortBy) {
      case "oldest":
        list.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "high":
        list.sort((a, b) => b.amount - a.amount);
        break;
      case "low":
        list.sort((a, b) => a.amount - b.amount);
        break;
      default:
        list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return list;
  }, [expenses, filterCat, search, sortBy, categories]);

  const sections = useMemo(() => {
    const map = new Map();
    filtered.forEach((e) => {
      const key = dateKey(e.date);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(e);
    });

    return Array.from(map.entries())
      .sort((a, b) =>
        sortBy === "oldest" ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0])
      )
      .map(([k, data]) => ({ title: prettyDate(k), data }));
  }, [filtered, sortBy]);

  const totals = useMemo(() => {
    const sum = (f) =>
      expenses.filter((e) => f(e.date)).reduce((s, e) => s + e.amount, 0);
    return {
      today: sum(isToday),
      week: sum(isThisWeek),
      month: sum(isThisMonth),
    };
  }, [expenses]);

  const monthlyByCat = useMemo(() => {
    const cats = Object.fromEntries(categories.map((c) => [c.id, 0]));
    expenses.forEach((e) => {
      if (isThisMonth(e.date)) cats[e.categoryId] = (cats[e.categoryId] || 0) + e.amount;
    });
    const total = Object.values(cats).reduce((a, b) => a + b, 0) || 1;
    return categories
      .map((c) => ({
        ...c,
        amount: cats[c.id] || 0,
        pct: ((cats[c.id] || 0) / total) * 100,
      }))
      .filter((x) => x.amount > 0)
      .sort((a, b) => b.amount - a.amount);
  }, [expenses, categories]);

  const catName = (id) => categories.find((c) => c.id === id)?.name || "Unknown";
  const catEmoji = (id) => categories.find((c) => c.id === id)?.emoji || "❓";

  const confirmDelete = (id) => {
    Alert.alert("Delete Expense", "Are you sure you want to delete this expense?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => removeExpense(id) },
    ]);
  };

  return (
    <Screen title="Overview" right={<MaterialIcons name="analytics" size={24} color="#2563eb" />} style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor="#2563eb"
            colors={["#2563eb"]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
       
        <View style={styles.section}>
          <Text style={styles.cardTitle}>Totals</Text>
          <View style={styles.totalsRow}>
            <View style={styles.stat}>
              <Text style={styles.statLbl}>Today</Text>
              <Text style={styles.statVal}>{currency(totals.today)}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLbl}>This Week</Text>
              <Text style={styles.statVal}>{currency(totals.week)}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLbl}>This Month</Text>
              <Text style={styles.statVal}>{currency(totals.month)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.cardTitle}>Filters</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="search" size={18} color="#666" style={{ marginRight: 6 }} />
            <TextInput
              placeholder="Search by note or category"
              placeholderTextColor="#888"
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />
          </View>

          <View style={styles.pickerWrap}>
            <Picker selectedValue={filterCat} onValueChange={setFilterCat}>
              <Picker.Item label="All" value="all" />
              {categories.map((c) => (
                <Picker.Item key={c.id} label={`${c.emoji} ${c.name}`} value={c.id} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerWrap}>
            <Picker selectedValue={sortBy} onValueChange={setSortBy}>
              <Picker.Item label="Latest first" value="latest" />
              <Picker.Item label="Oldest first" value="oldest" />
              <Picker.Item label="Highest amount" value="high" />
              <Picker.Item label="Lowest amount" value="low" />
            </Picker>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.cardTitle}>Category Breakdown (This Month)</Text>
          {monthlyByCat.length === 0 ? (
            <Text style={{ color: "#666" }}>No expenses this month yet.</Text>
          ) : (
            <View style={{ gap: 10 }}>
              {monthlyByCat.map((c) => (
                <View key={c.id} style={{ gap: 6 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.breakLbl}>
                      {c.emoji} {c.name}
                    </Text>
                    <Text style={styles.breakVal}>
                      {currency(c.amount)} • {c.pct.toFixed(0)}%
                    </Text>
                  </View>
                  <View style={styles.track}>
                    <View style={[styles.fill, { width: `${Math.max(5, c.pct)}%` }]} />
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{title}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <ExpenseItem item={item} catEmoji={catEmoji} catName={catName} onDelete={confirmDelete} />
          )}
          ListEmptyComponent={
            <Text style={{ color: "#666", padding: 16 }}>No expenses yet. Add some!</Text>
          }
          scrollEnabled={false} 
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: { color: "#111", fontSize: 16, fontWeight: "700", marginBottom: 10 },

  totalsRow: { flexDirection: "row", justifyContent: "space-between" },
  stat: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    minWidth: 100,
  },
  statLbl: { color: "#555", fontSize: 12 },
  statVal: { color: "#111", fontWeight: "700", marginTop: 2 },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  input: { color: "#111", flex: 1, paddingVertical: 8 },
  pickerWrap: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    marginBottom: 10,
  },

  breakLbl: { color: "#111", fontWeight: "600" },
  breakVal: { color: "#555", fontWeight: "600" },
  track: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
  },
  fill: { height: 8, backgroundColor: "#2563eb", borderRadius: 8 },

  sectionHeader: {
    backgroundColor: "#f9fafb",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  sectionText: { color: "#444", fontWeight: "600" },
});
