const { fromEvent, combineLatest } = rxjs;
const { map, takeWhile, tap} = rxjs.operators;

let els = ['valuea','valueb'];

let elResults = document.getElementById('results');

const genObservableAndElement = R.map(R.pipe(
  id => document.getElementById(id),
  el => [fromEvent(el,'change'), el],
));

const sum$ = R.pipe(
  R.map(R.head),
  R.flatten,
  R.apply(combineLatest),
);

const observableAndElement = genObservableAndElement(els);

sum$(observableAndElement).pipe(
  map(R.map(e => e.target.value)),
  tap(v => console.log(v)),
  takeWhile(R.all(R.test(/^\d+$/))),
  tap(v => console.log(v)),
  map(R.map(v => parseInt(v))),
).subscribe(
  (results) => elResults.textContent = 'Total: ' + R.sum(results),
);

function attachError([observable,el]) {
  observable.pipe(
    map(e => e.target.value),
    map(R.test(/^\d+$/)),
  ).subscribe(
    (results) => {
      if (results) {
        el.className = "";
      } else {
        el.className = "error";
      }
    }
  );
}

R.forEach(ele => attachError(ele), observableAndElement);
