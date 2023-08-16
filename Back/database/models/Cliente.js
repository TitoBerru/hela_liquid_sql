module.exports =(sequelize, DataTypes) => {
    let alias = 'Clientes';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },

        Nombre:{
            type: DataTypes.STRING(100)
        } ,
        Apellido:{
            type: DataTypes.STRING(100)
        } ,
        Telefono:{
            type: DataTypes.STRING(100)
        } ,
        Email: {
            type: DataTypes.STRING(100)
        },
        Direccion:{
            type: DataTypes.STRING(100)
        } ,
        Localidad:{
            type: DataTypes.STRING(50)
        } ,
        Provincia:{
            type: DataTypes.STRING(50)
        } ,
        Edad: {
            type: DataTypes.INTEGER(11)
        },
        FechaRegistro:{
            type: DataTypes.DATE
        } 
    }
    let config = {
        tableName: "clientes",
        timestamps: false
    }
    const Cliente = sequelize.define (alias, cols, config)

    return Cliente;
}