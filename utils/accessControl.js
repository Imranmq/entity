// utils/accessControl.js
const UserProfile = require('../models/User');
const Entity = require('../models/Entity');

const hasAccess = async (userId, entityId) => {
  const userProfile = await UserProfile.findOne({ user: userId }).populate('location');
  const entity = await Entity.findById(entityId);
  return userProfile.location.equals(entity.location);
};

module.exports = { hasAccess };
