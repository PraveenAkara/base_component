
import React,{FC, useState,useEffect} from 'react'
import Highcharts from 'highcharts';
import {Row,Col, Card} from "antd"
import  Comparchart  from './Comparchart';
import Piechart from '../d3chart/Piechart';

import Animate from '../d3chart/Animated3cahrt'






const data:any=[{ name: 'Gases',data:[
    {
    name: 'Argon',
    y: 0.9,
    color: '#3498db'
  },
  {
    name: 'Nitrogen',
    y: 78.1,
    color: '#9b59b6'
  },
  {
    name: 'Oxygen',
    y: 20.9,
    color: '#2ecc71'
  },
  {
    name: 'Trace Gases',
    y: 0.1,
    color: '#f1c40f'
  }

]}]


const data1:any=[{
    name: 'Tokyo',
    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
        194.1, 95.6, 54.4]

}, {
    name: 'New York',
    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5,
        106.6, 92.3]

}, {
    name: 'London',
    data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3,
        51.2]

}, {
    name: 'Berlin',
    data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8,
        51.1]

}]

const Chart:FC=()=>{

    const [serice,setSerice]=useState<any>(data)

 




const highCharts=()=> {
	Highcharts.chart({
	    chart: {
	      type: 'column',
	      renderTo: 'atmospheric-composition'
	    },
	    title: {
            text: 'Monthly Average Rainfall'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
	    series:data1
  	});
}


const highCharts1=()=> {
	Highcharts.chart({
	    chart: {
	      type: 'pie',
	      renderTo: 'atmospheric-composition1'
	    },
        title: {
            text: 'Stacked Bar Chart'
        },
        xAxis: {
            categories: ['Sugar (g/100g)', 'Vitamic C (mg/100g)']
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        credits: {
          enabled: false
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
	    series:serice
  	});
}

useEffect(()=>{

highCharts()
highCharts1()
},[])

console.log(serice)


    return(
       <Card style={{overflow:'auto',height:"90vh"}}>

        <Row gutter={10}>
            <Col span={10}>
            <Animate/>
           
            </Col>

            <Col span={10}>
            <Piechart/>
            </Col>
        </Row>
         

       

          <div >

         
        <Row gutter={10}>
            <Col span={8}>
            <div id="atmospheric-composition1">
  	    </div>
            </Col>
            <Col span={16}>
            <Comparchart/>
            </Col>

            <Col span={24}>
            <div id="atmospheric-composition">
  	    </div>
            </Col>
      


           
        </Row>
        </div>
          {/* <D3chart/> */}

        
            
     
       </Card> 
    )
}
export default Chart