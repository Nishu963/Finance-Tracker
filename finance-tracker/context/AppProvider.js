import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([
    { id: '1', name: 'Food', emoji: '🍔' },
    { id: '2', name: 'Transport', emoji: '🚌' },
    { id: '3', name: 'Bills', emoji: '💡' },
  ]);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('expenses');
      if (saved) setExpenses(JSON.parse(saved));
      const cats = await AsyncStorage.getItem('categories');
      if (cats) setCategories(JSON.parse(cats));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    AsyncStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addExpense = (exp) => setExpenses((prev) => [exp, ...prev]);
  const removeExpense = (id) => setExpenses((prev) => prev.filter((e) => e.id !== id));
  const addCategory = (cat) => setCategories((prev) => [...prev, cat]);
  const clearAll = async () => {
    setExpenses([]);
    setCategories([
      { id: '1', name: 'Food', emoji: '🍔' },
      { id: '2', name: 'Transport', emoji: '🚌' },
      { id: '3', name: 'Bills', emoji: '💡' },
    ]);
    await AsyncStorage.clear();
  };

  return (
    <AppContext.Provider value={{ expenses, categories, addExpense, removeExpense, addCategory, clearAll }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
