import { View, Pressable } from 'react-native'
import React from 'react'
import { Text, Card, makeStyles, useTheme } from '@rneui/themed'
import { ScrollView } from 'react-native-gesture-handler'
import { PlaceType } from '../../../types/explore'
import { IconClockHour4, IconGasStation, IconRoad } from 'tabler-icons-react-native'

interface RecommendedPlaceListProps {
    title: string,
    placesArray: PlaceType[]
}

export const RecommendedPlaceList = (props: RecommendedPlaceListProps) => {
    const { title, placesArray } = props;
    const styles = useStyles()
    const { theme } = useTheme()
    return (
        <View style={styles.container}>
            <Text textS semiBold>{title}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}>
                {placesArray.map((item) => (
                    <Pressable key={item.id}>
                        <Card containerStyle={styles.cardContainer}>
                            <Card.Image style={styles.cardImage} source={{ uri: item.image?.[0] }} />
                            <Text style={styles.cardName}>
                                {item.name}
                            </Text>
                            <View style={styles.detailContainer}>
                                <View style={styles.detail}>
                                    <IconRoad size={10} color={theme.colors.brand.neutral[500]} />
                                    <Text style={styles.detailText}>{item.distance}</Text>
                                </View>
                                <View style={styles.detail}>
                                    <IconClockHour4 size={10} color={theme.colors.brand.neutral[500]} />
                                    <Text style={styles.detailText}>{item.duration}</Text>
                                </View>
                                <View style={styles.detail}>
                                    <IconGasStation size={10} color={theme.colors.brand.neutral[500]} />
                                    <Text style={styles.detailText}>{item.price}</Text>
                                </View>
                            </View>
                        </Card>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
        height: 254,
        flexDirection: 'column',
        marginLeft: 10,

    },
    cardContainer: {
        margin: 8,
        padding: 8,
        borderRadius: 10
    },
    cardImage: {
        width: 140,
        height: 160,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2
    },
    cardName: {
        maxWidth: 140,
        fontSize: 10,
        color: theme.colors.brand.neutral[900]
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8
    },
    detail: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailText: {
        fontSize: 10,
        color: theme.colors.brand.neutral[900],
        fontWeight: '400'
    }
}))
