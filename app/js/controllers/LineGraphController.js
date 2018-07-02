//'use strict';
angular.element(document).ready(function() {

eventsApp.controller('LineGraphController', function LineGraphController($scope)
{
    $scope.graph = {
        'width': 600,
        'height': 300,
        MARGINS: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
          }
    };
    
    $scope.points =
    [{
        'x': 1,
        'y': 3
    },
    {
        'x': 3,
        'y': 5
    },
    {
        'x': 10,
        'y': 10
    }
    ];

    $scope.chartPoints = [
        {
            color :  'green',
        points :  [{
                'x': 1,
                'y': 3
            },
            {
                'x': 3,
                'y': 5
            },
            {
                'x': 10,
                'y': 10
            }
            ]
        },
        {
            color : 'blue',
            points : [{
                'x': 2,
                'y': 6
            },
            {
                'x': 4,
                'y': 8
            },
            {
                'x': 9,
                'y': 10
            }
            ]
        }

    ];

    $scope.chartPoints.push($scope.points);

    var vis = d3.select('#visualisation'),
    x = d3.scale.linear().range([ $scope.graph.MARGINS.left, $scope.graph.width - $scope.graph.MARGINS.right]);  
    y = d3.scale.linear().range([$scope.graph.height - $scope.graph.MARGINS.bottom, $scope.graph.MARGINS.top]);
    
    x.domain(d3.extent($scope.points, function(d) {return d.x}));  
    y.domain(d3.extent($scope.points, function(d) {return d.y}));
    
    $scope.lineFunc = d3.svg.line()
      .x(function(d) {return x(d.x);})
      .y(function(d) {return y(d.y);})
      .interpolate('linear');
      

      xAxis = d3.svg.axis()
      .scale(x)
      .tickSize(2)
      .tickSubdivide(true),
    yAxis = d3.svg.axis()
      .scale(y)
      .tickSize(2)
      .orient('left')
      .tickSubdivide(true);

      vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + ($scope.graph.height - $scope.graph.MARGINS.bottom) + ')')
   .call(xAxis);

vis.append('svg:g')
  .attr('class', 'y axis')
  .attr("dy", "0.51em")
  .attr("text-anchor", "end")
  .text("Price ($)")
  .attr('transform', 'translate(' + ($scope.graph.MARGINS.left) + ',0)')
  .call(yAxis);

 $scope.chartPoints.forEach(function(l) {
    vis.append('svg:path')
    .attr('d', $scope.lineFunc(l.points ? l.points : []))
    .attr('stroke', l.color)
    .attr('stroke-width', 2)
    .attr('fill', 'none');
  });

/*
  vis.append('svg:path')
  .attr('d', $scope.lineFunc($scope.points))
  .attr('stroke', 'blue')
  .attr('stroke-width', 2)
  .attr('fill', 'none');
  */
    

    $scope.drawChart1 = function(){
      //  var data = $scope.data;
        var margin = { top: 20, right: 20, bottom: 30, left: 50 };
        //var width = svgWidth - margin.left - margin.right;
       // var height = svgHeight - margin.top - margin.bottom;
       
       
       x = d3.time.scale().range([0, $scope.graph.width]);  
       y = d3.scale.linear().range([$scope.graph.height, 0]);
       
       x.domain(d3.extent($scope.points, function(d) {return d.x}));  
       y.domain(d3.extent($scope.points, function(d) {return d.y}));
       
       $scope.line = d3.svg.line()
         .x(function(d) {return x(d.x);})
         .y(function(d) {return y(d.y);});


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
angular.bootstrap(document, ['eventsApp']);
});