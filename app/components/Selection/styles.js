import { StyleSheet } from 'react-native';
import styles from '../../styles';

export default StyleSheet.create({
    view: {
        flex: 1,
        margin: 10,
        padding: 20,
        backgroundColor: styles.secondaryColor,
        borderColor: styles.bordersColor,
        borderWidth: styles.bordersWidth,
        borderRadius: 2.5
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sectionHeader: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: styles.textsColor,
        fontSize: 14,
    }
});