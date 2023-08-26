module.exports =(sequelize, DataTypes) => {
    let alias = 'Recetas';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },

        NombreReceta:{
            type: DataTypes.STRING(100)
        } ,
        Descripcion:{
            type: DataTypes.TEXT
        } ,
        FechaCreacion:{
            type: DataTypes.DATE
        } ,
        TipoReceta: {
            type: DataTypes.STRING(50)
        },
       
        CantidadIngredientesRequerida:{
            type: DataTypes.DECIMAL(10,2)
        } 
        
    }
    let config = {
        tableName: "recetas",
        timestamps: false
    }
    const Receta = sequelize.define (alias, cols, config);
    Receta.associate = function(models){
        Receta.belongsToMany(models.Aromas,{
            as:'aromas',
            through:'recetaaromas',
            foreignKey: 'IDReceta',
            otherKey: 'IDAroma',
            timestamps: false
        });
        Receta.hasMany(models.Recetaaromas,{
           
            foreignKey:  'IDReceta'
        })
    
    }

     return Receta;
}