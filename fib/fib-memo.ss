;; This is O(2n)

(define (gen-fib-memo n)
  (let ((memo (make-vector (+ n 1))))
    (define (fib-calc n)
      (if (> (vector-ref memo n) 0)
          (vector-ref memo n)
          (if (< n 2) n
              (let ((result (+ (fib-calc (- n 1)) (fib-calc (- n 2)))))
                (vector-set! memo n result)
                result
                ))))
    fib-calc))

(define (fib-memo n)
  (let ((fib-calc (gen-fib-memo n)))
    (fib-calc n)))
