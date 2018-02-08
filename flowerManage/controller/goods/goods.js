/**
 *Create by Zhang on 2018/1/3
 */
var GoodsModel=require('../../models/goods/goods');
//var CategoryModel=require('../../models/category/category');
var formidable=require('formidable');
var fs=require('fs');

var goodsController={};

//获取商品列表
goodsController.getGoods=function (req,res) {
    var offset=req.query.offset;
    var limit=req.query.limit;
    GoodsModel.find({}).populate('link_category').limit(Number(limit)).skip(Number(offset)).exec(function (err,doc) {
        if(err){
            res.send({
                status:0,
                messages: '查询数据失败'
            })
        }else{
            res.send({
                status: 1,
                result: doc
            })
        }
    })
};

//获取商品总条数
goodsController.getGoodsCount=function (req,res) {
    GoodsModel.count({},function (err,doc) {
        //console.log(doc)
        if(err){
            throw err;
        }
        res.send({
            status: 1,
            count: doc
        })
    })
}

//添加商品
goodsController.addGoods=function (req,res) {
    //console.log('添加商品')
    var params={
        gno: req.body.id,
        name: req.body.name,
        price: req.body.price,
        gdesc: req.body.desc,
        link_category: req.body.category,
        images: req.body.imageUrl
    }
    //console.log(params)
    var goodsModel=new GoodsModel(params);
    goodsModel.save(function(err){
        if(err){
            res.send({
                status: 0,
                msg :"添加失败"
            })
        }else{
            //console.log('保存成功')
            res.send({
                status: 1,
                msg: "添加成功"
            })
        }
    })
}

//上传商品图片
goodsController.addImg=function (req,res) {
    //console.log('图片上传');
    const form=formidable.IncomingForm();
    form.uploadDir='./public/images';
    form.parse(req,function (err,fields,files) {
        if(err){
            throw err;
        }else{
            var fullName=(new Date().getTime() + Math.ceil(Math.random()*10000)).toString(16)+files.file.name;
            var repath='./public/images/'+fullName;
            console.log(repath)
            fs.rename(files.file.path,repath);
            res.send({
                status:1,
                result: repath
            })
        }
    })

}

//修改商品信息
goodsController.updateGoods=function (req,res) {
    //console.log('修改商品信息')
   const params={
       _id:req.body._id,
       id: req.body.id,
       name:req.body.name,
       price:req.body.price,
       desc: req.body.desc,
       category:req.body.category,
       images: req.body.images
   }



    var newData={
        gno: params.id,
        name: params.name,
        price: params.price,
        gdesc: params.desc,
        images: params.images,
        link_category: params.category,
    }
    /*CategoryModel.findOne({cname: params.category},function (err,doc) {
        if(err){
            throw err;
        }else{
            console.log(doc._id)
        }
    })*/
    //console.log(newData)

   //console.log(params)
    //var goodsModel=new GoodsModel();

    GoodsModel.update({_id:params._id},{$set:newData},function (err,result) {
        if(err){
            res.send({
                status: 0,
                msg: err.message
            })
        }else{
            res.send({
                status: 1,
                msg: "修改成功"
            })
        }
    });

}

//删除商品
goodsController.deleteGoods=function (req,res) {
    
    var id=req.query.id;
    GoodsModel.remove({_id:id},function (err,doc) {
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

module.exports=goodsController;