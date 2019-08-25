const { fromEvent } = rxjs;
const { takeUntil, mergeMap, tap,map,delay,debounceTime } = rxjs.operators;
const draggable = document.querySelector('.box');
const follow = document.querySelector('.box2');

const up$ = fromEvent(draggable, 'mouseup');
const move$ = fromEvent(document, 'mousemove');
const down$ = fromEvent(draggable, 'mousedown');

const drag$ = down$.pipe(
  map(({target, clientX, clientY }) => ({
    startX: clientX + window.scrollX,
    startY: clientY + window.scrollY,
    startLeft: parseInt(target.style.left, 10) || 10,
    startTop: parseInt(target.style.top, 10) || 10,
  })),
  mergeMap(({startX, startY, startLeft, startTop}) => move$.pipe(
    map(evt => ({
      top: startTop + evt.clientY - startY,
      left: startLeft + evt.clientX - startX,
    })),
    takeUntil(up$),
  )),
);
const subscription = drag$.subscribe((pos) => {
    draggable.style.top = pos.top + 'px';
    draggable.style.left = pos.left + 'px';
  });
const subscription2 = drag$.pipe(
  delay(100)
).subscribe((pos) => {
    follow.style.top = pos.top - 140 + 'px';
    follow.style.left = pos.left -10 + 'px';
});
