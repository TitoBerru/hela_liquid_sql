module.exports =(sequelize, DataTypes) => {
    let alias = 'Estadisticasventas';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },

        Mes:{
            type: DataTypes.INTEGER(11)
        } ,
        Anio:{
            type: DataTypes.INTEGER(11)
        } ,
        TotalVentasKg:{
            type: DataTypes.DECIMAL(10)
        } ,
        TotalVentasUnitarias:{
            type: DataTypes.INTEGER(11)
        } 
    }
    let config = {
        tableName: "estadisticasventas",
        timestamps: false
    }
    const Estadistiscaventa = sequelize.define (alias, cols, config)

    return Estadistiscaventa;
}