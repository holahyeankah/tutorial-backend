module.exports=(sequelize, DataTypes)=>{
    const Tutorial=sequelize.define("Tutorial",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        title:{
            type:DataTypes.STRING(100),
            allowNull:false

        },
        description:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        published:{
            type:DataTypes.BOOLEAN,
            
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false,

        },
        createdAt:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue:new Date(),
           

        },
        updatedAt:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue:new Date(),
           

        }
        
    },

        {
            timestamps:false,
            tableName:'tutorial'
    })
    return Tutorial

}