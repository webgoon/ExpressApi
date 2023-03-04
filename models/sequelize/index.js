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
            onDelete: 'CASCADE',
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
    
    //  Types of Associations are listed below
    //  hasOne, belongsTo, hasMany, belongsToMany
    //  https://sequelize.org/docs/v7/advanced-association-concepts/advanced-many-to-many/


    

    //  Legend of the Associations
    //  one-to-one => hasone, belongsTo

    //  One-To-One one-to-one Relationships
    //  Which Models Could Live By Itself?  If it cannot live by itself then it has to be referenced back its to parent.

    //  One-To-One one-to-one
    User.hasOne(UserContactInfo, {
        //onUpdate: 'CASCADE',
        onDelete: "CASCADE"
    })
    UserContactInfo.belongsTo(User, {
        
        //onDelete: "CASCADE",
        onUpdate: 'CASCADE'
    })

    
    //One-To-Many one-to-many => hasMany, belongsTo
    User.hasMany(NewsFeed, {
        //onUpdate: 'CASCADE',
        onDelete: "CASCADE"
    })
    NewsFeed.belongsTo(User, {
        //onUpdate: 'CASCADE',
        onDelete: "CASCADE"
        
    })

    //many-to-many => belongsToMany
    //when using belongs to many they require a pass through
    //  Example:
    //  Actor.belongsToMany(Movie, {through: "Actors_Movies"})
    //  Movie.belongsToMany(Actor, {through: "Actors_Movies"})

    //  Example of Self Join
    //  User.belongsToMany(User, {as: "User", foreignKey: "UserId", through: "Follow"})
    //  User.belongsToMany(User, {as: "Followed", foreignKey: "FollowedId", through: "Follow"})

    const Follow = sequelize.define('Follow', {
    UserId: {
        type: DataTypes.INTEGER,
        references: {
        model: User, 
        key: 'UserId'
        }
    },
    FollowedId: {
        type: DataTypes.INTEGER,
        references: {
        model: User, 
        key: 'FollowedId'
        }
    }
    });
    User.belongsToMany(User, {as: "User", foreignKey: "UserId", through: "Follow"})
    User.belongsToMany(User, {as: "Followed", foreignKey: "FollowedId", through: "Follow"})





sequelize.sync();
//sequelize.sync({alter: true});
    //sequelize.sync({force: true, match: /apiexpressdbDev$/}); // {force: true} {alter: true} {match: /apiexpressdbDev$/}
}