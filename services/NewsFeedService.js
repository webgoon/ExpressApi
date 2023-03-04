const Models = require('../models/sequelize');

class NewsFeedService {

    //NewsFeed
    //newsFeed
  constructor(sequelize){
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async createNewsFeed(UserId, title, description){
    try{
      const newsFeed = await this.models.NewsFeed.create({
        UserId,
        title,
        description
      })

      return newsFeed
    }catch(err){
      return err
    }
  }

  async deleteNewsFeed({NewsFeedID}){
    console.log(`NewsFeedID`, NewsFeedID)
    try {
      const newsFeed = await this.models.NewsFeed.destroy({where: {"id": NewsFeedID}});
      return "deleted NewsFeed";
    } catch (err) {
      return err
    }
  }

}

module.exports = NewsFeedService;