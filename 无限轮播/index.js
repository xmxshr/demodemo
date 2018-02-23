let Carousel = (function(){
  let _Carousel = function($ct){
    this.$ct = $ct
    this.init()
    this.bind()
    this.autoPlay()
  }
  _Carousel.prototype = {
    init(){
    this.$imgCt = this.$ct.find('.img-ct')
    this.$imgs = this.$ct.find('.img-ct li')
    this.$preBtn = this.$ct.find('.pre')
    this.$nextBtn = this.$ct.find('.next')
    this.$bullets = this.$ct.find('.bullet li')

    this.autoPlayTime = 3000 //自动播放间隔
    this.pageIndex = 0 //当前页码
    this.isAnimating = false 
    this.imgCount = this.$imgs.length 
    this.imgWidth = this.$imgs.width() 

    this.$imgCt.append(this.$imgs.first().clone())
    this.$imgCt.prepend(this.$imgs.last().clone())
    this.$imgCt.width((this.imgCount + 2) * this.imgWidth)
    this.$imgCt.css({left: -this.imgWidth})
    },
    bind(){
      let _this = this
      this.$preBtn.click(function () {
        _this.playPre(1)
      })
      this.$nextBtn.click(function () {
        _this.playNext(1)
      })
      this.$bullets.click(function () {
        let index = $(this).index()
        if (index > _this.pageIndex) {
          _this.playNext(index - _this.pageIndex)
        } else if (index < _this.pageIndex) {
          _this.playPre(_this.pageIndex - index)
        }
      })
    },
    playPre(len) {
      let _this = this
      if(this.isAnimating){
        return
      }
      this.isAnimating = true
      this.$imgCt.animate({
        left: '+=' + len*_this.imgWidth
      },function(){
        _this.pageIndex -= len
        if(_this.pageIndex === -1){
          _this.pageIndex = _this.imgCount-1
          _this.$imgCt.css({
              left: -(_this.imgCount*_this.imgWidth)
            })
        }
        _this.isAnimating = false
        _this.setBullets()
      })   
    },
    playNext(len){
      let _this = this
      if(_this.isAnimating){
        return
      }
      this.isAnimating = true
      this.$imgCt.animate({
        left: '-=' + len*_this.imgWidth
      },function(){
        _this.pageIndex+=len
        if(_this.pageIndex === _this.imgCount){
          _this.pageIndex = 0
          _this.$imgCt.css({left: -_this.imgWidth})
        }
        _this.isAnimating = false
        _this.setBullets()
      })
    },
    setBullets(){
      let _this = this
      this.$bullets.removeClass('active').eq(_this.pageIndex).addClass('active')
    },

    // 比普通的轮播多了autoPlay()
    //自动播放
    autoPlay(){
      let _this = this
      setInterval(function(){
        _this.playNext(1)
      },_this.autoPlayTime)
    }
  }
    
  return {
    init: function($ct){
      $ct.each(function(index, node){
        new _Carousel($(node))
      })
    }
  }
})()

Carousel.init($('.carousel'))
