# matiere directory - js version

## Introduction

This website is a personal experiment to understand and learn JavaScript in a real-case scenario. The main goal of this work is to understand the process of working with an API. The website's back-end is fully hosted with [Airtable](https://airtable.com/), and the content of the website is loaded via the Airtable API.

## Why displaying the results as a list?

On this website, it has been decided to display the results from the user's query not as a map but as a list. The list permits to read more easily and efficiently the details of each result in the user's department instead of clicking on one pin, closing it, and repeating the action again and again. Furthermore, the use of maps on websites is increasing the amount of data loaded, and inherently the website's consumption (more info in [this article](https://lowtechlab.org/fr/actualites-blog/faire-un-site-low-tech)). In the future, a function could be added to display both a list and a map if the user chooses it.

## Security

Since this is a fully client-side website, the Airtable API Key is stored in a readable JS file. This is a major security threat. However, the main goal of this work is to work on the website's front-end side. Moreover, [this process](https://support.airtable.com/docs/creating-a-read-only-api-key), described by Airtable has been followed in order to create an API Key that has a read-only access.

## Live version

An online version of this app is [available here](https://mlav.land/directory/).