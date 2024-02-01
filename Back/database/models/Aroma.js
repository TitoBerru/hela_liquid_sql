module.exports =(sequelize, DataTypes) => {
    let alias = 'Aromas';
    let cols = {
        ID: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },

        NombreAroma:{
            type: DataTypes.STRING(100)
        } ,
        CantidadDisponible:{
            type: DataTypes.DECIMAL(10,2)
        } ,
        Proveedor: {
            type: DataTypes.STRING(100)
        },
        CostoUnitario:{
            type: DataTypes.DECIMAL(10)
        } ,
        Marca: {
            type: DataTypes.STRING(100)
        },
        Descripcion: {
            type: DataTypes.STRING(50)
        },
        FechaRegistro:{
            type: DataTypes.DATE
        },
        AromaActivo:{
            type: DataTypes.BOOLEAN
        },
        Moneda:{
            type: DataTypes.STRING(10)
        }
    }
    let config = {
        tableName: "aromas",
        timestamps: false
    }
    const Aroma = sequelize.define (alias, cols, config);
    
    Aroma.associate = function(models){
        Aroma.belongsToMany(models.Recetas,{
            as:'recetas',
            through:'recetaaromas',
            foreignKey: 'IDAroma',
            otherKey: 'IDReceta',
            timestamps: false,
        })
        Aroma.hasMany(models.Recetaaromas,{
           
            foreignKey:  'IDAroma'
        })
    }


    return Aroma;
}