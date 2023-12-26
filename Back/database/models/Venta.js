module.exports =(sequelize, DataTypes) => {
    let alias = 'Ventas';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },

        CantidadKg:{
            type: DataTypes.DECIMAL(10,2)
        } ,
        CantidadUnitaria:{
            type: DataTypes.INTEGER(11)
        } ,
        FechaVenta:{
            type: DataTypes.DATE
        } ,
        
        IDCliente:{
            type: DataTypes.INTEGER(11).UNSIGNED
        } ,
        IDReceta:{
            type: DataTypes.INTEGER(11).UNSIGNED
        },
        NombreCliente:{
            type: DataTypes.STRING(50)
        },
        NombreReceta:{
            type: DataTypes.STRING(50)
        },
        CostoTotalEsencia:{
            type: DataTypes.DECIMAL(20,2)
        },
        CostoTotalBase:{
            type: DataTypes.DECIMAL(20,2)
        },
        CostoTotalNico:{
            type: DataTypes.DECIMAL(20,2)
        },
        CostoFrasco:{
            type: DataTypes.DECIMAL(20,2)
        },
        CostoTotal:{
            type: DataTypes.DECIMAL(20,2)
        },
        PrecioVenta:{
            type: DataTypes.DECIMAL(20,2)
        },
        Ganancia:{
            type: DataTypes.DECIMAL(20,2)
        },
        VentaEfectiva:{
            type: DataTypes.BOOLEAN
        }

    }
    let config = {
        tableName: "ventas",
        timestamps: false
    }
    const Venta = sequelize.define (alias, cols, config)

    return Venta;
}