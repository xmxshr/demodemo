    //从后台获取歌曲的时间
    var time = '3:02'.split(':')

    //设置span的初始值
    var span2 = document.getElementById('span2')
    var span1 = document.getElementById('span1')
    span2.innerText = '3:02'
    span1.innerText = '0:00'

    //设置总秒数
    var minute = +time[0] * 60
    var second = +time[1]
    var finalSecond = minute + second
    console.log(finalSecond)

    //获取delta 每秒translate的百分比
    var length = document.getElementsByClassName('line-wrapper')[0].offsetWidth
    var line = document.getElementsByClassName('line')[0]
    var delta = length / finalSecond / length * 100
    console.log(delta)

    var initValue = -100
    var i = 1

    //每秒设置translate
    var time = setInterval(function () {
      setspan1(i)
      i++
      var finalValue = initValue + delta
      var transforms = 'translateX(' + finalValue + '%' + ')'
      console.log(transforms)
      line.style.transform = transforms
      initValue = finalValue
      console.log(i)
      if ((i - 1) === finalSecond) {
        clearInterval(time)
      }
    }, 1000)

    //设置span1的时间
    function setspan1(i) {
      var minute1 = 0
      var second1 = i
      if (i < 10) {
        second1 = '0' + i
        span1.innerText = minute1 + ':' + second1
      } else if (i > 59) {
        minute1 = parseInt(i / 60)
        second1 = i - minute1 * 60
        if (second1 < 10) {
          second1 = '0' + second1
        }
        span1.innerText = minute1 + ':' + second1
      } else {
        span1.innerText = minute1 + ':' + second1
      }
    }