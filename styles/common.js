/**
 * Common variables and styles for our app
 */

import { StyleSheet, Dimensions, StatusBar } from "react-native";

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

export const pureDrawerHeaderHeight = 50;
export const drawerHeaderHeight = StatusBar.currentHeight + pureDrawerHeaderHeight;

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

//Styles for settings
export const settingStyles = StyleSheet.create({
    initcontainer: {
        //backgroundColor: primaryColor,
        flex: 1,
        paddingTop: (Platform.OS == 'android' ? StatusBar.currentHeight : 0) + 20,
    },

    container: {
        flex: 1
    },

    heading: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'sans-serif-light',
    },

    initheading: {
        fontSize: 36,
        color: 'white',
        fontFamily: 'sans-serif-light',
    },

    mainheading: {
        fontSize: 28,
        color: 'white',
        fontFamily: 'sans-serif-light',
    },

    form: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'flex-start',
    },

    initform: {
        marginTop: 30,
        flex: 1,
        justifyContent: 'flex-start',
    },

    formitem: {
        marginBottom: 30,
    },

    initformitem: {
        marginBottom: 50,
    },

    regular: {
        marginTop: 10,
        fontSize: 16,
        color: 'white',
    },

    label: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 5,
    },

    initlabel: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },

    section: {
        paddingHorizontal: 20,
        width: Dimensions.get('window').width,
    },

    lastsection: {
        paddingRight: 0,
        width: Dimensions.get('window').width,
    },

    intro: {
        borderBottomColor: 'white',
        padding: 20,
        marginBottom: 20,
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
    },

    initintro: {
        borderBottomColor: 'white',
        paddingBottom: 20,
        marginBottom: 20,
        borderBottomWidth: 1,
    },

    controlpanel : {
        flexDirection: 'row',
        padding: 20,

        justifyContent: 'space-between',
    },

    topcontrolpanel : {
        paddingHorizontal: 20,

        flexDirection: 'row',

        justifyContent: 'space-between',
    },

    controlpanelleftmost: {
        flexDirection: 'row',
        padding: 20,

        justifyContent: 'flex-end',
    }
});

