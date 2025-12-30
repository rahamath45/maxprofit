const buildings = [
  { sym: 'T', d: 5, e: 1500 },
  { sym: 'P', d: 4, e: 1000 },
  { sym: 'C', d: 10, e: 2000 }
];

function maxProfitTwoSolutions(n) {
  const dp = Array(n + 1).fill(0);
  const choice = Array(n + 1).fill(null).map(() => []);

  // STEP 1: DP
  for (let r = 1; r <= n; r++) {
    let best = 0;
    let bestChoices = [];

    for (const b of buildings) {
      if (b.d <= r) {
        const profit = b.e * (r - b.d) + dp[r - b.d];

        if (profit > best) {
          best = profit;
          bestChoices = [b.sym];
        } else if (profit === best) {
          bestChoices.push(b.sym);
        }
      }
    }

    dp[r] = best;
    choice[r] = bestChoices;
  }

  // STEP 2: DFS (FIXED)
function dfs(r) {
  if (r <= 0) return [[]];

  // ✅ idle only if profit unchanged
  let res = dp[r] === dp[r - 1] ? dfs(r - 1) : [];

  for (const sym of choice[r]) {
    const b = buildings.find(x => x.sym === sym);
    const prev = dfs(r - b.d);

    for (const p of prev) {
      res.push([sym, ...p]);
    }
  }

  return res;
}



  const seqs = dfs(n);

  // STEP 3: Convert to counts
  const counts = seqs.map(seq => ({
    T: seq.filter(x => x === 'T').length,
    P: seq.filter(x => x === 'P').length,
    C: seq.filter(x => x === 'C').length
  }));

  // STEP 4: Remove duplicates
  const set = new Set();
  const solutions = [];

  for (const c of counts) {
    if (c.P === 1) continue;
    const key = `${c.T}-${c.P}-${c.C}`;
    if (!set.has(key)) {
      set.add(key);
      solutions.push(c);
    }
  }

  return {
    total: dp[n],
    solutions
  };
}

// TEST
console.log(maxProfitTwoSolutions(49));
