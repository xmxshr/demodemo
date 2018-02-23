var Lazy = (function(){
  function Exposure($target, callback){
    this.$target = $target
    this.callback = callback
    this.bind()
    this.check()
  }

  //绑定滚动事件 并设置“锁”
  Exposure.prototype.bind = function(){
    var _this = this,
        clock
    $(window).on('scroll', function(){
      if(clock){
        clearTimeout(clock)
      }
      clock = setTimeout(function(){
        // console.log('clock')
        _this.check()
      }, 500)
    })
  }
  //判断目标元素($target)是否出现在视口内
  Exposure.prototype.check = function(){
    if(this.isShow(this.$target)){
      // console.log('hello')
      this.callback(this.$target)
    }
  }
  //设置“出现在视口内”的条件
  Exposure.prototype.isShow = function(){
    var scrollTop = $(window).scrollTop(), //视口顶部到页面顶部的距离
        windowHeight = $(window).height(), //视口高度
        offsetTop = this.$target.offset().top,//目标元素顶部到页面顶部的距离
        nodeHeight = this.$target.height()//目标元素的高度
        //目标元素出现在视口底部 && 未从顶部消失
    if(offsetTop < scrollTop + windowHeight && offsetTop + nodeHeight > scrollTop){
      return true
    }
    return false
  }


  return{
    init: function($targets, callback){
      $targets.each(function(idx, target){
        new Exposure($(target), callback)
      })
    }

  }
})()


Lazy.init($('#hello'),function($node){
  $node.text($node.text() + '22222')
})

Lazy.init($('.container img'),function($node){
  showImg($node)
})

function showImg($img){
  $img.attr('src', $img.attr('data-src'))
}