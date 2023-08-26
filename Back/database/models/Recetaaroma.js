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
    const Recetaaroma = sequelize.define (alias, cols, config);
    Recetaaroma.associate = function(models){
        Recetaaroma.belongsTo(models.Recetas,{
            as:'recetas',
            foreignKey: 'IDReceta',
            otherKey: 'ID',
            timestamps: false
        })
        Recetaaroma.belongsTo(models.Aromas,{
            as:'aromas',
            foreignKey: 'IDAroma',
            otherKey: 'ID',
            timestamps: false
        })
        
    }

    return Recetaaroma;
}