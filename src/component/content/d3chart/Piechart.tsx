import React, { FC, useRef, useState, useEffect } from 'react'
import *as d3 from 'd3'
import { max } from 'd3-array'
import { easeElastic, easeQuad, } from 'd3-ease'






const Piechart: FC = () => {

  

    var svg = d3.select("#pie"),
    width:any = svg.attr("width",600),
    height:any = svg.attr("height",600),
    radius = 200;

// Step 1        
var data:any = [{name: "Alex", share: 20.70}, 
            {name: "Shelly", share: 30.92},
            {name: "Clark", share: 15.42},
            {name: "Matt", share: 13.65},
            {name: "Jolene", share: 19.31}];

var g = svg.append("g")
           .attr("transform", "translate(" + 600 / 2 + "," + 600 / 2 + ")");

// Step 4
var ordScale:any = d3.scaleOrdinal()
                    .domain(data)
                    .range(['#ffd384','#94ebcd','#fbaccc','#d3e0ea','#fa7f72']);

// Step 5
var pie = d3.pie().value(function(d:any) { 
        return d.share; 
    });

var arc = g.selectAll("arc")
           .data(pie(data))
           .enter()
          
           const tooltip =
           d3.select("#tool1")
          .style('position','absolute')
          .style('z-index','9999')
           .style("opacity", 1)
           .attr("class", "tooltip")
           .style("background-color", "white")
           .style("border", "solid")
           .style('border-color',"#a39b9")
           .style("border-width", "1px")
           .style("border-radius", "5px 0")
           .style("padding", "5px")


// Step 6
var path:any = d3.arc()
             .outerRadius(radius)
             .innerRadius(0)
             
             
arc.append("path")
   .attr("d", path)
   .attr("fill", function(d:any) { return ordScale(d.data.name) })

   .on('mouseover',function( event,d:any){
    console.log(d)
     d3.select(this).style('opacity','1').style("fill", 'white').style("transform", "translate(1px, 1px)")
    .style('stroke','#e3e3e3')
    .style('stroke-width','1')
    .style('stroke-linejoin','round')

    return tooltip.style("visibility", "visible") .style("top", event.pageY + 30 + "px")
    .style("left", event.pageX + -600 + "px")
    .html("name :" +  (d.data.name)!)
   })
   .on("mousemove", function (event:any, d:any) {
    // d3.select(this).attr("r", 10).style("fill", d.color);
    return tooltip
      .style("top", event.pageY + -150 + "px")
      .style("left", event.pageX + -600 + "px")
      
    //   .text("name :"+(d.name))
    .html(function() {
       
        return (
            "<strong>Name:</strong> <span style='color:red'>" + d.data.name + "</span> <br/> <strong>Units:</strong> <span style='color:red'>" + d.data.share + "</span> "
            
           
        )
      })
      
      
     
  })

   .on('mouseout',function(){
     d3.select(this).style('opacity','0.6').style("fill", function(d:any) { return ordScale(d.data.name) })
    .style("transform", "translate(0, 0)")
    return tooltip.style("visibility", "hidden");
   })
   .transition()
   .duration(100)
   .delay((_, i) => i * 100)
   .ease(easeQuad)
   
   .style('padding','10')
   .attrTween('d', function(d) {
    var i = d3.interpolate(d.startAngle+0.2, d.endAngle);
    return function(t) {
        d.endAngle = i(t);
      return path(d);
    }
 });

// Step 7
var label = d3.arc()
              .outerRadius(radius)
              .innerRadius(0);
    
arc.append("text")
   .attr("transform", function(d:any) { 
            return "translate(" + label.centroid(d) + ")"; 
    })
   .text(function(d:any) { return d.data.name; })
   .style("font-family", "arial")
   .style("font-size", 15);
    return (
        <>
            <svg id="pie">
               
            </svg>
            <div id="tool1"></div>
        </>
    )
}

export default Piechart