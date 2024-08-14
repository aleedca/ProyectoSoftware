module.exports = (sequelize,DataTypes) => {
    const Posts = sequelize.define("Posts",{
        name: {
            type: DataTypes.STRING, 
            allowNull: false,
        }


    });
    return Posts
};



