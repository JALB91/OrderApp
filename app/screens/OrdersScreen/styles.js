import { StyleSheet } from 'react-native';
import styles from '../../styles';

export default StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: styles.primaryColor,
        padding: 10
    },
    orderContainer: {
        flex: 1,
        margin: 10,
        padding: 10,
        alignContent: 'center',
        justifyContent: 'center',
        borderWidth: 10,
        borderRadius: 5,
        borderColor: styles.bordersColor
    }
});