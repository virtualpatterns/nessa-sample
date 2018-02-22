import CreateContent from 'virtual-dom/create-element'
import Diff from 'virtual-dom/diff'
import { Log } from '@virtualpatterns/mablung'
import Patch from 'virtual-dom/patch'
import Utilities from '@virtualpatterns/nessa'

const Welcome = require('./welcome.pug')
const Index = require('./index.pug')

document.addEventListener('DOMContentLoaded', () => {
  Log.createFormattedLog()
  Log.debug('document.addEventListener(\'DOMContentLoaded\', () => { ... }')

  let virtualContent = Index({
    Welcome,
    'name': 'virtualpatterns.com',
    'now': new Date(),
    Utilities
  })

  document.querySelector('div.content').appendChild(CreateContent(virtualContent))

  setInterval(() => {

    let newVirtualContent = Index({
      Welcome,
      'name': 'virtualpatterns.com',
      'now': new Date(),
      Utilities
    })

    Patch(document.querySelector('div.content > div'), Diff(virtualContent, newVirtualContent))

    virtualContent = newVirtualContent

  }, 1000)

})
