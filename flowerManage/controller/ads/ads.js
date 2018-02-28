/**
 *Create by Zhang on 2018/2/25
 */
var AdsModel=require('../../models/ads/ads');
var formidable=require('formidable');
var fs=require('fs');

var adsController={};

//获取广告列表
adsController.getAds=function (req,res) {

    AdsModel.find({},function (err,doc) {
        if(err){
            res.send({
                status: 0,
                msg: '查询数据失败'
            })
        }else{
            res.send({
                status: 1,
                msg: doc
            })
        }
    })
}

//上传广告图片
adsController.uploadImg=function (req,res) {
    //console.log('图片上传');
    const form=formidable.IncomingForm();
    form.uploadDir='./public/images/ads/';  //上传图片的保存位置
    form.parse(req,function (err,fields,files) {
        if(err){
            throw err;
        }else{
            var fullName=(new Date().getTime() + Math.ceil(Math.random()*100)).toString(16)+files.file.name;
            var repath='./public/images/ads/'+fullName;
            fs.rename(files.file.path,repath);
            res.send({
                status:1,
                result: repath
            })
        }
    })
}

//添加广告
adsController.addAds=function(req,res){
    var params={
        id: req.body.id,
        link: req.body.link,
        pic : req.body.pic
    }
    var adsModel=new AdsModel(params);
    adsModel.save(function (err) {
        if(err){
            res.send({
                status: 0,
                msg: '添加失败'
            })
        }else{
            res.send({
                status: 1,
                msg: '添加成功'
            })
        }
    })
}

//删除广告
adsController.deleteAds=function (req,res) {
    var id=req.query.id;
    AdsModel.remove({_id:id},function (err,doc) {
        //console.log(doc)
        if(err){
            res.send({
                status: 0,
                result: '删除数据失败'
            })
        }else{
            res.send({
                status: 1,
                result: doc
            })
        }
    })
}

//修改
adsController.updateAds=function (req,res) {

    var params={
        _id: req.body._id,
        id: req.body.id,
        link: req.body.link,
        pic: req.body.pic
    }
    AdsModel.update({_id:params._id},{$set:params},function (err,result) {
        if(err){
            res.send({
                status: 0,
                msg: '修改失败'
            })
        }else{
            res.send({
                status: 1,
                msg: "修改成功"
            })
        }
    });
}

module.exports=adsController;