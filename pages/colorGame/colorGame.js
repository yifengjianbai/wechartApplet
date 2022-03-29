Page({
  data: {
    rowData:[
      {column:['#4a86e8','#4a86e8','#4a86e8','#4a86e8']},
      {column:['#4a86e8','#4a86e8','#4a86e8','#4a86e8']},
      {column:['#4a86e8','#4a86e8','#4a86e8','#4a86e8']},
      {column:['#4a86e8','#4a86e8','#1160e1','#4a86e8']},
      {column:['#4a86e8','#4a86e8','#4a86e8','#4a86e8']},
    ],
    round:1,
    spColor:"#1160e1",
    second:5,
    percent:100,
    intervId:0,
    flag:false,
    score:0,
  },
  onLoad() {
    
  },
  init(){
    let thisData = this.data;
    thisData.rowData = [
      {column:['#4a86e8','#4a86e8','#4a86e8','#4a86e8']},
      {column:['#4a86e8','#4a86e8','#4a86e8','#4a86e8']},
      {column:['#4a86e8','#4a86e8','#4a86e8','#4a86e8']},
      {column:['#4a86e8','#4a86e8','#1160e1','#4a86e8']},
      {column:['#4a86e8','#4a86e8','#4a86e8','#4a86e8']},
    ]
    this.setData({
      rowData:thisData.rowData
    })
  },
  tapBlock(data) {
    let color = data.currentTarget.dataset.color;
    let that = this;
    let thisData = that.data;
    that.setData({
      score:thisData.score+thisData.second
    })
    that.setData({
      second:5,
      flag:true,
      percent:thisData.percent==100?99:100,
    })
    if(color==thisData.spColor){
      let bgR = Math.floor(Math.random()*255+1);//红色通道
      let bgG = Math.floor(Math.random()*255+1);//绿色通道
      let bgB = Math.floor(Math.random()*255+1);//蓝色通道
      let bgColor = "#" + this.formatString(bgR.toString(16)) + this.formatString(bgG.toString(16)) + this.formatString(bgB.toString(16));
      let spBgColor = "";
      let temIndex = 0;
      let spIndex = Math.floor((Math.random()*20)+1);//不一样颜色位置
      //循环给每个block添加颜色
      for(let i=0; i<thisData.rowData.length;i++){
        let r = thisData.rowData[i];
        for(let j=0; j< r.column.length;j++){
          temIndex++;
          r.column[j]=bgColor;
          //生成不一样的颜色
          if(temIndex==spIndex){
            let spBgR = this.offSetColor(thisData.round, bgR)
            let spBgB = this.offSetColor(thisData.round, bgB)
            let spBgG = this.offSetColor(thisData.round, bgG)
            spBgColor = "#" + this.formatString(spBgR.toString(16)) + this.formatString(spBgG.toString(16)) + this.formatString(spBgB.toString(16));
            r.column[j]=spBgColor;
          }
        }
      }
      thisData.round++;
      this.setData({
        rowData:thisData.rowData,
        spColor:spBgColor,
        round:thisData.round
      })
      clearInterval(thisData.intervId);
      thisData.intervId = setInterval(function(){
        thisData.second-=1;
        that.setData({
          second:thisData.second,
        })
      },1000);
      if(thisData.round>100){
        wx.showModal({
          title:'提示',
          content:'恭喜您通过',
          cancelColor: "#DD8800",
        })
        this.setData({
          spColor:"#1160e1",
          round:1,
          flag:false,
          second:5
        })
        this.init();
      }
    }else{
      this.setData({
        flag:false
      })
    }
  },
  endTime(){
    clearInterval(this.data.intervId);
    wx.showModal({
      title:'提示',
      content:'挑战失败，当前关数第'+this.data.round+'关，当前得分：' + this.data.score,
      cancelColor: "#DD8800",
    })
    this.setData({
      spColor:"#1160e1",
      round:1,
      second:5,
      flag:false,
      score:0
    })
    this.init();
  },
  //根据关卡数量和正常颜色生成不一样的颜色
  offSetColor(round, color){
    let offsetindex = 50-round*2;
    if(offsetindex<=0){
      offsetindex = 1;
    }
    //let offsetColor = Math.floor(Math.random()*(offsetindex*2+1)-offsetindex);
    let offsetColor = offsetindex;
    if(Math.random()>0.5){
      offsetColor = offsetColor*-1;
    }
    let resColor = offsetColor + color;
    if(resColor<0){
      resColor=0;
    }
    if(resColor>255){
      resColor=255;
    }
    return resColor;
  },
  formatString(s){
    if(s.length==1){
      return '0'+s;
    }
    else{
      return s;
    }
  }
})