import { StyleSheet } from 'react-native';
import styles from '../../styles';

export default StyleSheet.create({
    view: StyleSheet.flatten([styles.mainView, {
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    }]),
    orderContainer: {
        flex: 1,
        padding: 10,
        margin: 10,
        borderWidth: styles.bordersWidth,
        borderColor: styles.bordersColor,
        borderRadius: 2.5
    }
});