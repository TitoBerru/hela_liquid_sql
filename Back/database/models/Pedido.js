module.exports =(sequelize, DataTypes) => {
    let alias = 'Pedidos';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },

        FechaPedido:{
            type: DataTypes.DATE
        } ,
        FechaEntrega:{
            type: DataTypes.DATE
        } ,
        EstadoPedido:{
            type: DataTypes.STRING(50)
        } ,
        
        IDCliente:{
            type: DataTypes.INTEGER(11).UNSIGNED
        } ,
        IDReceta:{
            type: DataTypes.INTEGER(11).UNSIGNED
        } 
    }
    let config = {
        tableName: "pedidos",
        timestamps: false
    }
    const Pedido = sequelize.define (alias, cols, config)

    return Pedido;
}