module.exports =(sequelize, DataTypes) => {
    let alias = 'Empleados';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },

        Nombre:{
            type: DataTypes.STRING(100)
        } ,
        Apellido:{
            type: DataTypes.STRING(100)
        } ,
        Rol:{
            type: DataTypes.STRING(50)
        } ,
        FechaRegistro:{
            type: DataTypes.DATE
        } 
    }
    let config = {
        tableName: "empleados",
        timestamps: false
    }
    const Empleado = sequelize.define (alias, cols, config)

    return Empleado;
}