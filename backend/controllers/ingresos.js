
const getIngresos = (req,res) => {
    res.json({
        msg : 'Get'
    });
}

const getIngreso = (req,res) => {
    res.json({
        msg: 'Get by id'
    });
}

const postIngreso = (req,res) => {

    res.json({
        msg : 'Post'
    });
}

const putIngreso = (req,res) => {
    res.json({
        msg: 'Put'
    });
}

const deleteIngreso = (req,res) => {
    res.json({
        msg: 'Delete'
    });
}

module.exports = { getIngresos, postIngreso, getIngreso, putIngreso, deleteIngreso }