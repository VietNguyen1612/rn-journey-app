import { Text, makeStyles, useTheme } from "@rneui/themed";
import { View } from "react-native";
import { ChatCardProps } from "../ChatCardFeature";

export const ChatCard = (props: ChatCardProps) => {
    const { isSeen, chatContentAuthor, chatContent, time } = props;
    const { theme } = useTheme();
    const isSeenTextColor = isSeen ? theme.colors.brand.neutral[900] : theme.colors.black
    const styles = useStyles({ isSeenTextColor });
    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <Text style={styles.userText}>
                    {props.user}
                </Text>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.chatContentContainer}>
                    <Text style={styles.chatContent}>
                        {chatContentAuthor}
                        {chatContent}
                    </Text>
                </View>
                <View style={styles.timeContentContainer}>
                    <Text style={styles.timeContent}>
                        {time}
                    </Text>
                </View>
            </View>
        </View>
    );
};

type ColorProps = {
    isSeenTextColor: string
}

const useStyles = makeStyles((theme, props: ColorProps) => ({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
        height: 47,
        width: 276,
    },
    userContainer: {
        height: 22,
        alignItems: 'flex-start',
        alignSelf: 'stretch',
    },
    userText: {
        color: props.isSeenTextColor,
        fontSize: 16,
        fontWeight: '600'
    },
    contentContainer: {
        height: 21,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        alignSelf: 'stretch',
    },
    chatContentContainer: {
        alignItems: 'flex-start',
        width: 220
    },
    chatContent: {
        color: props.isSeenTextColor,
        fontSize: 14,
        fontWeight: '400'
    },
    timeContentContainer: {
        alignItems: 'flex-start'
    },
    timeContent: {
        fontSize: 14,
        fontWeight: '400',
        color: props.isSeenTextColor
    }
}))
