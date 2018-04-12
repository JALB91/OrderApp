import { StyleSheet } from 'react-native';
import styles from '../../styles';

export default StyleSheet.create({
    view: {
        margin: 10,
        borderWidth: styles.bordersWidth,
        borderRadius: 5,
        borderColor: styles.bordersColor,
        backgroundColor: styles.secondaryColor
    },
    menuContainer: {
        padding: 10,
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menuInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start' 
    },
    priceContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    description: {
        alignSelf: 'center',
        padding: 10,
        fontWeight: 'bold'
    },
    texts: {
        fontSize: 14,
        color: styles.textsColor
    },
    addButton: {
        width: 30,
        height: 30,
        margin: 2.5
    },
    image: { 
        width: 50,
        height: 50 
    }
});