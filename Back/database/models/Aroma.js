module.exports =(sequelize, DataTypes) => {
    let alias = 'Aromas';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },

        NombreAroma:{
            type: DataTypes.STRING(100)
        } ,
        CantidadDisponible:{
            type: DataTypes.DECIMAL(10)
        } ,
        Proveedor: {
            type: DataTypes.STRING(100)
        },
        CostoUnitario:{
            type: DataTypes.DECIMAL(10)
        } ,
        Marca: {
            type: DataTypes.STRING(100)
        },
        FechaRegistro:{
            type: DataTypes.DATE
        } 
    }
    let config = {
        tableName: "aromas",
        timestamps: false
    }
    const Aroma = sequelize.define (alias, cols, config)

    return Aroma;
}