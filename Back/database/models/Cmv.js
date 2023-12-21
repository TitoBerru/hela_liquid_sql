module.exports =(sequelize, DataTypes) => {
    let alias = 'Cmv';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        IdReceta: {
            type: DataTypes.INTEGER(11)
        },

        Cliente:{
            type: DataTypes.STRING(50)
        } ,
        FechaVenta:{
            type: DataTypes.DATE
        } ,
        NicoCantidad:{
            type: DataTypes.DECIMAL(3,1)
        } ,
        Ml: {
            type: DataTypes.DECIMAL(3,1)
        },
       
        CantidadUnidades:{
            type: DataTypes.TINYINT
        },
        PrecioVenta:{
            type: DataTypes.SMALLINT
        },
        NicoCostoTotal:{
            type: DataTypes.DECIMAL(20,1)
        },
        VgCostoTotal:{
            type: DataTypes.DECIMAL(20,1)
        },
        PgCostoTotal:{
            type: DataTypes.DECIMAL(20,1)
        },
        EscenciasTotal:{
            type: DataTypes.DECIMAL(20,1)
        },
        CostoTotalReceta:{
            type: DataTypes.DECIMAL(20,1)
        }
    }
    let config = {
        tableName: "cmv",
        timestamps: false
    }
    const Cmv = sequelize.define (alias, cols, config);
    Cmv.associate = function(models){
        
        Cmv.hasMany(models.Recetaaromas,{
           
            foreignKey:  'IDReceta'
        })
    
    }

     return Cmv;
}