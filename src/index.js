// DO NOT MAKE CHANGES TO THIS FILE
// DO NOT MAKE CHANGES TO THIS FILE
// DO NOT MAKE CHANGES TO THIS FILE
import 'regenerator-runtime'
import { worker } from './mocks/browser'

import { mainAppender } from './components/main'
import { headerAppender } from './components/header'

console.log("index.js is connected")

worker.start()

headerAppender('.header-container')
mainAppender('.main-container')
