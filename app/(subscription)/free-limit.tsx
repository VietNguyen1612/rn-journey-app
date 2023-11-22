import { Text, View } from 'react-native'
import React from 'react'
import { Button, makeStyles } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from '@rneui/themed';
import { router } from 'expo-router';

const FreeLimit = () => {
    const styles = useStyles();
    return (
        <SafeAreaView style={styles.container}>
            <Image resizeMode='contain' style={styles.image} source={require('../../assets/images/blue_robot.png')} />
            <Text style={styles.text}>Bạn đã đạt giới hạn của hành trình miễn phí. Hãy nâng cấp gói hành trình để nhận được nhiều quyền lợi hơn</Text>
            <View style={styles.buttonContainer}>
                <Button onPress={() => router.push('/(subscription)/subscription-plan')} titleStyle={styles.buttonText} buttonStyle={styles.button} title={'Thông tin chi tiết gói'} />
                <Button onPress={() => router.back()} titleStyle={styles.buttonText} buttonStyle={styles.button} type='outline' title={'Từ chối'} />
            </View>
        </SafeAreaView>
    )
}

export default FreeLimit

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    image: {
        height: 172,
        width: 270
    },
    text: {
        fontSize: 16,
        fontWeight: '400',
        color: theme.colors.brand.neutral[700]
    },
    buttonContainer: {
        flexDirection: 'column',
        gap: 16,
        marginVertical: 30
    },
    button: {
        borderRadius: 56,
        width: 340,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600'
    }
}))