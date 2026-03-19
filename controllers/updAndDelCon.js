const  {OrdersModel} = require('../models/OrdersModel');

module.exports.deleteOrder = async(req,res) => {
    try {
        console.log("id received",req.params.id);
        const deleteOrder = await OrdersModel.findByIdAndDelete(req.params.id);

        if(!deleteOrder) 
            return res.status(404).json({message:"Order not found"});

        res.json({message:"Order deleted successfully"});
    } catch(err) {
        res.status(500).json({error:err.message});
    }
};

module.exports.updateOrder = async(req,res) => {
    try {
        const updateOrder = await OrdersModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json(updateOrder);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
};