// @flow
import { append, reverse } from 'ramda'

export const callbackMiddleware = (...middlewares: Array<Function>) => (callback: Function) => (...params: Array<any>) => {
  const [cb, ...reversedParams] = reverse(params)
  const otherParams = typeof cb === 'function' ? reverse(reversedParams) : params
  return reverse(middlewares).reduce((next, middleware) => error => error ? next(error) : middleware.apply(null, append(next, otherParams)), error => error ? cb && cb(error) : callback.apply(null, params))()
}

export const promiseMiddleware = (...middlewares: Array<Function>) => (callback: Function) => (...params: Array<any>) => middlewares.reduce((promise, middleware) => middleware.apply(null, params).then(() => promise), Promise.resolve()).then(() => callback.apply(null, params))
