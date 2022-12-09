import { StyleSheet } from "react-native";

export const navTextSize = 16;

export const sideNavTextSize = 20;

export const primaryColor = '#674fa5';
export const pressUnderlayColor = '#cdc4e3';
export const bottomTabBarActiveBgColor = '#f2eef7';

export const topBarHeight = 50;

export const headerHeight = 100;

export const bottomBarHeight = 60;

export const placeholderColor = '#ccc';

export const addRecordStyles = StyleSheet.create({
    maincontainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',

        padding: 20,

        flex: 1,
    },

    inputcontainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },

    inputwithtopgap: {
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

        padding: 15,

        fontSize: 20,

        minHeight: 100,

        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,

        borderColor: primaryColor,
        borderRadius: 4,
    }
});