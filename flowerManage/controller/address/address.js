/**
 *Create by Zhang on 2018/3/8
 */
/**
 *Create by Zhang on 2018/2/25
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




module.exports=addressController;