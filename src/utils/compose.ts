/** koa-compose */
export default function compose(middleware: any[]) {
    if (!Array.isArray(middleware)) throw new TypeError('传数组!')
    for (const fn of middleware) {
        if (typeof fn !== 'function') throw new TypeError('请传入函数数组!')
    }

    return function (context: any, next: Function) {
        let index = -1
        return dispatch(0)
        function dispatch(i: number) {
            if (i <= index) return Promise.reject(new Error('多次调用同一组函数'))
            index = i
            let fn = middleware[i]
            if (i === middleware.length) fn = next
            if (!fn) return Promise.resolve()
            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}
