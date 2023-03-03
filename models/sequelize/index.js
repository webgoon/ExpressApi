const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
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
            get(){
                const rawValue = this.getDataValue('firstName')
                return rawValue ? rawValue.toUpperCase() : null
            },
            set(value){
                this.setDataValue('firstName', `${value}`)
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'Doe',
            get(){
                const rawValue = this.getDataValue('lastName')
                return rawValue ? rawValue.toUpperCase() : null
            },
            set(value){
                this.setDataValue('lastName', `${value}`)
            }
            
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'madeupPassword',
            set(value){
                this.setDataValue('password', `hashed(${value})`)
            }
        },
        },{
            freezeTableName: true,
            timestamps: true,
            createdAt: true,
            updatedAt: 'updatedlast',
            paranoid: true
        }
    );

    const ContactInfo = sequelize.define('UserContactInfo', {
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
            primaryKey: true,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
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

    
        // const Employee = sequelize.define('Employee', {
        //     id: {
        //         type: DataTypes.BIGINT,
        //         allowNull: false,
        //         primaryKey: true,
        //         autoIncrement: true,
        //         unique: true
        //     },
        //     uid:{
        //         type: DataTypes.UUID,
        //         defaultValue: DataTypes.UUIDV4,
        //         allowNull: true
        //     },
        //     firstName: {
        //         type: DataTypes.STRING,
        //         allowNull: true,
        //         defaultValue: 'Jane',
        //     },
        //     lastName: {
        //         type: DataTypes.STRING,
        //         allowNull: true,
        //         defaultValue: 'Doe'
        //     },
        //     email: {
        //         type: DataTypes.STRING,
        //         allowNull: false
        //     }
        //     },{
        //         freezeTableName: true,
        //         timestamps: true,
        //         createdAt: true,
        //         updatedAt: 'updatedlast',
        //         paranoid: true
        //     }
        // );
    
        // const EmployeeContactInfo = sequelize.define('EmployeeContactInfo', {
        //     id: {
        //         type: DataTypes.BIGINT,
        //         allowNull: false,
        //         primaryKey: true,
        //         autoIncrement: true,
        //         unique: true
        //     },
        //     uid:{
        //         type: DataTypes.UUID,
        //         defaultValue: DataTypes.UUIDV4,
        //         primaryKey: true
        //     },
        //     phone: {
        //         type: DataTypes.STRING,
        //         allowNull: false
        //     },
        //     email: {
        //         type: DataTypes.STRING,
        //         allowNull: false
        //     }
        //     },{
        //         freezeTableName: true,
        //         timestamps:true,
        //         createdAt: true,
        //         updatedAt: 'updatedlast',
        //         paranoid: true
        //     }
        // );
    


sequelize.sync({alter: true});
    //sequelize.sync({force: true, match: /apiexpressdbDev$/}); // {force: true} {alter: true} {match: /apiexpressdbDev$/}
}