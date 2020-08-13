# Dashboard Link

https://john-code.club/admin/dashboard.html

Auto-refreshing with socket is done

-Test with special colored item for most notable difference

-Test with the expensive 3999 item for most notable difference

-https://john-code.club/

# MySQL Schema

Look into midterm.sql.

# Script to get and store order data

Look into dummyOrderGenerator.js.

# Performance Tuning and Analysis

## Server spent time

Sample page spent time (8 tries of loading the page): 

TTFB = 178,166,165,175,183,170,197,171

AVG TTFB = 176ms

My page spent time (8 tries of loading the page): 

TTFB = 72,67,70,71,68,68,68,80

AVG TTFB = 70.5ms

The time is calculated on the waiting(TTFB) of dashboard.html response

The definition includes the time the server took to prepare the response until first byte received therefore i consider it server render time.

## Server/Browser additional memory spent

Sample Page memory spent:

jsHeapSizeLimit: 2172649472

totalJSHeapSize: 35346336

usedJSHeapSize: 30916276

My Page memory spent:

jsHeapSizeLimit: 2172649472

totalJSHeapSize: 16876096

usedJSHeapSize: 12485040

This is observed from Chrome console with the command "window.performance.memory"

The reason my page use lesser HEAP memory is because I did most of the calculation and logic in the server side so lesser variables defined and lesser processed data in memory.

## Data transfer through network

Sample Page: 641 B transferred

My Page: 1.5 kB transferred

This is observed from Chrome network panel total download size in the summary pane.