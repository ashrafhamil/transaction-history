import React, { useEffect } from 'react'
import { View, Text, Button, StyleSheet, Alert } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

const LoginScreen = ({ navigation }: Props) => {
    const handleBiometricAuth = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync()
        const isEnrolled = await LocalAuthentication.isEnrolledAsync()

        if (!hasHardware || !isEnrolled) {
            Alert.alert('Biometrics not available', 'Your device does not support biometric authentication.')
            return
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate to access your transactions',
        })

        if (result.success) {
            navigation.navigate('History')
        } else {
            Alert.alert('Authentication Failed', 'Please try again.')
        }
    }

    useEffect(() => {
        handleBiometricAuth()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Ryt Bank</Text>
            <Button title="Login with Biometrics" onPress={handleBiometricAuth} />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
})
