module.exports =(sequelize, DataTypes) => {
    let alias = 'Promociones';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },

        NombrePromocion:{
            type: DataTypes.STRING(100)
        } ,
        Descuento:{
            type: DataTypes.DECIMAL(5,2)
        } ,
        FechaInicio:{
            type: DataTypes.DATE
        } ,
        FechaFin:{
            type: DataTypes.DATE
        }
    }
    let config = {
        tableName: "promociones",
        timestamps: false
    }
    const Promocion = sequelize.define (alias, cols, config)

    return Promocion;
}