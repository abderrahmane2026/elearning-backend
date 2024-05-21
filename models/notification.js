const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  vendorID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  read: Boolean,
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
