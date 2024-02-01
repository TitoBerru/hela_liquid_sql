module.exports =(sequelize, DataTypes) => {
    let alias = 'Ingredientes';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        TipoIngrediente:{
            type: DataTypes.STRING(100)
        } ,

        NombreIngrediente:{
            type: DataTypes.STRING(100)
        } ,
        CantidadDisponible:{
            type: DataTypes.DECIMAL(10,2)
        } ,
        UnidadMedida: {
            type: DataTypes.STRING(50)
        },
        Costo:{
            type: DataTypes.DECIMAL(10,2)
        } ,
        FechaRegistro:{
            type: DataTypes.DATE
        },
        FechaFin:{
            type: DataTypes.DATE
        } 
    }
    let config = {
        tableName: "ingredientes",
        timestamps: false
    }
    const Ingrediente = sequelize.define (alias, cols, config)

    return Ingrediente;
}