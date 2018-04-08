import { StyleSheet } from 'react-native';
import styles from '../../styles';

export default StyleSheet.create({
    view: StyleSheet.flatten([styles.mainView, {
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    }])
});