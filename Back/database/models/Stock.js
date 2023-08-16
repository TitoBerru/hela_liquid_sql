module.exports =(sequelize, DataTypes) => {
    let alias = 'Stock';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        CantidadDisponible:{
            type: DataTypes.DECIMAL(10,2)
        },
        IDAroma:{
            type: DataTypes.INTEGER(11).UNSIGNED
        },
        IDIngrediente:{
            type: DataTypes.INTEGER(11).UNSIGNED
        }

        
    }
    let config = {
        tableName: "stock",
        timestamps: false
    }
    const Stock = sequelize.define (alias, cols, config)

    return Stock;
}