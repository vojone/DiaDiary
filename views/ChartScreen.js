import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";


import { Dimensions, StyleSheet, Text, View } from "react-native";

import { ECharts } from "react-native-echarts-wrapper";

function getDaysBack(date,n = 1){
    let d = new Date(date)
    return new Date(d.setDate(d.getDate()-n))
}

// function Demo() {
// 	return 
// }


export default function ChartScreen(props) {
    const today = new Date();
    let days = [getDaysBack(today,5), getDaysBack(today,4), getDaysBack(today,3), getDaysBack(today,2), getDaysBack(today,1), today]
    let labels = days.map(i => i.getDate() + "." + (i.getMonth() + 1));
    
    let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
    };
    
    return (
        <View>
    <Text>Bezier Line Chart</Text>
    <LineChart
        data={{
        labels: labels,
        datasets: [
            {
            data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
            ]
            }
        ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={240}
        // yAxisLabel="mmol/L"
        yAxisSuffix=" "
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
        }}
        bezier
        style={{
        marginVertical: 8,
        borderRadius: 16
        }}
    />

    <ECharts
        style={{height: 300, width: 300}}
        option={{
            xAxis: {
              type: "category",
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: "line"
              }
            ]
        }}
        backgroundColor="rgba(93, 169, 81, 0.3)"
    />
    
    </View>
    )
}