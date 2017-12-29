// 全选
import SelectAll from '../components/select-all'
//
import '../components/public'

function selectAll() {
  new SelectAll('#checkbox-parent', {
    children: '.checkbox-select'
  })
}

// 加载 Layer js
;(function loadLayer() {
  var nScript = document.createElement('script')
  nScript.src = '/scripts/layer/dist/layer.js'
  document.body.appendChild(nScript)
})()

document.addEventListener('DOMContentLoaded', function() {
  selectAll()
})
