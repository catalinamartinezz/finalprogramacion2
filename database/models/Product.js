module.exports = (sequelize, dataTypes) => {
    let alias = "Product"; 
    let cols = {
        id_product:{
            type: dataTypes.INTEGER,
            primaryKey: true, 
            autoincrement: true
        }, 
        name_product:{
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING(500)
        },
        image_product:{
            type: dataTypes.STRING
        },
        id_user:{
            type: dataTypes.INTEGER
        },
        id_comment:{
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
        tableName: 'products', 
        timestamps: true,
        underscored: true
    }
    
    const Product = sequelize.define(alias, cols, config)

    Product.associate = function(model){
        Product.belongsTo(model.User, {
            as: "users",
            foreignKey: "id_user"
         })
         Product.hasMany(model.Comment,{
            as: 'comments',
            foreignKey: 'id_product' 
        }) 
    }
    return Product;
    
}


