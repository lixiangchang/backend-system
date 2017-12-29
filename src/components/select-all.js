export default class SelectAll {
  constructor(id, options) {
    this.id = document.querySelector(id)
    if (!this.id) return false
    let defaults = { children: '.checkbox-select' }
    this.options = Object.assign(defaults, options)
    this.eBtns = document.querySelectorAll(this.options.children)
    this.status = []
    this.init()
  }

  init() {
    this.id.addEventListener('change', e => {
      let _this = e.target
      ;[].forEach.call(this.eBtns, (btn, index) => {
        btn.checked = _this.checked
        this.status[index] = _this.checked
      })
    })
    ;[].forEach.call(this.eBtns, (btn, index) => {
      this.status.push(btn.checked)
      btn.addEventListener('change', () => {
        this.id.checked = this.isChecked(index) ? true : false
      })
    })
  }

  isChecked(index) {
    let items = this.status
    let status = false
    items[index] = !items[index]
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item === false) {
        status = false
        break
      } else {
        status = true
      }
    }
    return status
  }
}
