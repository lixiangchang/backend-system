document.addEventListener('DOMContentLoaded', function() {
  var navMain = document.querySelector('.main-nav')
  var items = navMain.querySelectorAll('.nav-item')
  ;[].forEach.call(items, (item, index) => {
    let isChild = item.querySelector('ul')
    let target = item.children[0]
    let collapse = item.children[1]
    if (isChild) {
      target.dataset.toggle = 'collapse'
      target.dataset.parent = '#exampleAccordion'
      target.href = '#exampleAccordion' + index
      collapse.id = 'exampleAccordion' + index
    }
  })
  new navIframe()
})

class navIframe {
  constructor() {
    this.pages = []
    this.navBtns = $('.btn-set-menu')
    this.mainIframe = $('.main-iframe')
    this.tabMenu = $('#tab-menu')
    this.init()
  }

  init() {
    this.tabMenu.on('click', '.btn', e => {
      let $this = $(e.target)
      let parent = $this.hasClass('btn') ? $this : $this.parent()
      let index = parent.index()
      this.switchTab(index)
    })

    this.tabMenu.on('click', '.icon-delete', e => {
      let $this = $(e.target)
      let parent = $this.parent()
      let index = parent.index()
      this.removeTag(parent)
      this.removeIframe(index)
      this.pages.splice(index - 1, 1)
    })
    Array.prototype.forEach.call(this.navBtns, element => {
      element.addEventListener('click', this.triggerListener.bind(this))
    })
  }

  /**
   * 监听事件
   *
   * @param {Event} e
   */
  triggerListener(e) {
    e.preventDefault()
    let _this =
      e.target.nodeName.toLowerCase() === 'span'
        ? e.target.parentNode
        : e.target
    let url = _this.href
    let name = _this.textContent.trim()
    let hasContains = this.pages.findIndex((item, index) => {
      return item.name === name
    })

    // 不存在时 添加
    if (hasContains === -1) {
      this.pages.push({ name, url })
      this.addIframe(url)
      this.addTag(name)
    } else {
      this.switchTab(hasContains + 1)
    }
  }

  switchTab(index) {
    var eBtns = this.tabMenu.children()
    let eIframes = this.mainIframe.children()
    eBtns.addClass('btn-secondary')
    eBtns.eq(index).removeClass('btn-secondary')
    eIframes.removeClass('active')
    eIframes.eq(index).addClass('active')
  }

  addIframe(path) {
    let eIframes = this.mainIframe.children()
    let cloneIframe = eIframes.eq(0).clone(true)
    cloneIframe[0].src = path
    cloneIframe[0].classList.add('active')
    eIframes.each((i, element) => {
      $(element).removeClass('active')
    })
    this.mainIframe.append(cloneIframe)
  }

  removeIframe(index) {
    let eIframes = this.mainIframe.children()
    eIframes.eq(index).remove()
  }

  addTag(name) {
    this.tabMenu.children().addClass('btn-secondary')
    let cloneElement = this.tabMenu
      .children()
      .eq(0)
      .clone(true)
    cloneElement.removeClass('btn-secondary')
    cloneElement.find('span:first').html(name)
    this.tabMenu.append(cloneElement)
  }
  removeTag(element) {
    element.remove()
  }
}
