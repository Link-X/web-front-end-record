const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const DEFAULT_HTML = '<html><body></body></html>'

import { getTimeData, countTime } from '../src/variate/load/index'

test('time data test', () => {
    global.document = new JSDOM(DEFAULT_HTML)

    global.window = document.defaultView
    global.window.location.href = 'http://127.0.0.1:8080/error.html'
    console.log(window.performance)
    // expect(getTimeData()).not.toBeUndefined()
})
