module.exports =(sequelize, DataTypes) => {
    let alias = 'Historialcambios';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },

        TipoCambio:{
            type: DataTypes.STRING(50)
        } ,
        DescripcionCambio:{
            type: DataTypes.TEXT
        } ,
        FechaHoraCambio:{
            type: DataTypes.DATE
        } ,
        IDUsuario:{
            type: DataTypes.INTEGER(11).UNSIGNED
        } 
    }
    let config = {
        tableName: "historialcambios",
        timestamps: false
    }
    const Historialcambio = sequelize.define (alias, cols, config)

    return Historialcambio;
}