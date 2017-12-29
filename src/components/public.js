//删除
if ($('.delete').length) {
  $('.delete').on('click', function() {
    layer.confirm(
      '确定要删除吗？',
      {
        btn: ['确定', '取消'] //按钮
      },
      function() {
        layer.msg('已删除', { icon: 1 })
      }
    )
  })
}
//返回上一级
if ($('.return').length) {
  $('.return').on('click', function() {
    window.history.go(-1)
  })
}
