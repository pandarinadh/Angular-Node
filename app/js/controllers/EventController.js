'use strict';

eventsApp.controller('EventController', function EventController($scope)
{
    $scope.data =
    [{
        x: 1,
        y: 3
    },
    {
        x: 5,
        y: 15
    },
    {
        x: 14,
        y: 25
    }
    ]
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

    $scope.drawChart1 = function(){
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
    $scope.upVoteSession = function(sesion)
    {
        sesion.upVoteCount++;
    };
    $scope.downVoteSession = function(sesion)
    {
        sesion.upVoteCount--;
    };
});