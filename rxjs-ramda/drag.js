const { fromEvent, of, combineLatest } = rxjs;
const { takeUntil, switchMap, map, startWith } = rxjs.operators;
const { pick, compose } = R;

const draggable = document.querySelector('.box');
const bin = document.querySelector('.bin');

const isWithinDropzone = ([
  { left, right, top, bottom },
  { clientX, clientY }
]) => clientX > left && clientX < right && clientY > top && clientY < bottom;

const down$ = fromEvent(draggable, 'mousedown');
const move$ = fromEvent(document, 'mousemove');
const up$ = fromEvent(draggable, 'mouseup');
const bin$ = of(bin);

const dropArea$ = bin$.pipe(
  map(
    compose(
      pick(['left', 'right', 'top', 'bottom']),
      el => el.getBoundingClientRect(),
    )));

const overBin$ = combineLatest(dropArea$, move$).pipe(
  map(isWithinDropzone),
  startWith(false),
  takeUntil(up$),
);

const dragAndDrop$ = down$.pipe(
  map(({target, clientX, clientY }) => ({
    startX: clientX + window.scrollX,
    startY: clientY + window.scrollY,
    startLeft: parseInt(target.style.left, 10) || 10,
    startTop: parseInt(target.style.top, 10) || 10,
  })),
  switchMap(({ startX, startY, startLeft, startTop }) => {
    const dragging$ = move$.pipe(
      map(evt => ({
        left: startLeft + evt.clientX - startX,
        top: startTop + evt.clientY - startY,
      })),
      takeUntil(up$),
    );
    return combineLatest(dragging$, overBin$);
  }),
);

dragAndDrop$.subscribe(([dragging, overBin]) => {
  draggable.style.top = dragging.top +'px';
  draggable.style.left = dragging.left + 'px';
  if (overBin) {
    bin.style.borderColor = 'red';
  } else {
    bin.style.borderColor = 'black';
  }
});
