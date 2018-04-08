import { StyleSheet } from 'react-native';
import styles from '../../styles';

export default StyleSheet.create({
    button: {
        backgroundColor: styles.secondaryColor,
        borderColor: styles.bordersColor,
        borderWidth: styles.bordersWidth,
        justifyContent: 'center',
        borderStyle: 'solid',
        alignItems: 'center',
        borderRadius: 5.0,
        margin: 10
    },
    text: {
        color: styles.textsColor,
        fontWeight: 'bold',
        fontSize: 18
    }
});