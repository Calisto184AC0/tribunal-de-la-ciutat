'use strict';

/**
 * home-audio service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::home-audio.home-audio');
