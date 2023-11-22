import { Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { NewGroupChatCardProps } from '../ChatCardFeature'
import { makeStyles } from '@rneui/themed'

export const NewGroupChatCard = (props: NewGroupChatCardProps) => {
    const styles = useStyles();
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const onPressIcon = () => {
        setIsClicked(!isClicked);
    }
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.contentWrapper}>
                    <Text style={styles.contentText}>
                        {props.user}
                    </Text>
                </View>
            </View>
            <Pressable onPress={onPressIcon} style={styles.iconContainer}>
                <View style={styles.iconBorder}>
                    {isClicked && <View style={styles.icon} />}
                </View>
            </Pressable>
        </View>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
        width: 276,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 12
    },
    contentWrapper: {
        width: 232,
        alignItems: 'flex-start',
        alignSelf: 'stretch'
    },
    contentText: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.black
    },
    iconContainer: {
        alignItems: 'center',
        gap: 8
    },
    iconBorder: {
        width: 18,
        height: 18,
        borderRadius: 50,
        borderColor: theme.colors.brand.primary[500],
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 12,
        height: 12,
        borderRadius: 50,
        backgroundColor: theme.colors.brand.primary[500]
    }
}))