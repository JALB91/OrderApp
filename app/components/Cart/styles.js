import { StyleSheet } from 'react-native';
import styles from '../../styles';

export default StyleSheet.create({
    view: { 
        flex: 1,
        padding: 15,
        alignItems: 'center',
        alignContent: 'center' 
    },
    cartImage: { 
        width: 25, 
        height: 25
    },
    cartButton: {
        borderWidth: 0,
        borderRadius: 0,
        margin: 0
    },
    badgeView: {
        width: 12,
        height: 12,
        borderRadius: 5,
        backgroundColor: styles.primaryColor,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    badgeText: {
        fontWeight: 'bold',
        fontSize: 10,
        color: styles.textsColor
    }
});