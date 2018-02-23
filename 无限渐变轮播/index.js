let Carousel = (function(){
  function _Carousel($ct){
    this.$ct = $ct
    this.init()
    this.bind()
    this.play(0)
    this.autoPlay()
  }

  _Carousel.prototype = {
    init(){
      this.$imgs = this.$ct.find('.img-ct li')
      this.$imgCt = this.$ct.find('.img-ct')
      this.$preBtn = this.$ct.find('.pre')
      this.$nextBtn = this.$ct.find('.next')
      this.$bullets = this.$ct.find('.bullet li')
  
      this.autoPlayTime = 3000 //自动播放间隔时间
      this.imgCount = this.$imgs.length //图片数量
      this.pageIndex = 0 //当前坐标
      this.isAnimating = false //事件锁
    },
    bind(){
      let _this = this
      this.$preBtn.on('click', function(){
        _this.playPre()
      })
      this.$nextBtn.on('click', function(){
        _this.playNext()
      })
      this.$bullets.on('click', function(){
        let index = $(this).index()
        _this.play(index)
      })
    },
    playNext(){
      let _this = this
      this.play((_this.pageIndex+1)%_this.imgCount) //(0+1)%5 = 1   
    },
    playPre(){
      let _this = this
      this.play((_this.pageIndex+_this.imgCount-1)%_this.imgCount) //(4+5-1)% = 3    
    },
    play(index){
      let _this = this
      //设置“锁”
      if(this.isAnimating){
        return
      }
      this.isAnimating = true
      //$(selector).fadeOut(speed,callback)
      this.$imgs.eq(_this.pageIndex).fadeOut(400)
      this.$imgs.eq(index).fadeIn(400, function(){
        //触发后解除“锁”
        _this.isAnimating = false
      })
      this.pageIndex = index
      this.setBullet()
    },
    setBullet(){
      let _this = this
      this.$bullets.removeClass('active').eq(_this.pageIndex).addClass('active')
    },
    //自动播放
    autoPlay(){
      let _this = this
      setInterval(function(){
        _this.playNext()
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