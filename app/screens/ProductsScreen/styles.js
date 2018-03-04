import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },

    sectionHeader: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        backgroundColor: 'rgba(247,247,247,1.0)',
        borderColor: 'rgba(255,255,255,1.0)',
        borderWidth: 1
    },

    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold'
    },

    itemContainerActive: {
        marginTop: 1,
        marginLeft: 0.5,
        marginRight: 0.5,
        padding: 10,
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: 'rgba(100, 100, 100, 1.0)'
    },

    itemContainerInactive: {
        display: 'none'
    },

    itemButton: {
        width: 30,
        height: 30,
        margin: 2.5,
        backgroundColor: 'rgba(220, 220, 220, 1.0)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2
    },

    item: {
        padding: 10,
        fontSize: 14
    }
});