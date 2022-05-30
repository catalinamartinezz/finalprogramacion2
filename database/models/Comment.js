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
        }
       
    }
    let config = {
        tableName: 'comments', 
    }
    
    const Comment = sequelize.define(alias, cols, config)
    return Comment;
    
}