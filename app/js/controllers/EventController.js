//'use strict';
angular.element(document).ready(function() {
    var app = angular.module('angularSVG', []);

app.controller('EventController', function EventController($scope)
{
    $scope.graph = {
        'width': 300,
        'height': 100
    };
    $scope.chartPoints = [];
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
        'x': 6,
        'y': 10
    }
    ];
    $scope.chartPoints.push($scope.points);
    
    x = d3.time.scale().range([0, $scope.graph.width]);  
    y = d3.scale.linear().range([$scope.graph.height, 0]);
    
    x.domain(d3.extent($scope.points, function(d) {return d.x}));  
    y.domain(d3.extent($scope.points, function(d) {return d.y}));
    
    $scope.line = d3.svg.line()
      .x(function(d) {return x(d.x);})
      .y(function(d) {return y(d.y);});

    $scope.event = {
        name: 'Angular Boot Camp',
        date: '1/1/2018',
        time: '10:30 am',
        location: {
            address: 'Google Headquarters',
            city:'Moutain View',
            Province: 'CA'
        },
        sessions:[
            {
                name: 'Angular 1',
                creatorName: 'Pandari',
                duration: '1 hr',
                level: 'Advanced',
                abstract: 'in this sesion, you will lear Angular 1',
                upVoteCount:0
            },
            {
                name: '.NET',
                creatorName: 'Pandari',
                duration: '1 hr',
                level: 'Introductory',
                abstract: 'in this sesion, you will lear .NET1',
                upVoteCount:0
            },
            {
                name: 'Javascript',
                creatorName: 'Pandari',
                duration: '1 hr',
                level: 'Intermidiate',
                abstract: 'in this sesion, you will lear Javascript',
                upVoteCount:0
            }
        ]
    }

    

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
    $scope.upVoteSession = function(sesion)
    {
        sesion.upVoteCount++;
    };
    $scope.downVoteSession = function(sesion)
    {
        sesion.upVoteCount--;
    };

    $scope.drawChart = function(){
        var data = $scope.data;
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

            var x = d3.scaleLinear().rangeRound([0, width]);
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

    }
});
angular.bootstrap(document, ['angularSVG']);
});