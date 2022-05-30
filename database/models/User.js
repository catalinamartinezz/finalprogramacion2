module.exports = (sequelize, dataTypes) => {
    let alias = "User"; 
    let cols = {
        id_user:{
            type: dataTypes.INTEGER,
            primaryKey: true, 
            autoincrement: true
        }, 
        username:{
            type: dataTypes.STRING(500)
        },
        email: {
            type: dataTypes.STRING
        },
        password:{
            type: dataTypes.STRING
        },
        id_product:{
            type: dataTypes.INTEGER
        },
        id_comment:{
            type: dataTypes.INTEGER
        }, 
        fecha_de_nacimiento:{
            type: dataTypes.DATE
        },
        profilepic: {
            type: dataTypes.STRING
        },
        created_at:{
            type: dataTypes.DATE
        },
        updated_at:{
            type: dataTypes.DATE
        }
    }
    let config = {
        tableName: 'users', 
    }
    
    const User = sequelize.define(alias, cols, config)
    return User;
    
}