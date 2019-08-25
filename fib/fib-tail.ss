;; This is O(n)
(define (fib-tail n)
  (define (calc-fib n a b)
    (if (= n 0) a
        (calc-fib (- n 1) b (+ a b))))
  (calc-fib n 0 1))
