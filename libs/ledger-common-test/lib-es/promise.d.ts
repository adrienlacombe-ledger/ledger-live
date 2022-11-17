export declare const delay: (ms: number) => Promise<void>;
declare const defaults: {
    maxRetry: number;
    interval: number;
    intervalMultiplicator: number;
    context: string;
};
export declare function retry<A>(f: () => Promise<A>, options?: Partial<typeof defaults>): Promise<A>;
declare type Job<R, A extends Array<any>> = (...args: A) => Promise<R>;
export declare const atomicQueue: <R, A extends any[]>(job: Job<R, A>, queueIdentifier?: (...args: A) => string) => Job<R, A>;
export declare function execAndWaitAtLeast<A>(ms: number, cb: () => Promise<A>): Promise<A>;
/**
 * promiseAllBatched(n, items, i => f(i))
 * is essentially like
 * Promise.all(items.map(i => f(i)))
 * but with a guarantee that it will not create more than n concurrent call to f
 * where f is a function that returns a promise
 */
export declare function promiseAllBatched<A, B>(batch: number, items: Array<A>, fn: (arg0: A, arg1: number) => Promise<B>): Promise<B[]>;
export {};
//# sourceMappingURL=promise.d.ts.map