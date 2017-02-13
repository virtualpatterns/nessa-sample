import CreateContent from 'virtual-dom/create-element'
import Diff from 'virtual-dom/diff'
import Log from 'mablung/library/log'
import Patch from 'virtual-dom/patch'

const WelcomePug = require('./welcome.pug')
const IndexPug = require('./index.pug')

document.addEventListener('DOMContentLoaded', () => {

  let virtualContentPug = IndexPug({
    'name': 'virtualpatterns.com',
    'now': new Date()
  })

  document.querySelector('#content-pug').appendChild(CreateContent(virtualContentPug))

  setInterval(() => {

    let newVirtualContentPug = IndexPug({
      'name': 'virtualpatterns.com',
      'now': new Date()
    })

    Patch(document.querySelector('#content-pug > div'), Diff(virtualContentPug, newVirtualContentPug))

    virtualContentPug = newVirtualContentPug

  }, 1000)

})
