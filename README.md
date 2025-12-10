 ## Max Profit Construction Scheduler

This project solves a scheduling problem:
Given a time limit N, and a set of buildings (T, P, C), each with:

d → time required to build

e → earnings per unit of remaining time

We must choose buildings to maximize total profit.
Imagine you have N time units.
You can build 3 types of buildings:

Symbol	Duration (d)	Earnings (e)
T	      5                  1500
P	     4                 1000
C	     10	                  2000

When you finish a building at time r, its profit is:

profit = earnings × (remaining time)
profit = e × (N - r)


#### Example with N = 7:

If you build T (5) and finish at time r = 5,
remaining time = 7 − 5 = 2
profit = 1500 × 2 = 3000

If you build P (4) and finish at time r = 4,
remaining = 3
profit = 1000 × 3 = 3000

So T and P both give equal maximum profit when N = 7.


Maximum possible earnings

### All combinations of buildings that achieve this maximum

We create an array dp[r]:

dp[r] = maximum profit possible using r time


For each time r from 1 to N:

try placing each building

calculate profit if we finish this building at time r


We use DFS (Depth-First Search):

Starting from n, go backwards

For each time r, multiple choices may exist

This automatically generates all optimal sequences

#### Example for N = 7:

One path picks T → leftover = 2 (allowed idle)

One path picks P → leftover = 3 (allowed idle)