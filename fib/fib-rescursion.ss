;; This is O(n^n)
(define (fib-rescursion n)
  (if (< n 2)
      n
     (+ (fib-rescursion (- n 1)) (fib-rescursion (- n 2)))))
