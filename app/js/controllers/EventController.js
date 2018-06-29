'use strict';

eventsApp.controller('EventController', function EventController($scope)
{
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
    $scope.upVoteSession = function(sesion)
    {
        sesion.upVoteCount++;
    };
    $scope.downVoteSession = function(sesion)
    {
        sesion.upVoteCount--;
    };
});