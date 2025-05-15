import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { mockTransactions } from '../services/transactionService'

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>

const TransactionDetailScreen = ({ route }: Props) => {
  const { transactionId } = route.params
  const transaction = mockTransactions.find((txn) => txn.id === transactionId)

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Transaction not found.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Details</Text>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{transaction.description}</Text>

        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>
          {new Date(transaction.date).toLocaleString()}
        </Text>

        <Text style={styles.label}>Amount</Text>
        <Text style={styles.value}>RM {transaction.amount.toFixed(2)}</Text>

        <Text style={styles.label}>Type</Text>
        <Text style={styles.value}>{transaction.type.toUpperCase()}</Text>

        <Text style={styles.label}>Account No.</Text>
        <Text style={styles.value}>{transaction.accountNumber}</Text>

        <Text style={styles.label}>Reference ID</Text>
        <Text style={styles.value}>{transaction.referenceId}</Text>
      </View>
    </View>
  )
}

export default TransactionDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
})
