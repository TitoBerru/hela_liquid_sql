module.exports =(sequelize, DataTypes) => {
    let alias = 'Compras';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        Monto:{
            type: DataTypes.DECIMAL(10)
        },
        FechaPago:{
            type: DataTypes.DATE
        },
        MetodoPago: {
            type: DataTypes.STRING(50)
        },
        TipoProducto: {
            type: DataTypes.STRING(50)
        },
        Cantidad:{
            type: DataTypes.DECIMAL(10)
        },
        Unitario: {
            type: DataTypes.STRING(50)
        },
        Proveedor: {
            type: DataTypes.STRING(50)
        },
        Comentarios: {
            type: DataTypes.STRING(50)
        }

        
    }
    let config = {
        tableName: "compras",
        timestamps: false
    }
    const Compra = sequelize.define (alias, cols, config)

    return Compra;
}