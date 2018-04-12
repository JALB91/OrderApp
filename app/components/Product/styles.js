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
    descr: {
        paddingLeft: 5,
        marginLeft: 5,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: styles.textsColor,
        fontSize: 14,
        alignSelf: 'center',
        flex: 2
    },
    price: {
        paddingLeft: 10,
        marginLeft: 10,
        color: styles.textsColor,
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
        alignSelf: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    itemImage: {
        alignSelf: 'center',
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
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: styles.bordersWidth,
        borderColor: styles.bordersColor,
        borderRadius: 5,
        backgroundColor: styles.terziaryColor
    },
    infoContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'stretch'
    },
    priceContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    propertyContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
});