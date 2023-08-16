module.exports =(sequelize, DataTypes) => {
    let alias = 'Pagos';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },

        Monto:{
            type: DataTypes.DECIMAL(10,2)
        } ,
        FechaPago:{
            type: DataTypes.DATE
        } ,
        MetodoPago:{
            type: DataTypes.STRING(50)
        } ,
        
        IDVenta:{
            type: DataTypes.INTEGER(11).UNSIGNED
        } 
    }
    let config = {
        tableName: "pagos",
        timestamps: false
    }
    const Pago = sequelize.define (alias, cols, config)

    return Pago;
}