import { StyleSheet } from 'react-native';
import styles from '../../styles';

export default StyleSheet.create({
    newImage: {
        position: 'absolute',
        top: - 5,
        left: - 10,
        width: 20,
        height: 20
    },
    checkBox: {
        flex: 1,
        padding: 10
    },
    text: {
        color: styles.textsColor,
        padding: 10,
        fontSize: 14
    },
    star: {
        width: 25,
        height: 25,
        marginTop: 12.5 
    },
    starButton: {
        borderWidth: 0,
        margin: 0,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    itemImage: {
        marginLeft: 10,
        borderColor: styles.bordersColor,
        borderWidth: styles.bordersWidth,
        borderRadius: 5,
        width: 50,
        height: 50
    },
    itemContainer: {
        margin: 2.5,
        padding: 10,
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: styles.bordersWidth,
        borderColor: styles.bordersColor,
        borderRadius: 5,
        backgroundColor: styles.terziaryColor
    }
});