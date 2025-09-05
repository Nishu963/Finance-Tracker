import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Screen } from './Shared';
import { useApp } from '../context/AppProvider';

export default function AddExpenseScreen() {
  const { categories, addExpense } = useApp();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [cat, setCat] = useState(categories[0]?.id);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const submit = () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('⚠️ Error', 'Please enter a valid amount');
      return;
    }
    const exp = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      note,
      categoryId: cat,
      date: date.toISOString(),
    };
    addExpense(exp);
    setAmount('');
    setNote('');
    Alert.alert('✅ Success', 'Expense added!');
  };

  return (
    <Screen title="💸 Add Expense">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            placeholder="Enter amount (e.g. 250)"
            keyboardType="numeric"
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
          />
          <Text style={styles.label}>Note</Text>
          <TextInput
            placeholder="What was this for?"
            style={styles.input}
            value={note}
            onChangeText={setNote}
          />
          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={cat}
              onValueChange={setCat}
              style={styles.picker}
            >
              {categories.map((c) => (
                <Picker.Item
                  key={c.id}
                  label={`${c.emoji} ${c.name}`}
                  value={c.id}
                />
              ))}
            </Picker>
          </View>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.dateBtn}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateBtnText}>
              📅 {date.toDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}
          <TouchableOpacity style={styles.primaryBtn} onPress={submit}>
            <Text style={styles.primaryBtnText}>+ Add Expense</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    color: '#111827',
    fontSize: 16,
  },
  pickerWrap: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    color: '#111827',
  },
  dateBtn: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  dateBtnText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  primaryBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#2563eb',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },
});
