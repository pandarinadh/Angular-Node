//'use strict';


eventsApp.controller('LineGraphController', function LineGraphController($scope)
{
    $scope.graph = {
        'width': 800,
        'height': 500,
        margin: {
            top: 20,
            right: 20,
            bottom: 50,
            left: 70
          }
    };
    
    $scope.points =
    [{
        'x': 1,
        'y': 10
    },
                  {
                      'x': 3,
                      'y': 35
                  },
                  {
                      'x': 7,
                      'y': 45
                  },
                    {
                        'x': 9,
                        'y': 110
                    },
                    {
                        'x': 11,
                        'y': 210
                    },
                    {
                        'x': 13,
                        'y': 310
                    },
                     {
                         'x': 15,
                         'y': 410
                     }
    ];

        $scope.chartPoints = [
          {
              color: 'green',
              points: [{
                  'x': 1,
                  'y': 10
              },
                  {
                      'x': 3,
                      'y': 35
                  },
                  {
                      'x': 7,
                      'y': 45
                  },
                    {
                        'x': 9,
                        'y': 110
                    },
                    {
                        'x': 11,
                        'y': 210
                    },
                    {
                        'x': 13,
                        'y': 310
                    },
                     {
                         'x': 15,
                         'y': 510
                     }
              ]
          },
          {
              color: 'blue',
              points: [

                  {
                      'x': 1,
                      'y': 44
                  },
                  {
                      'x': 3,
                      'y': 68
                  },
                  {
                      'x': 7,
                      'y': 96
                  },
                    {
                        'x': 9,
                        'y': 150
                    },
                    {
                        'x': 11,
                        'y': 242
                    },
                    {
                        'x': 13,
                        'y': 342
                    },
                     {
                         'x': 15,
                         'y': 476
                     }
              ]
          }

        ];

 //   $scope.chartPoints.push($scope.points);


    
 angular.element(document).ready(function () {
    //$scope.drawChart1();
    //var svg = d3.select("svg");
//svg.selectAll("*").remove();
    d3.selectAll("svg > *").remove();
    $scope.drawChart1();
});




    $scope.drawChart1 = function(){
        var vis = d3.select('#visualisation');
        var x = d3.scale.linear().range([ $scope.graph.margin.left, $scope.graph.width - $scope.graph.margin.right]);  
        var y = d3.scale.linear().range([$scope.graph.height - $scope.graph.margin.bottom, $scope.graph.margin.top]);


            //x.domain(d3.extent(myData, function(d) {return d.x}));  
            //y.domain(d3.extent(myData, function(d) {return d.y}));

        /*    x.domain([
                d3.min($scope.chartPoints, function(c){return d3.min(c.points, function(v){return v.x})}),
                d3.max($scope.chartPoints, function(c){return d3.max(c.points, function(v){return v.x})}),

            ])
*/
        x.domain([0,91])

            y.domain([
                d3.min($scope.chartPoints, function(c){return d3.min(c.points, function(v){return v.y})}),
                d3.max($scope.chartPoints, function(c){return d3.max(c.points, function(v){return v.y})}),

            ])

        $scope.lineFunc = d3.svg.line()
          .x(function(d) {return x(d.x);})
          .y(function(d) {return y(d.y);})
          .interpolate('basis');
          
         // var y_max = x.domain().slice(-1)[0]
         var y_max = 90+1;

          xAxis = d3.svg.axis()
          .scale(x)
          .tickValues(d3.range(1,y_max+1,2))
          .tickSize(2)
          .tickSubdivide(2);

        yAxis = d3.svg.axis()
          .scale(y)
          .tickSize(2)
          .orient('left')
          .innerTickSize(-$scope.graph.width)
          .tickSubdivide(true);
    
          vis.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + ($scope.graph.height - $scope.graph.margin.bottom) + ')')
       .call(xAxis);
    
       vis.append("svg:g:text")             
      .attr("transform",
            "translate(" + ($scope.graph.width/2) + " ," + 
                           ($scope.graph.height) + ")")
      .style("text-anchor", "middle")
      .text("Days out");

    vis.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + ($scope.graph.margin.left) + ',0)')
      .call(yAxis);
    
      vis.append("svg:g:text")
      .attr("transform", "rotate(-90)")
      .attr("y", 20)
      .attr("x",0 - ($scope.graph.height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Return to Date");      

      var focus = vis.append('g')
      .attr('class', 'focus')
      .style('display', 'none')
      .style('background-color', 'red');
      focus.append('circle').attr('r', 6.5);
      focus.append('rect').attr('x', 9).attr('y', -20).attr('width', 100).attr('height', 100).attr('fill-opacity', '.2');
      focus.append('text').attr('x', 25).attr('dy', '0.35em');
      


      var k = 0;
     $scope.chartPoints.forEach(function(l) {

        var data = l.points ? l.points : [];
        ++k;

        vis.append('svg:path')
        .attr('d', $scope.lineFunc(data))
        .attr("id", "myPath" + k)
        .attr('stroke', l.color)
        .attr('stroke-width', 1.5)
        .attr('fill', 'none')
        .on('mouseover', fnMouseOver)
        .on('mouseleave', fnMouseLeave)
        .on("mousemove", fnMouseMove)
        .append("title").attr("mydata", JSON.stringify(data));
      
       

      });
      function fnMouseOver()
      {
          focus.style('display', 'block');
          focus.style('border', '1px solid black');
          focus.style('border-radius', '4px');
          this.attributes["stroke-width"].value = 4;
      }

      function fnMouseLeave() {
          focus.style('display', 'none');
          this.attributes["stroke-width"].value = 1.5;
      }

      function fnMouseMove()
    {
        var m = d3.mouse(this);
        
    console.log(m);

    console.log(x(m[0]));
    this.attributes["stroke"]

    

    var x0 = x.invert(d3.mouse(this)[0]);

    var myData = JSON.parse(this.childNodes[0].attributes["mydata"].nodeValue);
    
    var i = d3.bisector(d=>d.x).left(myData , x0, 1);
    var d0 = myData[i - 1];
    var d1 = myData[i];
    var d = x0 - d0.x > d1.x - x0 ? d1 : d0;
    
    focus.attr("transform", `translate(${x(d.x)}, ${y(d.y)})`);

/*    focus.select("text").text('Days out: ' + d.x ).append("tspan").attr("x", 9).attr("y", 15).attr("dy", "0.35em")
    .text('Returns: ' + d.x ).append("tspan").attr("x", 9).attr("y", 30).attr("dy", "0.35em")
    .text('Year: ' + d.x )
    ;
    */
   focus.select("text").text('Days out: ' + d.x ).append("tspan").attr("x", 25).attr("y", 15).attr("dy", "0.35em")
    .text('Returns: ' + d.y )

     }
    
/*
  vis.append('svg:path')
  .attr('d', $scope.lineFunc($scope.points))
  .attr('stroke', 'blue')
  .attr('stroke-width', 2)
  .attr('fill', 'none');
  */

    }
    $scope.mainChart = function(){
        $scope.chartPoints.forEach(function(l) {
            var data = l.points ? l.points : [];
            var vis = d3.select('#visualisation');
            $scope.drawChart1(vis, data)
        });
    
    }
    
    $scope.drawChart3 = function(vis, myData){
           
        var x = d3.scale.linear().range([ $scope.graph.margin.left, $scope.graph.width - $scope.graph.margin.right]);  
        var y = d3.scale.linear().range([$scope.graph.height - $scope.graph.margin.bottom, $scope.graph.margin.top]);
    
       
            x.domain(d3.extent(myData, function(d) {return d.x}));  
            y.domain(d3.extent(myData, function(d) {return d.y}));
       
        $scope.lineFunc = d3.svg.line()
          .x(function(d) {return x(d.x);})
          .y(function(d) {return y(d.y);})
          .interpolate('linear');
          
          var y_max = x.domain().slice(-1)[0]
    
          xAxis = d3.svg.axis()
          .scale(x)
          .tickValues(d3.range(1,y_max+1,2))
          .tickSize(2)
          .tickSubdivide(2);
    
        yAxis = d3.svg.axis()
          .scale(y)
          .tickSize(2)
          .orient('left')
          .tickSubdivide(true);
    
          vis.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + ($scope.graph.height - $scope.graph.margin.bottom) + ')')
       .call(xAxis);
    
       vis.append("svg:g:text")             
      .attr("transform",
            "translate(" + ($scope.graph.width/2) + " ," + 
                           ($scope.graph.height) + ")")
      .style("text-anchor", "middle")
      .text("Days out");
    
    vis.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + ($scope.graph.margin.left) + ',0)')
      .call(yAxis);
    
      vis.append("svg:g:text")
      .attr("transform", "rotate(-90)")
      .attr("y", 20)
      .attr("x",0 - ($scope.graph.height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Return to Date");      
    
      var focus = vis.append('g')
    .attr('class', 'focus')
    .style('display', 'none');
    focus.append('circle').attr('r', 4.5);
    focus.append('text').attr('x', 9).attr('dy', '0.35em');
    
    
    
    
    vis.append('rect')
    .attr('class', 'overlay')
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .attr('width', $scope.graph.width)
    .attr('height', $scope.graph.height)
    .on('mouseover', ()=> focus.style('display', 'block'))
    .on('mouseleave', () =>  focus.style('display', 'none'))
    .on('mousemove', function () { 
    
    var x0 = x.invert(d3.mouse(this)[1]);
    
    var i = d3.bisector(d=>d.x).left(myData , x0, 1);
    var d0 = myData[i - 1];
    var d1 = myData[i];
    var d = x0 - d0.x > d1.x - x0 ? d1 : d0;
    
    focus.attr("transform", `translate(${x(d.x)}, ${y(d.y)})`);
    focus.select("text").text(d.y);
    });
    
    
    
    
        vis.append('svg:path')
        .attr('d', $scope.lineFunc(myData))
        .attr('stroke', l.color)
        .attr('stroke-width', 2)
        .attr('fill', 'none')
    
    
    /*
    vis.append('svg:path')
    .attr('d', $scope.lineFunc($scope.points))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
    */
    
    }
    

    $scope.drawChart = function(){
        var data = $scope.points;
        var svgWidth = 600, svgHeight = 400;
        var margin = { top: 20, right: 20, bottom: 30, left: 50 };
        var width = svgWidth - margin.left - margin.right;
        var height = svgHeight - margin.top - margin.bottom;
        var svg = d3.select('svg')
            .attr("width", svgWidth)
            .attr("height", svgHeight);

            var g = svg.append("g")
            .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");

            var x = d3.scaleTime().rangeRound([0, width]);
            var y = d3.scaleLinear().rangeRound([height, 0]);
            
            var line = d3.line()
            .x(function(d) { return x(d.x)})
            .y(function(d) { return y(d.y)})
            x.domain(d3.extent(data, function(d) { return d.x }));
            y.domain(d3.extent(data, function(d) { return d.y }));

            g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .select(".domain")
            .remove();

                        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Price ($)");

                    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    }
});
