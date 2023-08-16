
module.exports =(sequelize, DataTypes) => {
    let alias = 'Usuarios';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },

        NombreUsuario:{
            type: DataTypes.STRING(100)
        } ,
        Contrasena: {
            type: DataTypes.STRING(100)
        },
        Rol: {
            type: DataTypes.STRING(20)
        },
        FechaRegistro:{
            type: DataTypes.DATE
        } 
    }
    let config = {
        tableName: "usuarios",
        timestamps: false
    }
    const Usuario = sequelize.define (alias, cols, config)

    return Usuario;
}