module.exports =(sequelize, DataTypes) => {
    let alias = 'Resumenventaspormes';
    let cols = {
        Mes: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
           
        },
        Anio: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            
        },


        TotalVentasKg:{
            type: DataTypes.INTEGER(11)
        } ,
        TotalVentasUnitarias:{
            type: DataTypes.INTEGER(11)
        } 
    }
    let config = {
        tableName: "resumenventaspormes",
        timestamps: false
    }
    const Resumenventaspormes = sequelize.define (alias, cols, config)

    return Resumenventaspormes;
}