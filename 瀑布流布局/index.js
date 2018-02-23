var WaterFull = (function(){
  function _WaterFull($ct){
    this.$ct = $ct
    this.init()
    this.bind()
    this.change()
  }

  _WaterFull.prototype = {
    init(){
      this.$item = this.$ct.find('.item')
      this.colLength
      this.itemArr
      this.minValue
      this.minIndex
    },
    bind(){
      let _this = this
      $(window).resize(function(){
        _this.change()
      })
    },
    change(){
      let _this = this
      this.colLength = parseInt(this.$ct.width()/this.$item.outerWidth(true))
      this.itemArr = []

      for(var i=0; i<this.colLength; i++){
        this.itemArr[i] = 0
      }
      //遍历每一个item
      this.$item.each(function(index, node){
        _this.minValue = Math.min.apply(null, _this.itemArr)
        _this.minIndex = _this.itemArr.indexOf(_this.minValue)
        //放入最短的那一列
        $(node).css({
          top: _this.itemArr[_this.minIndex],
          left: $(node).outerWidth(true)*_this.minIndex
        })
        // console.log(_this.itemArr)
        // console.log(`width${$(node).outerWidth(true)}`)
        // console.log(`value${Math.min.apply(null, _this.itemArr)}`)
        // console.log(`index${_this.itemArr.indexOf(_this.minValue)}`)

        //最短那列加上该item的高度
        _this.itemArr[_this.minIndex] += $(node).outerHeight(true)
      })
    }
  }

  return  {
    init: function($ct){
      $ct.each(function(index, node){
        new _WaterFull($(node))
      })
    }
  }
})()

WaterFull.init($('.container'))
