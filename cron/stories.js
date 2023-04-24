const { Story } = require('../models/story');
const { User } = require('../models/auth');
// const fs = require('fs');

module.exports = {

  removeStory: async () => {
    // calculate the time 1 minutes ago
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // find all documents to created more than 1 minutes ago
    const documentsToDelete = await Story.find({ createdAt: { $lt: twentyFourHoursAgo } });//{ createdAt: { $lt: thirtyMinutesAgo } }
    for (const doc of documentsToDelete) {
      const id = doc._id;
      const userId = doc.userId;
      await Story.updateOne({ _id: id }, { $set: { isDeleted: true } });
      const storyUser = await User.updateOne(
        { _id: userId },
        { $pull: { stories: id } }
      );
    }
    // for (const doc of documentsToDelete) {
    //   // loop through all stories in the document and remove their files
    //   for (const story of doc.story) {
    //     try {
    //       // remove file
    //       fs.unlink(story.path, (error) => {
    //         if (error) {
    //           console.error(`Error deleting file with path ${story.path}: ${error}`);
    //         } else {
    //           console.log(`File with path ${story.path} was deleted`);
    //         }
    //       });
    //     } catch (error) {
    //       console.error(`Error deleting file with path ${story.path}: ${error}`);
    //     }
    //   }

    //   //delete document in database
    //   try {
    //     const deletedDoc = await Story.findByIdAndDelete(doc._id);
    //     console.log(`Deleted story with id ${doc._id}`);
    //   } catch (error) {
    //     console.error(`Error deleting document with id ${doc._id}: ${error}`);
    //   }
    // }
  }

}