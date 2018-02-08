/**
 *Create by Zhang on 2018/1/2
 */
var CategoryModel=require('../../models/category/category');

var categoryController={};

//获取分类信息
categoryController.getCategory=function (req,res) {

    //console.log('分类信息');

    /*var Category=new CategoryModel({
        cno: 30,
        cname: '类别',
        cdesc: '按鲜花类别分类',

        ]
    });

    Category.save(function (err) {
        if(err){
            console.log('保存失败')
        }else{
            console.log('保存成功')
        }
    });*/
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

module.exports=categoryController;