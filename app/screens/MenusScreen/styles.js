import { StyleSheet } from 'react-native';
import styles from '../../styles';

export default StyleSheet.create({
    view: StyleSheet.flatten([styles.mainView, {
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    }]),
    titleContainer: {
        alignItems: 'center',
        backgroundColor: styles.secondaryColor,
        borderColor: styles.bordersColor,
        borderWidth: styles.bordersWidth,
        justifyContent: 'center',
        alignContent: 'center'
    },
    title: {
        padding: 5,
        color: styles.textsColor,
        fontWeight: 'bold',
        fontSize: 18
    }
});