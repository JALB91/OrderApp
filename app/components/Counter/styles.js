import { StyleSheet } from 'react-native';
import styles from '../../styles';

export default StyleSheet.create({
    view: {
        flex: 0.25,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    button: {
        width: 30,
        height: 30,
        margin: 2.5
    },
    counter: {
        color: styles.textsColor
    }
});