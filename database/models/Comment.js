module.exports = (sequelize, dataTypes) => {
    let alias = "Comment"; 
    let cols = {
        id_comment:{
            type: dataTypes.INTEGER,
            primaryKey: true, 
            autoincrement: true
        }, 
        comentario:{
            type: dataTypes.STRING(500)
        },
        imagendelperfil:{
            type: dataTypes.STRING
        },
        id_user:{
            type: dataTypes.INTEGER
        },
        id_product:{
            type: dataTypes.INTEGER
        }, 
        created_at:{
            type: dataTypes.DATE
        }, 
        updated_at:{
            type: dataTypes.DATE
        }
       
    }
    let config = {
        tableName: 'comments', 
        timestamps: false,
        underscored: true
    }
    
    const Comment = sequelize.define(alias, cols, config)
    
    Comment.associate = function (model){
        Comment.belongsTo(model.Product,{
            as: 'products',
            foreignKey: 'id_product'
        }) 
        Comment.belongsTo(model.User,{
            as:'users',
            foreignKey: 'id_user'
        }) 
    }
    return Comment;
    
}