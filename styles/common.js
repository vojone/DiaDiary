import { StyleSheet } from "react-native";

export const navTextSize = 16;

export const sideNavTextSize = 20;

export const primaryColor = '#674fa5';

export const addRecordStyles = StyleSheet.create({
    maincontainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',

        padding: 20,
    },

    inputcontainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },

    inputwrapper: {
        marginTop: 40,
    },

    input: {
        borderStyle: 'solid',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        flex: 1,
        fontSize: 32,
        textAlign: 'center',
    },

    multilineinput: {
        textAlign: 'left',
        textAlignVertical: 'top',



        flex: 1,
        fontSize: 20,

        minHeight: 100,

        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
    }
});