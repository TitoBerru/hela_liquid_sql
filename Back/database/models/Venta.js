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
        } 
    }
    let config = {
        tableName: "ventas",
        timestamps: false
    }
    const Venta = sequelize.define (alias, cols, config)

    return Venta;
}