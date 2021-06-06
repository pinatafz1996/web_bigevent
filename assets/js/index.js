$(function() {

  var layer = layui.layer
    // 调用 getUserInfo 取用户基本信息
  getUserInfo()
  $('#btnLogout').on('click', function() {
    // 提示用户确认是否退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
      //do something
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index)
    });
  })
})

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    url: '/my/userinfo',
    method: 'GET',
    // headers就是请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function(res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用 renderAvatar 渲染用户头像
      renderAvatar(res.data)
    }
  })
}

// 渲染用户的头像
function renderAvatar(user) {
  // 1.获取用户名称
  var name = user.nickname || user.username
    // 2. 设置欢迎的文本
  $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}