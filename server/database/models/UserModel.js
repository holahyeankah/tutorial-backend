module.exports=(sequelize, DataTypes)=>{
    const User=sequelize.define("User",{
        user_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        fullname:{
            type:DataTypes.STRING(100),
            allowNull:false

        },
        email:{
            type:DataTypes.STRING(100),
            allowNull:false,
            unique: true,
            validate:{
                isEmail:true
            },
        },
        password:{
            type:DataTypes.STRING(200),
            allowNull:false,

        },
       
        postal_code:DataTypes.STRING(100),
        address:DataTypes.STRING(100),
        country:DataTypes.STRING(100),
        state:DataTypes.STRING(100),
        mob_phone:DataTypes.STRING(100),
        
    },

        {
            timestamps:false,
            tableName:'user'
    })
    return User

}