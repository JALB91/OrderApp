import { StyleSheet } from 'react-native';
import styles from '../../styles';

export default StyleSheet.create({
    view: {
        flex: 1
    },
    sectionHeader: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        backgroundColor: styles.terziaryColor,
        borderColor: styles.bordersColor,
        borderWidth: styles.bordersWidth
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: styles.textsColor
    },
    timeslotText: {
        alignSelf: 'center',
        margin: 10,
        padding: 5,
        color: styles.textsColor,
        fontWeight: 'bold',
        fontSize: 14
    },
    totalText: {
        alignSelf: 'center',
        margin: 10,
        padding: 5,
        color: styles.textsColor,
        fontWeight: 'bold',
        fontSize: 14
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});