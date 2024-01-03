module.exports =(sequelize, DataTypes) => {
    let alias = 'Precioestimadoventa';
    let cols = {
        ID: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        TipoReceta:{
            type: DataTypes.STRING(50)
        } ,

        ML:{
            type: DataTypes.TINYINT
        } ,
        RangoNico:{
            type: DataTypes.STRING(50)
        } ,
        Precio: {
            type: DataTypes.DECIMAL(10,2)
        },
        Fecha_Inicio:{
            type: DataTypes.DATE
        },
        Fecha_Fin:{
            type: DataTypes.DATE
        },
        PrecioPack:{
            type: DataTypes.DECIMAL(10,2)
        },
        PrecioUnitarioPack:{
            type: DataTypes.DECIMAL(10,2)
        }
    }
    let config = {
        tableName: "precioestimadoventa",
        timestamps: false
    }
    const Precioestimadoventa = sequelize.define (alias, cols, config)

    return Precioestimadoventa;
}