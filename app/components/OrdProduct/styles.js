import { StyleSheet } from 'react-native';
import styles from '../../styles';

export default StyleSheet.create({
    checkBox: {
        flex: 1,
        padding: 5,
        alignSelf: 'flex-end'
    },
    descr: {
        paddingLeft: 5,
        marginLeft: 5,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: styles.textsColor,
        fontSize: 14,
        alignSelf: 'stretch',
        flexWrap: 'nowrap',
        flex: 2.5
    },
    itemContainer: {
        margin: 2.5,
        padding: 10,
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: styles.bordersWidth,
        borderColor: styles.bordersColor,
        borderRadius: 5,
        backgroundColor: styles.terziaryColor
    },
    infoContainer: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});