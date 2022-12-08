import { StyleSheet } from "react-native";

export const navTextSize = 16;

export const sideNavTextSize = 20;

export const addRecordStyles = StyleSheet.create({
    maincontainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',

        padding: 20,
    },

    inputcontainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },

    timeinputcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    rightaligned: {
        textAlign: 'right',
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
    }
});