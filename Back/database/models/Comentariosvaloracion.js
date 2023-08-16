module.exports =(sequelize, DataTypes) => {
    let alias = 'Comentariosvaloraciones';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },

        Comentario:{
            type: DataTypes.TEXT
        } ,
        Valoracion:{
            type: DataTypes.TINYINT
        } ,
        FechaComentario: {
            type: DataTypes.DATE
        },
        IDCliente:{
            type: DataTypes.INTEGER.UNSIGNED, //LLave foranea de cliente
            allowNull: false
        } ,
        IDReceta: {
            type: DataTypes.INTEGER.UNSIGNED,  //llave foranea de Receta
            allowNull:false
           
        }
    }
    let config = {
        tableName: "comentariosvaloraciones",
        timestamps: false
    }
    const Comentariosvaloraciones = sequelize.define (alias, cols, config)

    return Comentariosvaloraciones;
}