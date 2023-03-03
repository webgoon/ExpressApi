const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('Employee', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        uid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'Jane',
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'Doe'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
        },{
            freezeTableName: true,
            timestamps: true,
            createdAt: true,
            updatedAt: 'updatedlast',
            paranoid: true
        }
    );

    const ContactInfo = sequelize.define('EmployeeContactInfo', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        token:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        }
        },{
            freezeTableName: true,
            timestamps:true,
            createdAt: true,
            updatedAt: 'updatedlast',
            paranoid: true
        }
    );

sequelize.sync({alter: true, match: /apiexpressdbDev$/});
    //sequelize.sync({force: true, match: /apiexpressdbDev$/}); // {force: true} {alter: true} {match: /apiexpressdbDev$/}
}