import React, { useState, useCallback } from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    RefreshControl,
    Pressable,
    Alert,
} from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'
import { mockTransactions } from '../services/transactionService'
import { Transaction } from '../models/Transaction'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

type Props = NativeStackScreenProps<RootStackParamList, 'History'>

const TransactionHistoryScreen = ({ navigation }: Props) => {
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
    const [masked, setMasked] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const revealAmounts = async () => {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Reveal transaction amounts',
        })

        if (result.success) {
            setMasked(false)
        } else {
            Alert.alert('Authentication failed', 'Unable to reveal amounts.')
        }
    }

    // const onRefresh = useCallback(() => {
    //     setRefreshing(true)
    //     setTimeout(() => {
    //         setTransactions([...mockTransactions]) // Simulate reload
    //         setRefreshing(false)
    //     }, 1000)
    // }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true)

        setTimeout(() => {
            try {
                // Simulate a fetch or data load
                const data = mockTransactions

                if (!data || data.length === 0) {
                    throw new Error('Unable to fetch transactions.')
                }

                setTransactions([...data])
            } catch (error: any) {
                Alert.alert('Fetch Error', error.message || 'Something went wrong while loading transactions.')
            } finally {
                setRefreshing(false)
            }
        }, 1000)
    }, [])

    const renderItem = ({ item }: { item: Transaction }) => (
        <Pressable
            style={styles.item}
            onPress={() =>
                navigation.navigate('Detail', { transactionId: item.id })
            }
        >
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
            <Text style={item.type === 'credit' ? styles.credit : styles.debit}>
                {masked ? '••••' : `RM ${item.amount.toFixed(2)}`}
            </Text>
        </Pressable>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transaction History</Text>

            <Pressable onPress={revealAmounts}>
                <Text style={styles.reveal}>👁️ Tap to Reveal Amounts</Text>
            </Pressable>

            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={{ paddingBottom: 40 }}
            />
        </View>
    )
}

export default TransactionHistoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    reveal: {
        marginBottom: 16,
        color: '#007bff',
        fontWeight: '600',
    },
    item: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    description: {
        fontSize: 16,
        fontWeight: '600',
    },
    date: {
        fontSize: 12,
        color: '#777',
        marginTop: 4,
    },
    credit: {
        marginTop: 6,
        color: 'green',
        fontWeight: 'bold',
    },
    debit: {
        marginTop: 6,
        color: 'red',
        fontWeight: 'bold',
    },
})
