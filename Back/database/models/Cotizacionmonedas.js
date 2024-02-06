module.exports =(sequelize, DataTypes) => {
    let alias = 'Cotizacionmonedas';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        TipoMoneda:{
            type: DataTypes.STRING(20)
        },
        Cotizacion:{
            type: DataTypes.DECIMAL(10,1)
        },
        Start_Date: {
            type: DataTypes.DATE
        },
        End_Date: {
            type: DataTypes.DATE
        }

        
    }
    let config = {
        tableName: "cotizacionmonedas",
        timestamps: false
    }
    const Cotizacionmonedas = sequelize.define (alias, cols, config)

    return Cotizacionmonedas;
}