Page({
  data: {
    rowData:[
      {column:['#AA8877','#AA8877','#AA8877','#AA8877']},
      {column:['#AA8877','#AA8877','#AA8877','#AA8877']},
      {column:['#AA8877','#AA8877','#AA8877','#AA8877']},
      {column:['#AA8877','#AA8877','#BB5588','#AA8877']},
      {column:['#AA8877','#AA8877','#AA8877','#AA8877']},
    ],
    round:1,
    spColor:"#BB5588"
  },
  onLoad() {
    
  },
  init(){
    let thisData = this.data;
    thisData.rowData = [
      {column:['#AA8877','#AA8877','#AA8877','#AA8877']},
      {column:['#AA8877','#AA8877','#AA8877','#AA8877']},
      {column:['#AA8877','#AA8877','#AA8877','#AA8877']},
      {column:['#AA8877','#AA8877','#BB5588','#AA8877']},
      {column:['#AA8877','#AA8877','#AA8877','#AA8877']},
    ]
    this.setData({
      rowData:thisData.rowData
    })
  },
  tapBlock2(){
    let thisData = this.data;
    //循环给每个block添加颜色
    for(let i=0; i<thisData.rowData.length;i++){
      let r = thisData.rowData[i];
      for(let j=0; j< r.column.length;j++){
        r.column[j]="#ff0000";
      }
    }
    this.setData({
      rowData:thisData.rowData
    })
  },
  tapBlock(data) {
    let color = data.currentTarget.dataset.color;
    let thisData = this.data;
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
            let spBgG = this.offSetColor(thisData.round, bgG)
            let spBgB = this.offSetColor(thisData.round, bgB)
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
      if(thisData.round>100){
        wx.showModal({
          title:'提示',
          content:'恭喜您通过',
          cancelColor: "#DD8800",
        })
        this.init();
      }
    }else{
      wx.showModal({
        title:'提示',
        content:'挑战失败，当前关数第'+thisData.round+'关',
        cancelColor: "#DD8800",
      })
      this.setData({
        spColor:"#BB5588",
        round:1
      })
      this.init();
    }
  },
  //根据关卡数量和正常颜色生成不一样的颜色
  offSetColor(round, color){
    let offsetindex = 100-round;
    if(offsetindex<=0){
      offsetindex = 1;
    }
    //let offsetColor = Math.floor(Math.random()*(offsetindex*2+1)-offsetindex);
    let offsetColor = offsetindex;
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