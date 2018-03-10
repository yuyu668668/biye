/**
 *Create by Zhang on 2018/1/2
 */
var CategoryModel=require('../../models/category/category');
var GoodsModel=require('../../models/goods/goods')

var categoryController={};

//获取分类信息
categoryController.getCategory=function (req,res) {

    CategoryModel.find({},function (err,doc) {
        if(err){
            res.send({
                status: 0,
                msg: err.message
            })
        }else{
            //console.log(doc)
            res.send({
                status: 1,
                result: doc
            })
        }
    })
}

//添加分类
categoryController.addCategory=function(req,res){
    var categoryParams={
        cno: req.body.id,
        cname: req.body.name,
        cdesc: req.body.desc
    }
    //console.log(categoryParams)
    var categoryModel=new CategoryModel(categoryParams);
    categoryModel.save(function (err) {
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

//修改分类信息
categoryController.updateCategory=function(req,res){
    const params={
        _id: req.body._id,
        cno: req.body.cno,
        cname: req.body.cname,
        cdesc: req.body.cdesc
    }
    //console.log(params)
    CategoryModel.update({_id: params._id},{$set: params},function (err) {
        if(err){
            res.send({
                status: 0,
                msg: '修改分类失败'
            })
        }else{
            res.send({
                status: 1,
                msg: '修改分类成功'
            })
        }
    })

}

//删除分类
categoryController.deleteCategory=function (req,res) {
    //console.log('删除分类')
    var id=req.query.id;
    //console.log(id)

    //找到该分类下所有商品，并删除
    GoodsModel.find({link_category: id},function (err,doc) {
        if(err){
            res.send({
                status: 0,
                msg: err.message
            })
        }else{
            //console.log(doc.length)
            if(doc.length>0){
                doc.forEach(function (item) {
                    //console.log(item._id+",,")
                    GoodsModel.remove({_id:item._id},function (err) {
                        if(err){
                            console.log(err)
                        }
                    })
                })
            }
        }
    })

    //删除该分类
    CategoryModel.remove({_id: id},function (err) {
        if(err){
            res.send({
                status: 0,
                msg: '删除失败'
            })
        }else{
            res.send({
                status: 1,
                msg: '删除成功'
            })
        }
    })
}

//根据分类查询每个分类下的所有商品
/*categoryController.findGoodsByCategoryId=function(req,res){
    CategoryModel.find({},function (err,doc) {
        if(err){
            res.send({
                status: 0,
                msg: '查询失败'
            })
        }else if(doc.length>0){
                doc.forEach(function (item) {
                    GoodsModel.find({link_category:item._id},function (err,goods) {
                        if(err){
                            res.send({
                                status: 0,
                                msg:'查询失败'
                            })
                        }else{
                            res.send({
                                status: 1,
                                msg: goods
                            })
                        }
                    })
                })
            }

    })
}*/

module.exports=categoryController;