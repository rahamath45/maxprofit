const buildings = [
  { sym: 'T', d: 5, e: 1500 },
  { sym: 'P', d: 4, e: 1000 },
  { sym: 'C', d: 10, e: 2000 }
];

function maxProfitTwoSolutions(n) {
  const dp = Array(n + 1).fill(0);
  const choice = Array(n + 1).fill(null).map(() => []);

  
  for (let r = 1; r <= n; r++) {
    let best = 0;
    let bestChoices = [];

    for (const b of buildings) {
      if (b.d <= r) {

    
        const profitIf = b.e * (r - b.d) + dp[r - b.d];

        if (profitIf > best) {
          best = profitIf;
          bestChoices = [b.sym];
        } else if (profitIf === best) {
          bestChoices.push(b.sym);
        }
      }
    }

    dp[r] = best;
    choice[r] = bestChoices;
  }


 function dfs(r) {
  if (r === 0) return [[]];

  const minD = Math.min(...buildings.map(b => b.d));


  if (r < minD) return [[]];

  if (choice[r].length === 0) return [];

  let res = [];

  for (const sym of choice[r]) {
    const d = buildings.find(b => b.sym === sym).d;
    let prev = dfs(r - d);

    prev.forEach(p => res.push([sym, ...p]));
  }

  return res;
}

  const seqs = dfs(n);

  
  const counts = seqs.map(seq => ({
    T: seq.filter(x => x === 'T').length,
    P: seq.filter(x => x === 'P').length,
    C: seq.filter(x => x === 'C').length
  }));

  
  const set = new Set();
  const final = [];

  for (const c of counts) {
    const key = `${c.T}-${c.P}-${c.C}`;
    if (!set.has(key)) {
      set.add(key);
      final.push(c);
    }
  }

  return {
    total: dp[n],
    solutions: final
  };
}


console.log(maxProfitTwoSolutions(7));
