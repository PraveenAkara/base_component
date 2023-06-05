import React, { useRef, useState, useEffect } from 'react'
import *as d3 from 'd3'
import { select, Selection } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'
import { Tooltip } from 'antd'

import { max } from 'd3-array'
import 'd3-transition'
import { easeElastic, easeQuad, } from 'd3-ease'
import { axisLeft, axisBottom } from 'd3-axis'
import randomstring from 'randomstring'



let initialData = [
    {
        name: 'foo',
        units: 15,
        color: "red"
    },
    {
        name: 'bar',
        units: 67,
        color: "green"
    },
    {
        name: 'baz',
        units: 81,
        color: "yellow"
    },
    {
        name: 'hoge',
        units: 38,
        color: "orange"
    },
    {
        name: 'piyo',
        units: 28,
        color: "purple"
    },
    {
        name: 'hogera',
        units: 59,
        color: "blue"
    },
    {
        name: '3',
        units: 38,
        color: "orange"
    },
    {
        name: '2',
        units: 28,
        color: "purple"
    },
    {
        name: '1',
        units: 100,
        color: "black"
    },
]
const Transition: React.FC = () => {
    const dimensions =
    {
        width: 600,
        height: 600,
        marginLeft: 100,
        marginBottom: 100,
        chartHeight: 500,
        chartWidth: 500,
    }
    const svgRef = useRef<SVGSVGElement | null>(null)

    const [selection, setSelection] = useState<null | Selection<
        SVGSVGElement | null,
        unknown,
        null,
        undefined
    >>(null)
    const [data, setData] = useState(initialData)
    const [name, setName] = useState('')
    const [unit, setUnit] = useState('')

    let x = scaleBand()
        .domain(data.map(d => d.name))
        .range([0, dimensions.width - dimensions.marginLeft])
        .padding(0.5)

    let y = scaleLinear()
        .domain([0, max(data, d => d.units)!])
        .range([dimensions.height - dimensions.marginBottom, 10])

     

    const xAxis = axisBottom(x)

    const yAxis =axisLeft(y)
        .ticks(3)
        .tickFormat(d => `${d} units`)


       


    const tooltip =
    d3.select("#tool")
   .style('position','absolute')
    .style("opacity", 1)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style('border-color',"#a39b9")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "5px")

    useEffect(() => {
        if (!selection) {
            setSelection(select(svgRef.current))
        } else {
           
            const xAxisGroup = selection
                .append('g')
                .attr(
                    'transform',
                    `translate(${dimensions.marginLeft}, ${dimensions.chartHeight
                    })`
                )
                .call(xAxis)

            xAxisGroup
                .selectAll('text')
                .attr('transform', 'rotate(0)')
                .attr('text-anchor', 'end')
                .attr('font-size', '12px')

            selection
                .append('g')
                .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
                .call(yAxis)
                      
              
               
            
                    
           selection
                .append('g')
                .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
                .selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('x', d => x(d.name)!)
                .attr('width', x.bandwidth)
                .attr('fill', d => d.color)
                .attr('rx', '5px')
                .style('stroke-width',1)
         
            
        
                .on("mouseover", function (event:any, d:any) {
                    let selectedName = d.name;
                         d3.select(this)
              
                         .style("fill", d.color)
                         .style("opacity", function() {
                      
                          return d.name == selectedName ? 1 : 1;
                            })
                    // d3.select(this).attr("r", 10).style("fill", d.color).style('opacity',0.3);
                    return tooltip.style("visibility", "visible") .style("top", event.pageY + 30 + "px")
                    .style("left", event.pageX + -5 + "px")
                    .html("name :" +  (d.name))
                   
                  })
                  .on("mousemove", function (event:any, d:any) {
                    let selectedName = d.name;
                    d3.select(this)
                  
                    .style("fill", d.color) .attr('transform', `translate(0, 0)`).style('stroke','white')
                    .style('stroke-width',-1)
                    .style('stroke-linejoin','round')
                    .style("opacity", function() {
                     return d.name == selectedName ? 1 : 0.2;
                       })
                    // d3.select(this).attr("r", 10).style("fill", d.color);
                    return tooltip
                      .style("top", event.pageY + -150+ "px")
                      .style("left", event.pageX +-10+ "px")
                    //   .text("name :"+(d.name))
                    .html(function() {
                       
                        return (
                            "<strong>Name:</strong> <span style='color:red'>" + d.name + "</span> <br/> <strong>Units:</strong> <span style='color:red'>" + d.units + "</span> "
                            
                           
                        )
                      })
                      
                      
                     
                  })
                  // Make div disappear
                  .on("mouseout", function (d) {
                    let selectedName = d.name;
                    d3.select(this)
                    .attr("r", 10)
                    .style("fill", d.color)
                    .style("opacity", function() {
                      
                     return d.name == selectedName ? 0.7: 1;
                       })
                    return tooltip.style("visibility", "hidden");
                  })
                  .on("click", function(e:any,d:any){
                    return console.log(d)
                  })
                 
 
                /**
                 * Transitions work similar to CSS Transitions
                 * From an inital point, to the conlcuded point
                 * in which you set the duration, and the ease
                 * and a delay if you'd like
                 */
                .transition()
                .duration(100)
                .delay((_, i) => i * 100)
                .ease(easeQuad)
                .attr('height', d => dimensions.chartHeight - y(d.units))
                .attr('y', d => y(d.units))
         
         

        }

       
    }, [selection,tooltip])

    // useEffect(() => {
    //     if (selection) {
    //         x = scaleBand()
    //             .domain(data.map(d => d.name))
    //             .range([0, dimensions.width])
    //             .padding(0.05)
    //         y = scaleLinear()
    //             .domain([0, max(data, d => d.units)!])
    //             .range([dimensions.height, 0])

    //         const rects = selection.selectAll('rect').data(data)

    //         rects
    //             .exit()
    //             .transition()
    //             .ease(easeElastic)
    //             .duration(400)
    //             .attr('height', 0)
    //             .attr('y', dimensions.height)
    //             .remove()

    //         /**
    //          * a delay is added here to aid the transition
    //          * of removing and adding elements
    //          * otherwise, it will shift all elements
    //          * before the add/remove transitions are finished
    //          */
    //         rects
    //             .transition()
    //             .delay(100)
    //             .attr('x', d => x(d.name)!)
    //             .attr('y', d => y(d.units))
    //             .attr('width', x.bandwidth)
    //             .attr('height', d => dimensions.height - y(d.units))
    //             .attr('fill', 'orange')

    //         rects
    //             .enter()
    //             .append('rect')
    //             .attr('x', d => x(d.name)!)
    //             .attr('width', x.bandwidth)
    //             .attr('height', 0)
    //             .attr('y', dimensions.height)
    //             .transition()
    //             .delay(400)
    //             .duration(500)
    //             .ease(easeElastic)
    //             .attr('height', d => dimensions.height - y(d.units))
    //             .attr('y', d => y(d.units))
    //             .attr('fill', 'orange')
    //     }
    // }, [data])

    /**
     * functions to help add and remove elements to show transitions
     */
    // const addData = () => {
    //     const dataToAdd = {
    //         name: randomstring.generate(),
    //         units: Math.round(Math.random() * 80 + 20),
    //     }
    //     setData([...data, dataToAdd])
    // }

    // const removeData = () => {
    //     if (data.length === 0) {
    //         return
    //     }
    //     setData([...data.slice(0, data.length - 1)])
    // }

    return (
        <>
      

         <svg className='ani_svg'
                ref={svgRef}
                width={dimensions.width}
                height={dimensions.height}
            >
            
            </svg>
           
        
           
 
<div id="tool"></div>
           
            {/* <button onClick={addData}>Add Data</button>
            <button onClick={removeData}>Remove Data</button> */}
        </>
    )
}

export default Transition