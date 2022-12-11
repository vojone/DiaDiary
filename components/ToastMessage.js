import Toast from "react-native-root-toast";
import { primaryColor } from "../styles/common";


export function showToastMessage(message, bgColor = primaryColor, fontColor = 'white') {
    return Toast.show( message, {
        duration: Toast.durations.SHORT,
        position: 40,
        show: false,
        animation: true,
        hideOnPress: true,
        containerStyle: { backgroundColor: bgColor },
        textStyle: { color: fontColor },
        delay: 0,
    });
} 


export function ToastMessage({props, children}) {
    return (
        <Toast
            duration={Toast.durations.SHORT}
            position={40}
            visible={props.visible}
            animation={true}
            hideOnPress={true}
            delay={0}
            style={{ backgroundColor: props.backgroundColor, flexDirection: 'row',  }}
        >
            <Text>{props.icon ? (<MaterialCommunityIcons name="check" color={props.textColor}></MaterialCommunityIcons>) : ('') }</Text>
            <Text style={{color: props.textColor}}>{children}</Text>
        </Toast>
    );
}

