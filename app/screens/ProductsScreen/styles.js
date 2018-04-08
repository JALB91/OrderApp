import { StyleSheet } from 'react-native';
import styles from '../../styles';

export default StyleSheet.create({
    view: StyleSheet.flatten([styles.mainView, {
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    }]),
    sectionHeader: {
        padding: 5
    },
    filter: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start'
    }
});