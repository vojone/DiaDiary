/**
 * Common variables and styles for our app
 */

import { StyleSheet } from "react-native";

//Font sizes
export const navTextSize = 16;

export const sideNavTextSize = 20;

//Color for interactive elements or highlighted background
export const primaryColor = '#674fa5';
export const primaryColor2 = '#a050a5';
export const primaryColor2Pressed = '#713875';

//Background (light) colors
export const backgroundColor = '#fff0fc';
export const backgroundColor2 = '#fff';

export const pressUnderlayColor = '#e4cbe6';
export const modifiedColor = 'rgba(194, 138, 199, 0.5)';

export const bottomTabBarActiveColor = '#f2eef7';

export const activeColor = '#d7cbe7';

export const placeholderColor = '#e5cce3';


//Feedback colors
export const successColor = '#28a745';
export const warningColor = '#ffc107';
export const dangerColor = '#dc3545';

//Size constants
export const topBarHeight = 50;

export const headerHeight = 100;

export const bottomBarHeight = 60;

//Shared styles for addRecord tabs
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

