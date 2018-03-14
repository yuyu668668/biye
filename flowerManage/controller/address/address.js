/**
 *Create by Zhang on 2018/3/8
 */

var AddressModel=require('../../models/address/address');


var addressController={};

//根据用户id获取地址列表
addressController.getAddress=function (req,res) {

    var user_id=req.cookies.userId;
    //console.log(user_id);
    AddressModel.find({user_id:user_id},function (err,doc) {
        if(err){
            throw err;
        }else{
            if(doc){
                res.send({
                    status: 1,
                    msg: doc
                })
            }else{
                res.send({
                    status: 0,
                    msg: '该用户没有添加地址信息'
                })
            }
        }
    })

}

//添加地址
addressController.addAddress=function (req,res) {
    var user_id=req.cookies.userId;
    var id=req.body.id;
    var name=req.body.name;
    var tel=req.body.tel;
    var address=req.body.address;

    //console.log(tel);
    var addressModel=new AddressModel({
        user_id: user_id,
        name: name,
        tel: tel,
        address: address
    });

    addressModel.save(function (err) {
        if(err){
            throw err;
        }else{
            res.send({
                status: 1,
                msg: '添加成功'
            })
        }
    })
}

//修改地址信息
addressController.updateAddress=function (req,res) {

    var params={
        _id:req.body._id,
        id: req.body.id,
         name:req.body.name,
         tel:req.body.tel,
         address:req.body.address
    }

    AddressModel.update({_id:params._id},{$set:params},function (err) {
        if(err){
            throw err;
        }else{
            res.send({
                status: 1,
                msg: '修改成功'
            })
        }
    })



}

//删除地址
addressController.deleteAddress=function (req,res) {
    var _id=req.body._id;

    AddressModel.remove({_id:_id},function (err) {
        if(err){
            throw err;
        }else{
            res.send({
                status: 1,
                msg: '删除成功'
            })
        }
    })

}

//设置为默认地址
addressController.setDefaultAddress=function (req,res) {

    var user_id=req.cookies.userId;
    var _id=req.body._id;

    if(user_id){
        AddressModel.find({},function (err,doc) {
            if(err){
                throw err;
            }else{
                if(doc){
                    doc.forEach(function (item) {
                        AddressModel.update({_id:item._id},{$set:{is_default:false}},function (errs) {
                            if(errs){
                                throw errs;
                            }
                        })
                    })

                    AddressModel.update({_id:_id},{$set:{is_default:true}},function (err) {
                        if(err){
                            throw err;
                        }else{
                            res.send({
                                status: 1,
                                msg: '设置成功'
                            })
                        }
                    })

                }
            }
        })
    }

}

addressController.getDefaultAddress=function (req,res) {
    var user_id=req.cookies.userId;

    AddressModel.findOne({user_id:user_id,is_default: true},function (err,doc) {
        if(err){
            throw err;
        }else{
            if(doc){
                res.send({
                    status: 1,
                    msg: doc
                })
            }
        }
    })
}

module.exports=addressController;