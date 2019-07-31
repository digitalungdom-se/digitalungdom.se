import createAsyncFunction from './createAsyncFunction.js'

export const State = {
  addFunction: (name, method, route, template) => ({
    type: 'ADD_FUNCTION',
    name,
    method,
    route,
    template
  }),
  removeFunction: (name) => ({
    type: 'REMOVE_FUNCTION',
    name
  }),
  ...createAsyncFunction('do_function', null, [])
}
