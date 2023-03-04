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

    const UserContactInfo = sequelize.define('UserContactInfo', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          
        },
        uid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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

    const NewsFeed = sequelize.define('NewsFeed', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        uid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },{
        freezeTableName: true,
        timestamps:true,
        createdAt: true,
        updatedAt: 'updatedlast',
        paranoid: true
    })

    const Todo = sequelize.define('Todo', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        uid:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },{
        freezeTableName: true,
        timestamps:true,
        createdAt: true,
        updatedAt: 'updatedlast',
        paranoid: true
    })
    
        const Employee = sequelize.define('Employee', {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            uid:{
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: true
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
    
        const EmployeeContactInfo = sequelize.define('EmployeeContactInfo', {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            uid:{
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true
            }
            },{
                freezeTableName: true,
                timestamps:true,
                createdAt: true,
                updatedAt: 'updatedlast',
                paranoid: true
            }
        );
    


sequelize.sync();
    //sequelize.sync({force: true, match: /apiexpressdbDev$/}); // {force: true} {alter: true} {match: /apiexpressdbDev$/}
}