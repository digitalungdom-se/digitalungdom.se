const express = require( 'express' );
const router = express.Router();
const validator = require( 'validator' );

const ensureUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureUserAuthenticated;
const ensureNotUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureNotUserAuthenticated;

const getUserByEmail = require( './../../../models/get' ).getUserByEmail;
const getUserByUsername = require( './../../../models/get' ).getUserByUsername;
const getUserById = require( './../../../models/get' ).getUserById;
const getUserRolesById = require( './../../../models/get' ).getUserRolesById;
const getRoleIdByName = require( './../../../models/get' ).getRoleIdByName;

const agorize = require( './../../../models/user/agora' ).agorize;

router.post( '/agorize', ensureUserAuthenticated, async function( req, res ) {
      // Fetches all the fields and their values
      const id = req.user;
      const body = req.body.body;
      const type = req.body.type;
      const group = req.body.group;
      // Is not required
      const badges = req.body.badges;

      // Post specific
      const title = req.body.title;
      const tags = req.body.tags;

      // Comment specific
      const replyTo = req.body.replyTo;

      // Checks that they all are strings, validatorjs only allows string (prevent errors)
      if ( typeof body !== 'string' || typeof type !== 'string' || typeof author !== 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted' } );
      if ( !validator.isIn( type, [ 'post', 'comment', 'link', 'question' ] ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'You can only post a (post|comment|link|question)', type } );

      let postAs;
      let postBadges;

      if ( author !== 'user' ) {
        [ postAs, roles ] = await Promise.all( [ getRoleIdByName( author ), getUserRolesById( id ) ] );
        if ( !postAs ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Could not find specified role', 'author': author } );
        if ( !validator.isIn( postAs, roles ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'You are not authorised to use that role', author } );
      } else {
        [ postBadges, badges ] = await Promise.all( [ getBadgesIdByName( author ), getUserBadgesById( id ) ] );
        if ( postBadges.length !== badges.length ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Could not find all badges', badges } );
        if ( !validator.isIn( postBadges, badges ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'You are not authorised to use that/those badge(s)', badges } );
        postAs = 'user';
      }

      // Specific validation
      if ( type === 'post' ) {
        // Validates the length of the post
        if ( !validator.isLength( body, { min: 0, max: 10000 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Body is too long', body } );
        if ( typeof title != 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted', title } );
        if ( !validator.isLength( title, { min: 10, max: 100 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'Title is too long', title } );
        if ( !Array.isArray( tags ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Tags has to be an array', tags } );
        if ( tags.length > 10 ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Too many tags, max 10', tags: tags } );
        for ( tag of tags ) {
          if ( !typeof tag !== 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings allowed for tags', tag: tag } );
          if ( !validator.isLength( title, { min: 3, max: 32 } ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Tag is too long', tag: tag } );
          }

        } else if ( type === 'comment' ) {
          // Validates the length of the post
          if ( !validator.isLength( body, { min: 0, max: 10000 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Body is too long', body } );
          if ( typeof reply != 'string' || reply.length !== 24 ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Invalid reply', reply } );
        } else {
          if ( !validator.isURL( body, { protocols: [ 'http', 'https' ] } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Link posts may only be links', body } );
        }

        await agorize( id, { title, body, type, postAs, tags, reply } );
      } );

    module.exports = router;