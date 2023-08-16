module.exports =(sequelize, DataTypes) => {
    let alias = 'Recetaaromas';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        IDReceta:{
            type: DataTypes.INTEGER(11).UNSIGNED
        },
        IDAroma:{
            type: DataTypes.INTEGER(11).UNSIGNED
        },

        CantidadAroma:{
            type: DataTypes.DECIMAL(10,2)
        } 
    }
    let config = {
        tableName: "recetaaromas",
        timestamps: false
    }
    const Recetaaroma = sequelize.define (alias, cols, config)

    return Recetaaroma;
}