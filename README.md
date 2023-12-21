# AoE2 app

The app is running at https://aoe-app.fly.dev/

## About the app 

Aim of developing app was to create a project that would

1. Test my ability to produce a coherent website using react + node.js, including all the usual cicd stuff.

2. A compact UI. Ie minimize button presses to get to the core function of the app.

App itself attempts to: 
Help lower elo players in Age of Empires II, by giving simple unit instructions.

Tips and guides ought to be served in a:

- simple, easily understandable format
- Usable without preparation
  - Core use case is when a player enters a map loading screen and sees the opponents civilization, the player using Aoe-app can click two buttons and see what units approximately ought to be built and what units the opponent is likely to build

## Instructions

Core functionality: choose two civilizations from the images in the front pages. Aoe-app will show powerunits for both civilizations and suggests supporting units based on the opposing powerunit. The app also shows win percentages for the civilizations when played against each other. 

By choosing one civilization and clicking "Analyse with chosen specs" the app will show generic information about the chosen civ.

New user can be created by going to "Login or create new user". In Userinfo user can choose a favorited civilization for the user account. User can also delete the account in question on the same page.

About page explains where the win percentages are gathered and from which time period.

The program gives possibility to update win percentages. It's done by sending a GET request to '/api/update/'. The message must include header "UPDATE_SECRET". The value must exist in the server environment. Easy way to test this is to use aoe-back/utils/requests/updateMatches.http and the vs code plugin https://marketplace.visualstudio.com/items?itemName=humao.rest-client UpdateMatches in fly.io should have the fitting UPDATE_SECRET.

The matches are updated with a separate python script process, as the creator of this app could not find an updated library, or any other practical way to handle .parquet files with JavaScript.

## Other stuff
Unit rankings from https://aoe2-de-tools.herokuapp.com/civ-ranking/
Vs win percentages from https://aoestats.io/api-info/ 