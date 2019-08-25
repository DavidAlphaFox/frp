
let elValueA = document.getElementById('valuea');
let elValueB = document.getElementById('valueb');
let elResults = document.getElementById('results');

function updateResults(valueA,valueB) {
  let results = parseInt(valueA) + parseInt(valueB);
  elResults.textContent = 'Total: ' + results;
}

function callback(e) {
  let valueB = elValueB.value;
  let valueA = elValueA.value;
  if(valueB === undefined) return;
  if(valueA === undefined) return;
  if(!(/^\d+$/.test(valueA) && /^\d+$/.test(valueB))) return;
  updateResults(valueA,valueB,elResults);
};

elValueA.addEventListener('change',function(e){ callback(e)});
elValueB.addEventListener('change',function(e){ callback(e)});
